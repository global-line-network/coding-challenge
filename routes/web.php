<?php
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Route::prefix('users')->group(function () {
    Route::get('/', 'UserController@index')->name('users');
    Route::get('/{id}', 'UserController@show')->name('user_show');
    Route::post('/create', 'UserController@create')->name('user_create');
    Route::post('/update/{id}', 'UserController@update')->name('user_update');
    Route::delete('/{id}', 'UserController@delete')->name('user_delete');
});