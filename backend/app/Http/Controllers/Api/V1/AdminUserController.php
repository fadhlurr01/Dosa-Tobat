<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminUserController extends Controller
{
    /**
     * Get all users in the database
     */
    public function index(): JsonResponse
    {
        $users = User::orderBy('id', 'desc')->get();

        return response()->json([
            'success' => true,
            'total' => $users->count(),
            'data' => $users,
        ]);
    }

    /**
     * Delete user from MySQL database
     */
    public function destroy(string $id, Request $request): JsonResponse
    {
        $email = $request->query('email') ?? $request->input('email');

        // Look up user by numeric ID, UUID string, email, or name
        $user = null;
        if (is_numeric($id)) {
            $user = User::find($id);
        }

        if (!$user && $email) {
            $user = User::where('email', strtolower($email))->first();
        }

        if (!$user) {
            $user = User::where('email', strtolower($id))
                ->orWhere('id', $id)
                ->first();
        }

        if (!$user) {
            return response()->json([
                'success' => true,
                'message' => 'User tidak ditemukan atau sudah terhapus dari MySQL.',
            ]);
        }

        // Security Guard: Primary Super Admin cannot be deleted
        if (strtolower($user->email) === 'admin@taubat.app' || $user->role === 'SUPER_ADMIN') {
            return response()->json([
                'success' => false,
                'message' => 'Akun Super Admin Utama dilindungi sistem dan tidak dapat dihapus.',
            ], 403);
        }

        $userName = $user->name;
        $userEmail = $user->email;

        // Perform clean deletion of user and related entities
        DB::transaction(function () use ($user) {
            $user->tokens()->delete();
            $user->journeys()->delete();
            $user->journals()->delete();
            $user->dailyIbadahs()->delete();
            $user->dzikirLogs()->delete();
            $user->bookmarks()->delete();
            $user->delete();
        });

        return response()->json([
            'success' => true,
            'message' => "Akun pengguna '{$userName}' ({$userEmail}) berhasil dihapus permanen dari MySQL Laragon.",
            'deleted_id' => $id,
        ]);
    }

    /**
     * Update user details (name, email, role, plan, status, title)
     */
    public function update(string $id, Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'role' => 'sometimes|required|in:USER,CONTENT_ADMIN,SUPER_ADMIN',
            'plan' => 'sometimes|required|string',
            'status' => 'sometimes|required|in:ACTIVE,SUSPENDED',
            'title' => 'nullable|string',
        ]);

        $user = null;
        if (is_numeric($id)) {
            $user = User::find($id);
        }

        if (!$user && $request->input('original_email')) {
            $user = User::where('email', strtolower($request->input('original_email')))->first();
        }

        if (!$user) {
            $user = User::where('email', strtolower($id))->first();
        }

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan di MySQL.',
            ], 404);
        }

        // Security Guard: Primary Super Admin role and status are immutable
        $isSuperAdmin = (strtolower($user->email) === 'admin@taubat.app' || $user->role === 'SUPER_ADMIN');
        if ($isSuperAdmin) {
            if ($request->has('role') && $request->input('role') !== 'SUPER_ADMIN') {
                return response()->json([
                    'success' => false,
                    'message' => 'Peran Super Admin Utama dilindungi sistem dan tidak dapat diubah.',
                ], 403);
            }
            if ($request->has('status') && $request->input('status') === 'SUSPENDED') {
                return response()->json([
                    'success' => false,
                    'message' => 'Akun Super Admin Utama tidak dapat dinonaktifkan (anti lockout).',
                ], 403);
            }
        }

        if ($request->has('name')) $user->name = $request->input('name');
        if ($request->has('email')) $user->email = strtolower($request->input('email'));
        if ($request->has('phone')) $user->phone = $request->input('phone');
        if ($request->has('role')) $user->role = $request->input('role');
        if ($request->has('plan')) $user->plan = $request->input('plan');
        if ($request->has('status')) $user->status = $request->input('status');
        if ($request->has('title')) $user->title = $request->input('title');
        if ($request->has('avatar')) $user->avatar = $request->input('avatar');

        $user->save();

        return response()->json([
            'success' => true,
            'message' => "Data pengguna '{$user->name}' berhasil diperbarui di MySQL Laragon.",
            'data' => $user,
        ]);
    }

    /**
     * Update user status (ACTIVE | SUSPENDED)
     */
    public function updateStatus(string $id, Request $request): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:ACTIVE,SUSPENDED',
            'email' => 'nullable|email',
        ]);

        $status = $request->input('status');
        $email = $request->input('email');

        $user = null;
        if (is_numeric($id)) {
            $user = User::find($id);
        }

        if (!$user && $email) {
            $user = User::where('email', strtolower($email))->first();
        }

        if (!$user) {
            $user = User::where('email', strtolower($id))->first();
        }

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan di MySQL.',
            ], 404);
        }

        // Security Guard: Primary Super Admin cannot be suspended
        if (strtolower($user->email) === 'admin@taubat.app' || $user->role === 'SUPER_ADMIN') {
            return response()->json([
                'success' => false,
                'message' => 'Akun Super Admin Utama dilindungi dan tidak dapat dinonaktifkan.',
            ], 403);
        }

        $user->status = $status;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => "Status pengguna '{$user->name}' berhasil diperbarui menjadi {$status}.",
            'data' => $user,
        ]);
    }

    /**
     * Export Full Database Backup (JSON)
     */
    public function backup(): JsonResponse
    {
        $backupData = [
            'timestamp' => now()->toIso8601String(),
            'version' => '1.0.0',
            'users' => User::all(),
            'categories' => \App\Models\Category::all(),
            'sins' => \App\Models\Sin::all(),
            'journeys' => \App\Models\UserJourney::all(),
            'journals' => \App\Models\JournalEntry::all(),
            'daily_ibadahs' => \App\Models\DailyIbadah::all(),
            'dzikir_logs' => \App\Models\DzikirLog::all(),
            'cms_items' => \App\Models\ContentItem::all(),
        ];

        return response()->json([
            'success' => true,
            'message' => 'Database backup berhasil digenerate.',
            'data' => $backupData,
        ]);
    }

    /**
     * Restore Database Backup (JSON)
     */
    public function restore(Request $request): JsonResponse
    {
        $data = $request->input('data') ?? $request->all();

        if (isset($data['users']) && is_array($data['users'])) {
            foreach ($data['users'] as $u) {
                if (isset($u['email'])) {
                    User::updateOrCreate(
                        ['email' => strtolower($u['email'])],
                        [
                            'name' => $u['name'] ?? 'User',
                            'phone' => $u['phone'] ?? null,
                            'role' => $u['role'] ?? 'USER',
                            'plan' => $u['plan'] ?? 'FREE',
                            'status' => $u['status'] ?? 'ACTIVE',
                            'title' => $u['title'] ?? null,
                            'streak_days' => $u['streak_days'] ?? 0,
                            'avatar' => $u['avatar'] ?? null,
                            'is_demo' => $u['is_demo'] ?? false,
                        ]
                    );
                }
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Data backup berhasil direstore ke database MySQL Laragon.',
        ]);
    }

    /**
     * Reset Database to Seed State
     */
    public function reset(): JsonResponse
    {
        \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Database berhasil direset ke status bawaan (seed data).',
        ]);
    }
}

