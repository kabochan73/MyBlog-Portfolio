<?php

namespace Tests\Feature\Api;

use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TagApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_returns_all_tags(): void
    {
        Tag::create(['name' => 'Laravel', 'slug' => 'laravel']);
        Tag::create(['name' => 'Next.js', 'slug' => 'nextjs']);

        $response = $this->getJson('/api/tags');

        $response->assertOk()->assertJsonCount(2);
    }

    public function test_returns_tags_ordered_by_name(): void
    {
        Tag::create(['name' => 'PHP', 'slug' => 'php']);
        Tag::create(['name' => 'Laravel', 'slug' => 'laravel']);

        $response = $this->getJson('/api/tags');

        $response->assertOk()
            ->assertJsonPath('0.name', 'Laravel')
            ->assertJsonPath('1.name', 'PHP');
    }
}
