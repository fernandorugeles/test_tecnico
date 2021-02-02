<?php

namespace Tests\Feature;

use App\Orders;
use Exception;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Log;

class AplicationTest extends TestCase
{
    /**
     *
     * @test product list
     */
    public function getListProducts()
    {
        $data = [];
        $this->post('/api/product/listProducts', $data)->assertStatus(200);
    }


    /**
     *
     * @test order by reference
     */
    public function getOrderByReference()
    {
        $data = [
            'reference' => 'TEST_TECNICO-1612225547'
        ];
        $this->post('/api/order/getOrder', $data)->assertStatus(200);
    }

    /**
     *
     * @test pay
     */
    public function pay()
    {
        try {
            $data = [
                'order' => ["customer_name" => "tets_name", "customer_email" => "tets_email", "customer_mobile" => "test_mobile"],
                'product' => ["price" => 12000, "id" => 1]
            ];
            $this->post('/api/order/pay', $data)
                ->assertStatus(200);
        } catch (Exception $e) {
            Log::info($e->getMessage());
        }
    }
}
