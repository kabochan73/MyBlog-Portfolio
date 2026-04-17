<?php

namespace Tests\Feature\Api\Admin;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminTagApiTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsAdmin()
    {
        return $this->actingAs(User::factory()->create(), 'sanctum');
    }

    public function test_admin_can_create_tag(): void
    {
        $this->actingAsAdmin()
            ->postJson('/api/admin/tags', ['name' => 'Laravel', 'slug' => 'laravel'])
            ->assertCreated()
            ->assertJsonPath('slug', 'laravel');

        $this->assertDatabaseHas('tags', ['slug' => 'laravel']);
    }

    public function test_admin_can_delete_tag(): void
    {
        $tag = Tag::create(['name' => 'Laravel', 'slug' => 'laravel']);

        $this->actingAsAdmin()
            ->deleteJson("/api/admin/tags/{$tag->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('tags', ['id' => $tag->id]);
    }

    public function test_unauthenticated_user_cannot_create_tag(): void
    {
        $this->postJson('/api/admin/tags', ['name' => 'Laravel', 'slug' => 'laravel'])
            ->assertUnauthorized();
    }
}
