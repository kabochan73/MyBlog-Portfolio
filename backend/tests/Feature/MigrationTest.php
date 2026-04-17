<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class MigrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_posts_table_has_expected_columns(): void
    {
        $this->assertTrue(Schema::hasTable('posts'));
        $this->assertTrue(Schema::hasColumns('posts', [
            'id', 'slug', 'title', 'body', 'status', 'published_at', 'created_at', 'updated_at',
        ]));
    }

    public function test_tags_table_has_expected_columns(): void
    {
        $this->assertTrue(Schema::hasTable('tags'));
        $this->assertTrue(Schema::hasColumns('tags', [
            'id', 'name', 'slug', 'created_at', 'updated_at',
        ]));
    }

    public function test_post_tag_table_has_expected_columns(): void
    {
        $this->assertTrue(Schema::hasTable('post_tag'));
        $this->assertTrue(Schema::hasColumns('post_tag', [
            'post_id', 'tag_id',
        ]));
    }
}
