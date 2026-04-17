<?php

namespace Tests\Feature\Api;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_returns_only_published_posts(): void
    {
        Post::create(['slug' => 'published', 'title' => 'Published', 'body' => '# Hello', 'status' => 'published']);
        Post::create(['slug' => 'draft', 'title' => 'Draft', 'body' => '# Hello', 'status' => 'draft']);

        $response = $this->getJson('/api/posts');

        $response->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.slug', 'published');
    }

    public function test_can_search_posts_by_title(): void
    {
        Post::create(['slug' => 'laravel-post', 'title' => 'Laravel Guide', 'body' => '# Hello', 'status' => 'published']);
        Post::create(['slug' => 'nextjs-post', 'title' => 'Next.js Guide', 'body' => '# Hello', 'status' => 'published']);

        $response = $this->getJson('/api/posts?search=Laravel');

        $response->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.slug', 'laravel-post');
    }

    public function test_can_filter_posts_by_tag(): void
    {
        $tag = Tag::create(['name' => 'Laravel', 'slug' => 'laravel']);
        $post = Post::create(['slug' => 'laravel-post', 'title' => 'Laravel Post', 'body' => '# Hello', 'status' => 'published']);
        Post::create(['slug' => 'other-post', 'title' => 'Other Post', 'body' => '# Hello', 'status' => 'published']);
        $post->tags()->attach($tag);

        $response = $this->getJson('/api/posts?tag=laravel');

        $response->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.slug', 'laravel-post');
    }

    public function test_can_get_post_by_slug(): void
    {
        Post::create(['slug' => 'my-post', 'title' => 'My Post', 'body' => '# Hello', 'status' => 'published']);

        $response = $this->getJson('/api/posts/my-post');

        $response->assertOk()
            ->assertJsonPath('slug', 'my-post');
    }

    public function test_returns_404_for_draft_post(): void
    {
        Post::create(['slug' => 'draft-post', 'title' => 'Draft', 'body' => '# Hello', 'status' => 'draft']);

        $this->getJson('/api/posts/draft-post')->assertNotFound();
    }
}
