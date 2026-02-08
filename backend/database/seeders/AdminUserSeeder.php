<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@cliberduche.com');
        $password = env('ADMIN_PASSWORD', 'adminpassword');

        $admin = User::firstOrCreate([
            'email' => $email,
        ], [
            'name' => 'Administrator',
            'password' => Hash::make($password),
        ]);

        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole && !$admin->roles()->where('role_id', $adminRole->id)->exists()) {
            $admin->roles()->attach($adminRole->id);
        }
    }
}
