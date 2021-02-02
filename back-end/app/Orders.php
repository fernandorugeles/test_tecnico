<?php

namespace App;

use App\Http\Enums\EnumStatusOrder;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Orders extends Model
{

    protected $table = 'orders';

    static function createOrder($customer_name, $customer_email, $customer_mobile, $price, $id_product)
    {
        try {
            //create orders
            $order = new Orders();
            $order->customer_name = $customer_name;
            $order->customer_email = $customer_email;
            $order->customer_mobile = $customer_mobile;
            $order->price = $price;
            $order->id_product = $id_product;
            $order->customer_status = EnumStatusOrder::CREATED;
            $order->save();
            Log::info('order created in data base');
            //return id created
            return $order->id;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return $e->getMessage();
        }
    }

    static function updateOrder($reference, $status)
    {
        try {
            //get responses with the reference
            $res = Responses::where('reference', $reference)->get();
            //take the first data
            $id_order = $res[0]->id_order;
            //get order with order_id of table responses
            $order = Orders::find($id_order);
            //update status
            $order->customer_status = $status;
            $order->save();

            //return order complete with the product data and response too
            $responseModel = new Responses();
            $data = $responseModel->getOrder($reference);
            return $data;
            Log::info('update order status in data base -> '.$status);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return $e->getMessage();
        }
    }

    static function getListOrders()
    {
        try {
            //create orders
            $data = Orders::all();
            Log::info('get list orders');
            return $data;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return $e->getMessage();
        }
    }

}
