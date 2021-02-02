<?php

namespace App;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Responses extends Model
{
    protected $table = 'responses';

    static function getOrder($reference = null)
    {
        try {
            $table = new Responses();
            $data = [];
            //get all data
            if (is_null($reference)) {
                $data = $table
                    ->join('orders', 'orders.id', '=', 'responses.id_order')
                    ->join('products', 'products.id', '=', 'orders.id_product')
                    ->get();
            } else {
                $data = $table->where('reference', $reference)
                    ->join('orders', 'orders.id', '=', 'responses.id_order')
                    ->join('products', 'products.id', '=', 'orders.id_product')
                    ->get();
            }

            return $data;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return $e->getMessage();
        }
    }

    static function createResponse($id_order, $process_url, $request_id, $reference)
    {
        try {
            $response = new Responses();
            $response->process_url = $process_url;
            $response->request_id = $request_id;
            $response->id_order = $id_order;
            $response->reference = $reference;
            $response->save();
            Log::info('response created in data base');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return $e->getMessage();
        }
    }
}
