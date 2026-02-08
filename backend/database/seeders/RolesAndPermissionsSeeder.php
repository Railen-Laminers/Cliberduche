<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['name' => 'admin', 'label' => 'Administrator'],
            ['name' => 'department_head', 'label' => 'Department Head / VP'],
            ['name' => 'hr_officer', 'label' => 'HR Officer'],
            ['name' => 'finance_officer', 'label' => 'Finance Officer'],
            ['name' => 'procurement_staff', 'label' => 'Procurement Staff'],
            ['name' => 'safety_staff', 'label' => 'Safety/Warehouse Staff'],
            ['name' => 'engineering_staff', 'label' => 'Engineering Staff'],
        ];

        foreach ($roles as $r) {
            Role::firstOrCreate(['name' => $r['name']], $r);
        }

        $permissions = [
            ['name' => 'manage_users', 'label' => 'Manage Users'],
            ['name' => 'approve_requests', 'label' => 'Approve Requests'],
            ['name' => 'manage_payroll', 'label' => 'Manage Payroll'],
            ['name' => 'manage_procurement', 'label' => 'Manage Procurement'],
            ['name' => 'manage_inventory', 'label' => 'Manage Inventory'],
            ['name' => 'manage_projects', 'label' => 'Manage Projects'],
        ];

        foreach ($permissions as $p) {
            Permission::firstOrCreate(['name' => $p['name']], $p);
        }

        // Assign permissions to roles (simple mapping)
        $admin = Role::where('name', 'admin')->first();
        $allPermissions = Permission::all();
        $admin->permissions()->sync($allPermissions->pluck('id')->toArray());

        $roleMap = [
            'department_head' => ['approve_requests','manage_projects'],
            'hr_officer' => ['manage_payroll'],
            'finance_officer' => ['manage_payroll','manage_procurement'],
            'procurement_staff' => ['manage_procurement'],
            'safety_staff' => ['manage_inventory'],
            'engineering_staff' => ['manage_projects'],
        ];

        foreach ($roleMap as $roleName => $perms) {
            $role = Role::where('name', $roleName)->first();
            $permIds = Permission::whereIn('name', $perms)->pluck('id')->toArray();
            $role->permissions()->sync($permIds);
        }
    }
}
