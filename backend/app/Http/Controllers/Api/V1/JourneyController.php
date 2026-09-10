<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Sin;
use App\Models\UserJourney;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JourneyController extends Controller
{
    /**
     * Get user active journeys
     */
    public function index(Request $request): JsonResponse
    {
        $journeys = UserJourney::with('sin.category')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $journeys
        ]);
    }

    /**
     * Start a new journey
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'sin_id' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $sinId = strtolower(trim($validated['sin_id']));

        // Ensure sin exists in database so foreign key never fails
        $sin = Sin::find($sinId);
        if (!$sin) {
            $firstCategory = \App\Models\Category::first();
            $sin = Sin::create([
                'id' => $sinId,
                'category_id' => $firstCategory ? $firstCategory->id : 'syubhat',
                'name' => ucwords(str_replace('-', ' ', $sinId)),
                'definition' => 'Katalog pemulihan taubat untuk ' . $sinId,
                'source' => 'Al-Qur\'an dan As-Sunnah',
                'level' => 'SEDANG',
            ]);
        }

        $journey = UserJourney::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'sin_id' => $sinId,
            ],
            [
                'start_date' => now(),
                'status' => 'STABLE',
                'notes' => $validated['notes'] ?? null,
            ]
        );

        $journey->load('sin');

        return response()->json([
            'success' => true,
            'message' => 'Perjalanan istiqomah berhasil dimulai!',
            'data' => $journey
        ], 201);
    }

    /**
     * Record a relapse
     */
    public function recordRelapse(Request $request, string $sinId): JsonResponse
    {
        $journey = UserJourney::where('user_id', $request->user()->id)
            ->where('sin_id', $sinId)
            ->first();

        if (!$journey) {
            $journey = UserJourney::create([
                'user_id' => $request->user()->id,
                'sin_id' => $sinId,
                'start_date' => now(),
                'last_relapse' => now(),
                'status' => 'FALLEN',
            ]);
        } else {
            $journey->update([
                'last_relapse' => now(),
                'status' => 'FALLEN',
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Kejadian tercatat. Jangan berputus asa, mari bertaubat nasuha bersama.',
            'data' => $journey->fresh(['sin'])
        ]);
    }

    /**
     * Remove / complete journey
     */
    public function destroy(Request $request, string $sinId): JsonResponse
    {
        $deleted = UserJourney::where('user_id', $request->user()->id)
            ->where('sin_id', $sinId)
            ->delete();

        return response()->json([
            'success' => true,
            'message' => 'Perjalanan tobat berhasil diselesaikan / dihapus.'
        ]);
    }
}
