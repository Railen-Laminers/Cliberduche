<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

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
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'department_id' => $data['department_id'] ?? null,
            'active' => true,
        ]);

        if (!empty($data['roles'])) {
            $roleIds = Role::whereIn('name', $data['roles'])->pluck('id')->toArray();
            $user->roles()->sync($roleIds);
        }

        return response()->json($user->load('roles', 'department'), 201);
    }

    /**
     * Update an existing user.
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
            'active' => 'nullable|boolean',
        ]);

        if (isset($data['password']) && $data['password']) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        if (array_key_exists('roles', $data)) {
            $roleIds = Role::whereIn('name', $data['roles'] ?? [])->pluck('id')->toArray();
            $user->roles()->sync($roleIds);
        }

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

        $user->delete();

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
