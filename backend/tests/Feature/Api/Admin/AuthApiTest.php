<?php

namespace Tests\Feature\Api\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    private function createAdmin(): User
    {
        return User::factory()->create([
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);
    }

    public function test_admin_can_login_with_valid_credentials(): void
    {
        $this->createAdmin();

        $response = $this->postJson('/api/admin/login', [
            'email' => 'admin@example.com',
            'password' => 'password',
        ]);

        $response->assertOk()->assertJsonStructure(['token']);
    }

    public function test_login_fails_with_invalid_password(): void
    {
        $this->createAdmin();

        $this->postJson('/api/admin/login', [
            'email' => 'admin@example.com',
            'password' => 'wrong-password',
        ])->assertUnauthorized();
    }

    public function test_login_fails_with_missing_fields(): void
    {
        $this->postJson('/api/admin/login', [])->assertUnprocessable();
    }

    public function test_admin_can_logout(): void
    {
        $user = $this->createAdmin();

        $token = $user->createToken('admin')->plainTextToken;

        $this->withToken($token)
            ->postJson('/api/admin/logout')
            ->assertOk();
    }

    public function test_logout_requires_authentication(): void
    {
        $this->postJson('/api/admin/logout')->assertUnauthorized();
    }
}
