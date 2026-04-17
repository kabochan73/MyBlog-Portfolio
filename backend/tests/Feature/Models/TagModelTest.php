<?php

namespace Tests\Feature\Models;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TagModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_tag_can_be_created(): void
    {
        Tag::create(['name' => 'Laravel', 'slug' => 'laravel']);

        $this->assertDatabaseHas('tags', ['slug' => 'laravel']);
    }

    public function test_tag_belongs_to_many_posts(): void
    {
        $tag = Tag::create(['name' => 'Laravel', 'slug' => 'laravel']);

        $post = Post::create([
            'slug' => 'test-post',
            'title' => 'Test Post',
            'body' => '# Hello',
            'status' => 'draft',
        ]);

        $tag->posts()->attach($post);

        $this->assertCount(1, $tag->posts);
        $this->assertEquals('test-post', $tag->posts->first()->slug);
    }
}
