<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Department;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DepartmentController extends Controller
{
    /**
     * Ensure the requesting user is an admin.
     * (You can also rely on the role:admin middleware in routes. This is an extra check.)
     */
    protected function authorizeAdmin(Request $request)
    {
        $user = $request->user();
        if (!$user || !$user->hasRole('admin')) {
            abort(403, 'Forbidden');
        }
    }

    /**
     * List departments.
     */
    public function index(Request $request)
    {
        $this->authorizeAdmin($request);

        $departments = Department::with('head', 'users')->get();

        return response()->json($departments);
    }

    /**
     * Create a department. Optionally set head_id (user id).
     *
     * If head_id is provided:
     *  - the referenced user must exist
     *  - the user must not already be head of another department
     *  - the user will be assigned the 'head' role (if not already)
     *  - the user's department_id will be set to this department
     */
    public function store(Request $request)
    {
        $this->authorizeAdmin($request);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:50|unique:departments,code',
            'description' => 'nullable|string',
            'head_id' => 'nullable|integer|exists:users,id',
        ]);

        // Transaction to keep things consistent
        $department = DB::transaction(function () use ($data) {
            $dept = Department::create([
                'name' => $data['name'],
                'code' => $data['code'] ?? null,
                'description' => $data['description'] ?? null,
                'head_id' => null,
            ]);

            if (!empty($data['head_id'])) {
                $user = User::find($data['head_id']);

                // ensure user isn't already head of another department
                $other = Department::where('head_id', $user->id)->first();
                if ($other) {
                    throw new \Illuminate\Validation\ValidationException(
                        \Illuminate\Validation\Validator::make([], []),
                        response()->json(['message' => 'User is already head of department: ' . $other->name], 422)
                    );
                }

                // assign user to this department if not already
                if ($user->department_id !== $dept->id) {
                    $user->department_id = $dept->id;
                    $user->save();
                }

                // ensure user has the 'head' role (assign without removing other roles)
                $user->assignRoles('head');

                // set department head_id
                $dept->head_id = $user->id;
                $dept->save();
            }

            return $dept;
        });

        return response()->json($department->load('head', 'users'), 201);
    }

    /**
     * Show a department.
     */
    public function show(Request $request, $id)
    {
        $this->authorizeAdmin($request);

        $dept = Department::with('head', 'users')->findOrFail($id);

        return response()->json($dept);
    }

    /**
     * Update a department. You can change name/code/description/head_id.
     *
     * Behavior for head_id:
     *  - If head_id changes to a user id, that user becomes head: they get 'head' role and department_id set to this department.
     *  - If head_id is set to null, the previous head (if any) will have 'head' role removed.
     *  - If head_id is omitted, head remains unchanged.
     */
    public function update(Request $request, $id)
    {
        $this->authorizeAdmin($request);

        $dept = Department::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'code' => 'sometimes|nullable|string|max:50|unique:departments,code,' . $dept->id,
            'description' => 'sometimes|nullable|string',
            'head_id' => 'nullable|integer|exists:users,id',
        ]);

        DB::transaction(function () use ($dept, $data) {
            $oldHeadId = $dept->head_id;

            // Update basic fields
            $dept->fill([
                'name' => $data['name'] ?? $dept->name,
                'code' => array_key_exists('code', $data) ? $data['code'] : $dept->code,
                'description' => array_key_exists('description', $data) ? $data['description'] : $dept->description,
            ]);
            $dept->save();

            // Handle head changes only if the key is present
            if (array_key_exists('head_id', $data)) {
                $newHeadId = $data['head_id'];

                // Clearing head
                if (is_null($newHeadId)) {
                    if ($oldHeadId) {
                        $old = User::find($oldHeadId);
                        if ($old) {
                            $old->removeRole('head');
                        }
                    }
                    $dept->head_id = null;
                    $dept->save();
                    return;
                }

                // If the new head is the same as current head, nothing to do
                if ($oldHeadId === $newHeadId) {
                    return;
                }

                $newHead = User::findOrFail($newHeadId);

                // ensure new head is not head of another department
                $other = Department::where('head_id', $newHead->id)->where('id', '<>', $dept->id)->first();
                if ($other) {
                    throw new \Illuminate\Validation\ValidationException(
                        \Illuminate\Validation\Validator::make([], []),
                        response()->json(['message' => 'User is already head of department: ' . $other->name], 422)
                    );
                }

                // assign user's department_id to this department if needed
                if ($newHead->department_id !== $dept->id) {
                    $newHead->department_id = $dept->id;
                    $newHead->save();
                }

                // give the 'head' role to new head
                $newHead->assignRoles('head');

                // remove 'head' role from old head (if different)
                if ($oldHeadId && $oldHeadId !== $newHead->id) {
                    $old = User::find($oldHeadId);
                    if ($old) {
                        $old->removeRole('head');
                    }
                }

                // set the department head_id
                $dept->head_id = $newHead->id;
                $dept->save();
            }
        });

        return response()->json($dept->load('head', 'users'));
    }

    /**
     * Delete a department.
     * By default we prevent deleting a department that still has users.
     */
    public function destroy(Request $request, $id)
    {
        $this->authorizeAdmin($request);

        $dept = Department::withCount('users')->findOrFail($id);

        if ($dept->users_count > 0) {
            return response()->json([
                'message' => 'Cannot delete department with users. Reassign or remove users first.'
            ], 422);
        }

        $dept->delete();

        return response()->json(['message' => 'Department deleted successfully.']);
    }
}
