<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\LeadDistributionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    Route::post('/admin/leads/distribute', [LeadDistributionController::class, 'distribute'])
        ->name('admin.leads.distribute');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
    // Add any other admin routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    // Add any other verified routes here
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_middleware'),
    'admin'
])->group(function () {
 