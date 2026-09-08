<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ContentItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContentItemController extends Controller
{
    /**
     * Get published content items (or all for admin)
     */
    public function index(Request $request): JsonResponse
    {
        $query = ContentItem::query();

        if ($request->has('type')) {
            $query->where('type', strtoupper($request->type));
        }

        if (!$request->user() || !in_array($request->user()->role, ['SUPER_ADMIN', 'CONTENT_ADMIN'])) {
            $query->where('status', 'PUBLISHED');
        }

        $items = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $items
        ]);
    }

    /**
     * Store new content item (Admin / Asatidz)
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'type' => 'required|in:AYAT,HADIS,DOA',
            'arabic' => 'nullable|string',
            'latin' => 'nullable|string',
            'translation' => 'required|string',
            'reference' => 'nullable|string',
            'status' => 'nullable|in:DRAFT,REVIEW,VERIFIED,PUBLISHED',
        ]);

        $item = ContentItem::create([
            'title' => $validated['title'],
            'type' => $validated['type'],
            'arabic' => $validated['arabic'] ?? null,
            'latin' => $validated['latin'] ?? null,
            'translation' => $validated['translation'],
            'reference' => $validated['reference'] ?? null,
            'status' => $validated['status'] ?? 'DRAFT',
            'author' => $request->user()->name ?? 'Admin',
            'version' => 1,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Konten berhasil disimpan.',
            'data' => $item
        ], 201);
    }

    /**
     * Update content status (Verification by Ustadz/Admin)
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:DRAFT,REVIEW,VERIFIED,PUBLISHED',
            'reviewer' => 'nullable|string',
        ]);

        $item = ContentItem::findOrFail($id);
        $item->status = $validated['status'];
        if (isset($validated['reviewer'])) {
            $item->reviewer = $validated['reviewer'];
        }
        $item->version += 1;
        $item->save();

        return response()->json([
            'success' => true,
            'message' => 'Status konten berhasil diperbarui menjadi ' . $item->status,
            'data' => $item
        ]);
    }
}
