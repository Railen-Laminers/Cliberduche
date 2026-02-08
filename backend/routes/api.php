<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserManagementController;

// Authentication
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware(['auth:sanctum', 'active'])->get('/me', [AuthController::class, 'me']);

// Admin routes: auth, active, admin role
Route::middleware(['auth:sanctum', 'active', 'role:admin'])->group(function () {
    Route::get('/admin/users', [UserManagementController::class, 'index']);
    Route::post('/admin/users', [UserManagementController::class, 'store']);
    Route::put('/admin/users/{id}', [UserManagementController::class, 'update']);
    Route::delete('/admin/users/{id}', [UserManagementController::class, 'destroy']);
    Route::post('/admin/users/{id}/deactivate', [UserManagementController::class, 'deactivate']);
});
