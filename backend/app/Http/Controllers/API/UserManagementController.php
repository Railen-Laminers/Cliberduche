<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\Department;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserManagementController extends Controller
{
    /**
     * Ensure the requesting user is an admin.
     */
    protected function authorizeAdmin(Request $request)
    {
        $user = $request->user();
        if (!$user || !$user->hasRole('admin')) {
            abort(403, 'Forbidden');
        }
    }

    /**
     * List all users with roles and department, excluding the current user.
     */
    public function index(Request $request)
    {
        $this->authorizeAdmin($request);

        $currentUserId = $request->user()->id;

        $users = User::with('roles', 'department')
            ->where('id', '<>', $currentUserId)
            ->get();

        return response()->json($users);
    }

    /**
     * Create a new user.
     *
     * Enforces: only one 'head' per department. If roles include 'head', department_id must be provided
     * and that department must not already have a different head.
     */
    public function store(Request $request)
    {
        $this->authorizeAdmin($request);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'department_id' => 'nullable|exists:departments,id',
            'roles' => 'nullable|array',
            'roles.*' => 'string|exists:roles,name',
        ]);

        $roles = $data['roles'] ?? [];

        // If trying to assign 'head' role, department_id is required and department must not already have a different head
        if (in_array('head', $roles, true)) {
            $deptId = $data['department_id'] ?? null;
            if (!$deptId) {
                return response()->json([
                    'message' => 'Cannot assign "head" role without a department_id.'
                ], 422);
            }

            $existingHead = User::where('department_id', $deptId)
                ->whereHas('roles', function ($q) {
                    $q->where('name', 'head');
                })->first();

            if ($existingHead) {
                return response()->json([
                    'message' => 'Department already has a head: ' . $existingHead->name
                ], 422);
            }
        }

        // Create user
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'department_id' => $data['department_id'] ?? null,
            'active' => true,
        ]);

        // Attach roles (inside a transaction to keep department head sync consistent)
        DB::transaction(function () use ($user, $roles) {
            if (!empty($roles)) {
                $user->syncRoles($roles);
            }

            // If the user now has head role, set department.head_id
            if ($user->isHead() && $user->department_id) {
                $department = Department::find($user->department_id);
                if ($department) {
                    $department->head_id = $user->id;
                    $department->save();
                }
            }
        });

        return response()->json($user->load('roles', 'department'), 201);
    }

    /**
     * Update an existing user.
     *
     * Handles:
     * - Assigning/removing roles
     * - Ensuring only one head per department
     * - Syncing departments.head_id when needed
     */
    public function update(Request $request, $id)
    {
        $this->authorizeAdmin($request);

        $user = User::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|nullable|string|min:6',
            'department_id' => 'nullable|exists:departments,id',
            'roles' => 'nullable|array',
            'roles.*' => 'string|exists:roles,name',
            'active' => 'nullable|boolean',
        ]);

        // Normalize presence of roles key (we need to know if roles were provided)
        $rolesKeyExists = array_key_exists('roles', $data);
        $newRoles = $rolesKeyExists ? ($data['roles'] ?? []) : null;

        // If new roles include 'head', ensure department (new or existing) is provided and has no other head
        if ($rolesKeyExists && in_array('head', $newRoles, true)) {
            $targetDeptId = $data['department_id'] ?? $user->department_id;
            if (!$targetDeptId) {
                return response()->json([
                    'message' => 'Cannot assign "head" role without a department_id.'
                ], 422);
            }

            $existingHead = User::where('department_id', $targetDeptId)
                ->whereHas('roles', function ($q) {
                    $q->where('name', 'head');
                })
                ->where('id', '<>', $user->id)
                ->first();

            if ($existingHead) {
                return response()->json([
                    'message' => 'Department already has a head: ' . $existingHead->name
                ], 422);
            }
        }

        // Prepare password handling
        if (array_key_exists('password', $data)) {
            if ($data['password']) {
                $data['password'] = Hash::make($data['password']);
            } else {
                unset($data['password']);
            }
        }

        // Perform update and sync roles + department head updates inside a transaction
        DB::transaction(function () use ($user, $data, $rolesKeyExists, $newRoles) {
            // Save old department for later comparison
            $oldDepartmentId = $user->department_id;
            $wasHeadBefore = $user->isHead();

            // Update user basic fields (exclude 'roles')
            $userUpdatable = array_filter($data, function ($v, $k) {
                return $k !== 'roles';
            }, ARRAY_FILTER_USE_BOTH);

            $user->update($userUpdatable);

            // If 'roles' key was present, sync roles accordingly
            if ($rolesKeyExists) {
                // Sync (empty array will remove all roles)
                $user->syncRoles($newRoles ?? []);
            }

            // After syncing, re-evaluate head status and department
            $isHeadNow = $user->isHead();
            $newDepartmentId = $user->department_id;

            // If user was head before but no longer head => clear head_id on department(s) that pointed to this user
            if ($wasHeadBefore && !$isHeadNow) {
                // If they were head of some department, clear it
                $oldDept = Department::where('head_id', $user->id)->first();
                if ($oldDept) {
                    $oldDept->head_id = null;
                    $oldDept->save();
                }
            }

            // If user is head now, ensure the department record points to this user (and clear old department if department changed)
            if ($isHeadNow) {
                // If department changed from oldDepartmentId to newDepartmentId, clear old department head if it referenced this user
                if ($oldDepartmentId && $oldDepartmentId !== $newDepartmentId) {
                    $oldDept = Department::where('id', $oldDepartmentId)->where('head_id', $user->id)->first();
                    if ($oldDept) {
                        $oldDept->head_id = null;
                        $oldDept->save();
                    }
                }

                // Set new department head_id
                if ($newDepartmentId) {
                    $newDept = Department::find($newDepartmentId);
                    if ($newDept) {
                        $newDept->head_id = $user->id;
                        $newDept->save();
                    }
                }
            } else {
                // not head now: ensure we didn't leave any stale reference
                $dept = Department::where('head_id', $user->id)->first();
                if ($dept) {
                    $dept->head_id = null;
                    $dept->save();
                }
            }
        });

        return response()->json($user->load('roles', 'department'));
    }

    /**
     * Delete a user only if deactivated.
     */
    public function destroy(Request $request, $id)
    {
        $this->authorizeAdmin($request);

        $user = User::findOrFail($id);

        if ($user->active) {
            return response()->json([
                'message' => 'Cannot delete an active user. Please deactivate the user first.'
            ], 403);
        }

        DB::transaction(function () use ($user) {
            // If user is department head, clear the department head_id
            $dept = Department::where('head_id', $user->id)->first();
            if ($dept) {
                $dept->head_id = null;
                $dept->save();
            }

            // Detach roles and delete
            $user->roles()->detach();
            $user->delete();
        });

        return response()->json(['message' => 'User deleted successfully.']);
    }

    /**
     * Deactivate a user and revoke tokens.
     */
    public function deactivate(Request $request, $id)
    {
        $this->authorizeAdmin($request);

        $user = User::findOrFail($id);

        if ($user->active === false) {
            return response()->json(['message' => 'User is already deactivated.'], 200);
        }

        $user->active = false;
        $user->save();

        // Revoke all tokens
        $user->tokens()->delete();

        return response()->json(['message' => 'User deactivated successfully.']);
    }
}
