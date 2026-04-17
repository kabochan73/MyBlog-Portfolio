<?php

namespace Tests\Feature\Api\Admin;

use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPostApiTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsAdmin()
    {
        $user = User::factory()->create();
        return $this->actingAs($user, 'sanctum');
    }

    public function test_admin_can_get_all_posts_including_drafts(): void
    {
        Post::create(['slug' => 'published', 'title' => 'Published', 'body' => '#Hello', 'status' => 'published']);
        Post::create(['slug' => 'draft', 'title' => 'Draft', 'body' => '#Hello', 'status' => 'draft']);

        $this->actingAsAdmin()
            ->getJson('/api/admin/posts')
            ->assertOk()
            ->assertJsonCount(2);
    }

    public function test_admin_can_create_post(): void
    {
        $tag = Tag::create(['name' => 'Laravel', 'slug' => 'laravel']);

        $this->actingAsAdmin()
            ->postJson('/api/admin/posts', [
                'slug'   => 'new-post',
                'title'  => 'New Post',
                'body'   => '# Hello',
                'status' => 'draft',
                'tags'   => [$tag->id],
            ])
            ->assertCreated()
            ->assertJsonPath('slug', 'new-post');

        $this->assertDatabaseHas('posts', ['slug' => 'new-post']);
    }

    public function test_admin_can_update_post(): void
    {
        $post = Post::create(['slug' => 'old-slug', 'title' => 'Old', 'body' => '#Hello', 'status' => 'draft']);

        $this->actingAsAdmin()
            ->putJson("/api/admin/posts/{$post->id}", [
                'slug'   => 'new-slug',
                'title'  => 'Updated',
                'body'   => '# Updated',
                'status' => 'published',
            ])
            ->assertOk()
            ->assertJsonPath('title', 'Updated');
    }

    public function test_admin_can_delete_post(): void
    {
        $post = Post::create(['slug' => 'to-delete', 'title' => 'Delete Me', 'body' => '#Hello', 'status' => 'draft']);

        $this->actingAsAdmin()
            ->deleteJson("/api/admin/posts/{$post->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }

    public function test_unauthenticated_user_cannot_access_admin_posts(): void
    {
        $this->getJson('/api/admin/posts')->assertUnauthorized();
    }
}
