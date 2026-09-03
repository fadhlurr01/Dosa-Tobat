<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\ContentItemController;
use App\Http\Controllers\Api\V1\DzikirController;
use App\Http\Controllers\Api\V1\IbadahController;
use App\Http\Controllers\Api\V1\JournalController;
use App\Http\Controllers\Api\V1\JourneyController;
use App\Http\Controllers\Api\V1\SinController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Health check endpoint
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'Dosa & Tobat REST API',
        'version' => '1.0.0',
        'timestamp' => now()->toISOString(),
    ]);
});

// API v1 Routes
Route::prefix('v1')->group(function () {

    // Authentication Routes
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::get('/auth/demo/{id}', [AuthController::class, 'demoLogin']);

    // Public Master Data
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/sins', [SinController::class, 'index']);
    Route::get('/sins/{id}', [SinController::class, 'show']);
    Route::get('/cms/contents', [ContentItemController::class, 'index']);

    // Protected User Routes (Require Sanctum Token)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // Bookmarks
        Route::post('/sins/{id}/bookmark', [SinController::class, 'toggleBookmark']);

        // User Journeys
        Route::get('/journeys', [JourneyController::class, 'index']);
        Route::post('/journeys', [JourneyController::class, 'store']);
        Route::post('/journeys/{sinId}/relapse', [JourneyController::class, 'recordRelapse']);
        Route::delete('/journeys/{sinId}', [JourneyController::class, 'destroy']);

        // 5-Step Muhasabah Journals
        Route::get('/journals', [JournalController::class, 'index']);
        Route::post('/journals', [JournalController::class, 'store']);
        Route::delete('/journals/{id}', [JournalController::class, 'destroy']);

        // Daily Ibadah Checklist
        Route::get('/ibadah', [IbadahController::class, 'index']);
        Route::post('/ibadah/toggle', [IbadahController::class, 'toggle']);

        // Dzikir Logs
        Route::post('/dzikir/log', [DzikirController::class, 'log']);

        // Content Management System (Asatidz & Admin)
        Route::post('/cms/contents', [ContentItemController::class, 'store']);
        Route::patch('/cms/contents/{id}/status', [ContentItemController::class, 'updateStatus']);
    });
});
