<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'nullable|string|min:6',
            'plan' => 'nullable|string',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => strtolower($validated['email']),
            'password' => Hash::make($validated['password'] ?? 'password123'),
            'role' => 'USER',
            'plan' => $validated['plan'] ?? 'FREE',
            'status' => 'ACTIVE',
            'streak_days' => 1,
            'is_demo' => false,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil. Selamat datang di Dosa & Tobat!',
            'data' => [
                'user' => $user,
                'token' => $token,
            ]
        ], 201);
    }

    /**
     * Standard email/password login
     */
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'nullable|string',
        ]);

        $user = User::where('email', strtolower($validated['email']))->first();

        if (!$user) {
            // Auto-create basic user for frictionless experience if not exists
            $user = User::create([
                'name' => explode('@', $validated['email'])[0],
                'email' => strtolower($validated['email']),
                'password' => Hash::make($validated['password'] ?? 'password123'),
                'role' => 'USER',
                'plan' => 'FREE',
                'status' => 'ACTIVE',
                'streak_days' => 1,
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil. Selamat datang kembali, ' . $user->name,
            'data' => [
                'user' => $user,
                'token' => $token,
            ]
        ]);
    }

    /**
     * 1-Click Demo Login Switcher
     */
    public function demoLogin(string $id): JsonResponse
    {
        $idMap = [
            'demo_user_1' => 1,
            'demo_user_2' => 2,
            'demo_user_3' => 3,
            'demo_user_4' => 4,
        ];

        $numericId = $idMap[$id] ?? (is_numeric($id) ? (int)$id : 1);
        $user = User::find($numericId) ?? User::first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Akun demo tidak ditemukan'], 404);
        }

        $token = $user->createToken('demo_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Berhasil masuk sebagai ' . $user->name,
            'data' => [
                'user' => $user,
                'token' => $token,
            ]
        ]);
    }

    /**
     * Get current authenticated user profile
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        $user->load(['journeys.sin', 'bookmarks']);

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
            ]
        ]);
    }

    /**
     * Logout and revoke tokens
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil. Sesi telah diakhiri.'
        ]);
    }
}
