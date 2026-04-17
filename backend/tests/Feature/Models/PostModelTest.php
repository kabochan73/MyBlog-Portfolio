<?php

namespace Tests\Feature\Models;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_post_can_be_created(): void
    {
        Post::create([
            'slug' => 'test-post',
            'title' => 'Test Post',
            'body' => '# Hello',
            'status' => 'draft',
        ]);

        $this->assertDatabaseHas('posts', ['slug' => 'test-post']);
    }

    public function test_post_belongs_to_many_tags(): void
    {
        $post = Post::create([
            'slug' => 'test-post',
            'title' => 'Test Post',
            'body' => '# Hello',
            'status' => 'draft',
        ]);

        $tag = Tag::create(['name' => 'Laravel', 'slug' => 'laravel']);
        $post->tags()->attach($tag);

        $this->assertCount(1, $post->tags);
        $this->assertEquals('laravel', $post->tags->first()->slug);
    }

    public function test_post_status_defaults_to_draft(): void
    {
        $post = Post::create([
            'slug' => 'test-post',
            'title' => 'Test Post',
            'body' => '# Hello',
        ]);

        $this->assertEquals('draft', $post->fresh()->status);
    }
}
