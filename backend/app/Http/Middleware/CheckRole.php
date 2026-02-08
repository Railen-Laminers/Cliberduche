<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     * Accepts a single role name or multiple roles separated by `|` or `,`.
     */
    public function handle(Request $request, Closure $next, string $roles = null)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        if (is_null($roles)) {
            return $next($request);
        }

        $allowed = preg_split('/[|,]/', $roles, flags: PREG_SPLIT_NO_EMPTY);

        if ($user->hasAnyRole($allowed)) {
            return $next($request);
        }

        return response()->json(['message' => 'Forbidden - insufficient role'], 403);
    }
}
