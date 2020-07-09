<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
        Route::get('user/{id}', 'AuthController@getUserById');
    });
});

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('post', 'PostController@store');
    Route::get('post', 'PostController@index');
    Route::get('profile', 'PostController@profile');
    Route::get('post/{id}', 'PostController@getById');
    Route::get('user/{id}', 'PostController@userProfile');

    Route::delete('/post/{id}', 'PostController@destroy');

    Route::post('user/{id}/follow', 'FollowsController@store');
    Route::get('user/{id}/follow','FollowsController@isFollowed');
    Route::get('friends','FollowsController@friends');
});

Route::fallback(function () {
    return response()->json([
        'message' => 'Not Found'
    ], 404);
});
