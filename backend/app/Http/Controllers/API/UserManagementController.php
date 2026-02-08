<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserManagementController extends Controller
{
    protected function authorizeAdmin(Request $request)
    {
        $user = $request->user();
        if (!$user || !$user->hasRole('admin')) {
            abort(403, 'Forbidden');
        }
    }

    public function index(Request $request)
    {
        $this->authorizeAdmin($request);
        return response()->json(User::with('roles','department')->get());
    }

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

        return response()->json($user->load('roles','department'), 201);
    }

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

        return response()->json($user->load('roles','department'));
    }

    public function destroy(Request $request, $id)
    {
        $this->authorizeAdmin($request);
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted']);
    }

    public function deactivate(Request $request, $id)
    {
        $this->authorizeAdmin($request);
        $user = User::findOrFail($id);
        $user->active = false;
        $user->save();
        return response()->json(['message' => 'User deactivated']);
    }
}
