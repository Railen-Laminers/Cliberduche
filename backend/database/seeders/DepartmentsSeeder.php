<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;

class DepartmentsSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            ['name' => 'HR', 'code' => 'HR', 'description' => 'Human Resources'],
            ['name' => 'Finance', 'code' => 'FIN', 'description' => 'Finance & Accounting'],
            ['name' => 'Procurement', 'code' => 'PRC', 'description' => 'Procurement & Supplies'],
            ['name' => 'Safety/Warehouse', 'code' => 'SFW', 'description' => 'Safety and Warehouse'],
            ['name' => 'Engineering', 'code' => 'ENG', 'description' => 'Engineering and Projects'],
        ];

        foreach ($departments as $d) {
            Department::firstOrCreate(['name' => $d['name']], $d);
        }
    }
}
