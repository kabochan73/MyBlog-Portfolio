<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Post::with('tags')->latest()->get());
    }

    public function show(Post $post): JsonResponse
    {
        return response()->json($post->load('tags'));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'slug'         => 'required|string|unique:posts,slug',
            'title'        => 'required|string',
            'body'         => 'required|string',
            'status'       => 'required|in:published,draft',
            'published_at' => 'nullable|date',
            'tags'         => 'array',
            'tags.*'       => 'integer|exists:tags,id',
        ]);

        $post = Post::create($data);
        $post->tags()->sync($data['tags'] ?? []);

        return response()->json($post->load('tags'), 201);
    }

    public function update(Request $request, Post $post): JsonResponse
    {
        $data = $request->validate([
            'slug'         => 'required|string|unique:posts,slug,' . $post->id,
            'title'        => 'required|string',
            'body'         => 'required|string',
            'status'       => 'required|in:published,draft',
            'published_at' => 'nullable|date',
            'tags'         => 'array',
            'tags.*'       => 'integer|exists:tags,id',
        ]);

        $post->update($data);
        $post->tags()->sync($data['tags'] ?? []);

        return response()->json($post->load('tags'));
    }

    public function destroy(Post $post): JsonResponse
    {
        $post->delete();

        return response()->json(null, 204);
    }
}
