<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsActive
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        if ($user && property_exists($user, 'active') && !$user->active) {
            return response()->json(['message' => 'Account deactivated'], 403);
        }

        return $next($request);
    }
}
