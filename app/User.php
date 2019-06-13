<?php

namespace App;

use Illuminate\Notifications\Notifiable;

class User
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'date',
    ];
}
