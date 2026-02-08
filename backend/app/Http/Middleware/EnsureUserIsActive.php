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

        // Only block if the user's active flag is explicitly false.
        if ($user && $user->active === false) {
            return response()->json(['message' => 'Account deactivated'], 403);
        }

        return $next($request);
    }
}
