<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreacionTablaProductos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 80);
            $table->string('name', 80);
            $table->integer('price');
            $table->string('image', 500);
            $table->string('description', 200);
            $table->timestamps();
        });

        DB::table('products')->insert(array(
            'code'=>'000001',
            'name'=>'Gafas de sol',
            'price'=> 52000,
            'image'=>'https://www.futbolemotion.com/imagesarticulos/125402/grandes/sp-gafas-de-sol-gris-0.jpg',
            'description'=>'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum',
            'created_at'=>date('Y-m-d H:m:s'),
            'updated_at'=>date('Y-m-d H:m:s')
        ));

        DB::table('products')->insert(array(
            'code'=>'000002',
            'name'=>'Camisa',
            'price'=> 80000,
            'image'=>'https://image.dhgate.com/0x0s/f2-albu-g10-M00-9B-51-rBVaVlyktaOADdV8AADPRRhvDzY888.jpg/nuevos-hombres-camisa-para-hombre-de-manga.jpg',
            'description'=>'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum',
            'created_at'=>date('Y-m-d H:m:s'),
            'updated_at'=>date('Y-m-d H:m:s')
        ));

        DB::table('products')->insert(array(
            'code'=>'000003',
            'name'=>'Tenis deportivos',
            'price'=> 160000,
            'image'=>'https://images-na.ssl-images-amazon.com/images/I/610swfCX8bL._AC_SY500_.jpg',
            'description'=>'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum',
            'created_at'=>date('Y-m-d H:m:s'),
            'updated_at'=>date('Y-m-d H:m:s')
        ));

        DB::table('products')->insert(array(
            'code'=>'000004',
            'name'=>'Abrigo',
            'price'=> 200000,
            'image'=>'https://www.instyle.es/medio/2018/10/25/abrigo-camel_9d867d12_900x1350.jpg',
            'description'=>'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum',
            'created_at'=>date('Y-m-d H:m:s'),
            'updated_at'=>date('Y-m-d H:m:s')
        ));

        DB::table('products')->insert(array(
            'code'=>'000005',
            'name'=>'Reloj',
            'price'=> 150000,
            'image'=>'https://images-na.ssl-images-amazon.com/images/I/71bAv%2Bykr-L._AC_UY445_.jpg',
            'description'=>'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum',
            'created_at'=>date('Y-m-d H:m:s'),
            'updated_at'=>date('Y-m-d H:m:s')
        ));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
