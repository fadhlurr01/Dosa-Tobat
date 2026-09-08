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
            'sin_id' => 'required|string|exists:sins,id',
            'notes' => 'nullable|string',
        ]);

        $journey = UserJourney::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'sin_id' => $validated['sin_id'],
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
