<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Role;
use App\Models\Department;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'department_id',
        'active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'active' => 'boolean',
        'password' => 'hashed',
    ];

    /**
     * Many-to-Many relation to roles.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * Belongs-to relation to department.
     */
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    /**
     * Check if user has a specific role (by name).
     */
    public function hasRole(string $roleName): bool
    {
        // Use eager loaded collection if available, otherwise query to be safe
        if ($this->relationLoaded('roles')) {
            return $this->roles->contains('name', $roleName);
        }

        return $this->roles()->where('name', $roleName)->exists();
    }

    /**
     * Check if user has any of the given role names.
     *
     * @param array $roleNames
     */
    public function hasAnyRole(array $roleNames): bool
    {
        if ($this->relationLoaded('roles')) {
            return $this->roles->whereIn('name', $roleNames)->isNotEmpty();
        }

        return $this->roles()->whereIn('name', $roleNames)->exists();
    }

    /**
     * Returns true if user currently has the 'head' role.
     */
    public function isHead(): bool
    {
        return $this->hasRole('head');
    }

    /**
     * Assign one or more roles to the user without removing existing roles.
     *
     * Accepts either a string role name, numeric id, or array of role names/ids.
     *
     * @param string|int|array $roles
     */
    public function assignRoles($roles): void
    {
        $roles = is_array($roles) ? $roles : [$roles];

        // Separate numeric ids from names
        $ids = collect($roles)->filter(fn($r) => is_numeric($r))->map(fn($r) => (int) $r)->all();
        $names = collect($roles)->filter(fn($r) => !is_numeric($r))->all();

        $roleIds = collect($ids);

        if (!empty($names)) {
            $nameIds = Role::whereIn('name', $names)->pluck('id');
            $roleIds = $roleIds->merge($nameIds);
        }

        if ($roleIds->isNotEmpty()) {
            $this->roles()->syncWithoutDetaching($roleIds->unique()->values()->all());
        }
    }

    /**
     * Replace user's roles with the given set.
     *
     * If an empty array is passed it will remove all roles.
     *
     * @param array $roles role names or ids
     */
    public function syncRoles(array $roles): void
    {
        // Split numeric ids and names
        $ids = collect($roles)->filter(fn($r) => is_numeric($r))->map(fn($r) => (int) $r)->all();
        $names = collect($roles)->filter(fn($r) => !is_numeric($r))->all();

        $roleIds = collect($ids);

        if (!empty($names)) {
            $nameIds = Role::whereIn('name', $names)->pluck('id');
            $roleIds = $roleIds->merge($nameIds);
        }

        $this->roles()->sync($roleIds->unique()->values()->all());
    }

    /**
     * Remove a single role from user by id or name.
     *
     * @param string|int $role
     */
    public function removeRole($role): void
    {
        if (is_numeric($role)) {
            $this->roles()->detach((int) $role);
            return;
        }

        $roleId = Role::where('name', $role)->value('id');
        if ($roleId) {
            $this->roles()->detach($roleId);
        }
    }
}
