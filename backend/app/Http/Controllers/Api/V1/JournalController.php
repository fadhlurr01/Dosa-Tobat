<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\JournalEntry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JournalController extends Controller
{
    /**
     * Get user journals
     */
    public function index(Request $request): JsonResponse
    {
        $journals = JournalEntry::where('user_id', $request->user()->id)
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $journals
        ]);
    }

    /**
     * Store 5-step muhasabah entry
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'date' => 'nullable|date',
            'sin_id' => 'nullable|string',
            'mistake' => 'required|string',
            'trigger' => 'required|string',
            'hurt' => 'required|string',
            'fix' => 'required|string',
            'prevent' => 'required|string',
            'mood' => 'nullable|string',
        ]);

        $journal = JournalEntry::create([
            'user_id' => $request->user()->id,
            'sin_id' => $validated['sin_id'] ?? null,
            'date' => $validated['date'] ?? now()->format('Y-m-d'),
            'mistake' => $validated['mistake'],
            'trigger' => $validated['trigger'],
            'hurt' => $validated['hurt'],
            'fix' => $validated['fix'],
            'prevent' => $validated['prevent'],
            'mood' => $validated['mood'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Muhasabah berhasil disimpan. Semoga Allah mengampuni dan meneguhkan hati Anda.',
            'data' => $journal
        ], 201);
    }

    /**
     * Delete journal entry
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $journal = JournalEntry::where('user_id', $request->user()->id)
            ->where('id', $id)
            ->firstOrFail();

        $journal->delete();

        return response()->json([
            'success' => true,
            'message' => 'Catatan jurnal berhasil dihapus.'
        ]);
    }
}
