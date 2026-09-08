<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\Sin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SinController extends Controller
{
    /**
     * Get list of sins with search and category filter
     */
    public function index(Request $request): JsonResponse
    {
        $query = Sin::with('category');

        if ($request->has('category') && $request->category !== 'semua') {
            $query->where('category_id', $request->category);
        }

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('definition', 'like', "%{$search}%");
            });
        }

        if ($request->get('sort') === 'za') {
            $query->orderBy('name', 'desc');
        } else {
            $query->orderBy('name', 'asc');
        }

        $sins = $query->get();

        return response()->json([
            'success' => true,
            'data' => $sins
        ]);
    }

    /**
     * Get single sin detail
     */
    public function show(string $id): JsonResponse
    {
        $sin = Sin::with('category')->find($id);

        if (!$sin) {
            return response()->json([
                'success' => false,
                'message' => 'Topik dosa tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $sin
        ]);
    }

    /**
     * Toggle bookmark for authenticated user
     */
    public function toggleBookmark(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        $sin = Sin::findOrFail($id);

        $existing = Bookmark::where('user_id', $user->id)->where('sin_id', $sin->id)->first();

        if ($existing) {
            $existing->delete();
            $sin->decrement('bookmarks_count');
            $bookmarked = false;
            $msg = 'Topik dihapus dari bookmark';
        } else {
            Bookmark::create([
                'user_id' => $user->id,
                'sin_id' => $sin->id,
            ]);
            $sin->increment('bookmarks_count');
            $bookmarked = true;
            $msg = 'Topik berhasil disimpan ke bookmark';
        }

        return response()->json([
            'success' => true,
            'message' => $msg,
            'data' => [
                'bookmarked' => $bookmarked,
                'bookmarks_count' => $sin->fresh()->bookmarks_count,
            ]
        ]);
    }
}
