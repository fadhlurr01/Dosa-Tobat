<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\DzikirLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DzikirController extends Controller
{
    public function log(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'preset_id' => 'required|string',
            'title' => 'required|string',
            'count_reached' => 'required|integer',
            'session_date' => 'nullable|date',
        ]);

        $log = DzikirLog::create([
            'user_id' => $request->user()->id,
            'preset_id' => $validated['preset_id'],
            'title' => $validated['title'],
            'count_reached' => $validated['count_reached'],
            'session_date' => $validated['session_date'] ?? now()->format('Y-m-d'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Alhamdulillah, target dzikir tercatat!',
            'data' => $log
        ], 201);
    }
}
