<?php

use Illuminate\Http\Request;

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

Route::group(['prefix' => 'product', 'middleware' => 'cors'],function(){
    Route::post('listProducts','ProductController@list');
});

Route::group(['prefix' => 'order', 'middleware' => 'cors'],function(){
    Route::post('pay','OrderController@pay');
    Route::post('getOrder','OrderController@getOrder');
    Route::post('getStatusOrder/','OrderController@getStatusOrder');
    Route::post('getOrderList/','OrderController@getOrderList');
});
