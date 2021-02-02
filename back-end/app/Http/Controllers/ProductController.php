<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Products;
use App\Http\Controllers\ConfigPay;
use App\Http\Enums\EnumStatusOrder;
use App\Orders;
use App\Responses;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request)
    {
        try {
            $data = Products::all();
            $response = Response::json($data, 200);
            Log::info('get list products');
            return $response;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::json($e->getMessage(), 200);
        }
    }

}
