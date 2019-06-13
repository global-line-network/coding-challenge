<?php

namespace Tests\Unit;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */

    public function testGettingAllUsers()
    {
        $response = $this->json('GET', '/users');
        $response->assertStatus(200);

        $response->assertJsonStructure(
            [
                [
                    'id',
                    'name',
                    'date',
                    'created_at',
                    'updated_at'
                ]
            ]
        );
    }

    public function testCreateUser()
    {
        $user = factory(User::class)->create();

        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'date' => $user->date,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at

        ];

        $response = $this->actingAs($user, 'api')->json('POST', '/users/create', $data);
        $response->assertStatus(200);
        $response->assertJson(['created' => true]);
    }

    public function testingUpdating()
    {

        $response = $this->json('GET', '/users');
        $response->assertStatus(200);

        $user = $response->getData()[0];

        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'date' => $user->date,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at

        ];

        $user2 = factory(User::class)->create();


        $update = $this->actingAs($user2, 'api')->json('POST', '/users/update', $data);

        $update->assertStatus(200);
        $update->assertJson(['updated' => true]);

    }

    public function testingDeletingUser()
    {
        $response = $this->json('GET', '/users');
        $response->assertStatus(200);

        $user = $response->getData()[0];

        $user2 = factory(User::class)->create();

        $delete = $this->actingAs($user2, 'api')->json('POST', '/users/delete/'.$user->id);

        $delete->assertStatus(200);
        $delete->assertJson(['deleted' => true]);
    }

}
