<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\DailyIbadah;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class IbadahController extends Controller
{
    /**
     * Get ibadah logs for a date range / specific date
     */
    public function index(Request $request): JsonResponse
    {
        $date = $request->get('date', now()->format('Y-m-d'));

        $logs = DailyIbadah::where('user_id', $request->user()->id)
            ->where('date', $date)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $logs
        ]);
    }

    /**
     * Toggle daily ibadah check
     */
    public function toggle(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'ibadah_id' => 'required|string',
        ]);

        $log = DailyIbadah::where('user_id', $request->user()->id)
            ->where('date', $validated['date'])
            ->where('ibadah_id', $validated['ibadah_id'])
            ->first();

        if ($log) {
            $log->update(['is_completed' => !$log->is_completed]);
        } else {
            $log = DailyIbadah::create([
                'user_id' => $request->user()->id,
                'date' => $validated['date'],
                'ibadah_id' => $validated['ibadah_id'],
                'is_completed' => true,
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $log
        ]);
    }
}
