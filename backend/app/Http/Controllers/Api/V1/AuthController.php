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
            'phone' => 'nullable|string|max:25',
            'password' => 'nullable|string|min:6',
            'plan' => 'nullable|string',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => strtolower($validated['email']),
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($validated['password'] ?? 'password123'),
            'role' => 'USER',
            'plan' => $validated['plan'] ?? 'FREE',
            'status' => 'ACTIVE',
            'streak_days' => 0,
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
     * Update current user profile
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:25',
            'avatar' => 'nullable|string',
            'title' => 'nullable|string|max:255',
        ]);

        $user->fill(array_filter($validated, fn($v) => !is_null($v)));
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui.',
            'data' => [
                'user' => $user
            ]
        ]);
    }

    /**
     * Update current user password
     */
    public function updatePassword(Request $request): JsonResponse
    {
        $request->validate([
            'current_password' => 'nullable|string',
            'new_password' => 'required|string|min:6',
        ]);

        $user = $request->user();

        if ($request->filled('current_password')) {
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Password saat ini salah.'
                ], 422);
            }
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Password berhasil diubah.'
        ]);
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
            return response()->json([
                'success' => false,
                'error' => 'NOT_REGISTERED',
                'message' => 'Akun belum terdaftar. Silakan lakukan pendaftaran akun (Sign Up) terlebih dahulu.'
            ], 404);
        }

        if ($user->status === 'SUSPENDED') {
            return response()->json([
                'success' => false,
                'error' => 'SUSPENDED',
                'message' => 'Akun Anda sedang dinonaktifkan oleh Administrator. Hubungi bantuan.'
            ], 403);
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
