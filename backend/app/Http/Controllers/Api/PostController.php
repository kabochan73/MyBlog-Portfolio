<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $posts = Post::with('tags')
            ->where('status', 'published')
            ->when($request->search, fn($q) => $q->where('title', 'like', "%{$request->search}%"))
            ->when($request->tag, fn($q) => $q->whereHas('tags', fn($q) => $q->where('slug', $request->tag)))
            ->latest('published_at')
            ->get();

        return response()->json($posts);
    }

    public function show(string $slug): JsonResponse
    {
        $post = Post::with('tags')
            ->where('status', 'published')
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json($post);
    }
}
