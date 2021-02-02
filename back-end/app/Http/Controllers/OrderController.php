<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ConfigPay;
use App\Http\Enums\EnumStatusOrder;
use App\Orders;
use App\Responses;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function getStatusOrder(Request $request)
    {
        try {
            $reference = $request->input('reference');
            //get order by reference
            $model = new Responses();
            $res = $model->getOrder($reference);
            if(!isset($res[0])){
                Log::error('sin datos para la referencia '.$reference);
                return Response::json('sin datos para la reference: '.$reference, 200);
            }
            $requestId = $res[0]->request_id;
            $pay = new ConfigPay();
            $placetopay = $pay->config();
            $response = $placetopay->query($requestId);
            $status = '';
            if ($response->isSuccessful()) {
                Log::info($response->status()->message());
                Log::info($response->status()->status());
                // In order to use the functions please refer to the Dnetix\Redirection\Message\RedirectInformation class
                if ($response->status()->isApproved()) {
                    // The payment has been approved
                    // update customer_status in order DB 
                    $status = EnumStatusOrder::PAYED;
                }else if($response->status()->isRejected()){
                    $status = EnumStatusOrder::REJECTED;
                }else{
                    $status = EnumStatusOrder::CREATED;
                }

                $result = $this->updateOrder($response->request()->payment()->reference(), $status);
                return Response::json($result[0], 200);
            } else {
                // There was some error with the connection so check the message
                Log::error($response->status()->message());
                return Response::json($response->status()->message(), 200);
            }
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::json($e->getMessage(), 200);
        }
    }

    public function getOrder(Request $request)
    {
        try {
            $reference = $request->input('reference');
            $model = new Responses();
            $res = $model->getOrder($reference);

            $response = Response::json($res, 200);
            Log::info('get order by reference');
            return $response;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::json($e->getMessage(), 200);
        }
    }

    public function pay(Request $request)
    {
        $data = $request->all();
        //convert string/json to object php
        
        $order = json_decode($data['order']);
        $product = json_decode($data['product']);

        //get data of object
        $customer_name = $order->customer_name;
        $customer_email = $order->customer_email;
        $customer_mobile = $order->customer_mobile;
        $price = $product->price;
        $idProduct = $product->id;
        Log::info('data for pacetopay: ' . $customer_name . ' - ' . $customer_email . ' - ' . $customer_mobile . ' - ' . $price);

        $pay = new ConfigPay();
        $placetopay = $pay->config();

        $reference = 'TEST_TECNICO-' . time();
        $requestData = [
            'payment' => [
                'reference' => $reference,
                'description' => 'Testing payment - test tecnico',
                'amount' => [
                    'currency' => 'COP',
                    'total' => $price,
                ],
                'shipping' => [
                    'name' => $customer_name,
                    'email' => $customer_email,
                    'mobile' => $customer_mobile
                ]
            ],
            'expiration' => date('c', strtotime('+1 days')),
            'returnUrl' => env('WEB_CHECKOUT_URL_RETURN', 'http://localhost:8000/orderResponse/') . $reference,
            'ipAddress' => '127.0.0.1',
            'userAgent' => 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
        ];

        try {
            $response = $placetopay->request($requestData);

            //create order in DB
            $idOrder = $this->createOrder($customer_name, $customer_email, $customer_mobile, $price, $idProduct);

            //save response in DB
            $this->createResponse($idOrder, $response->processUrl(), $response->requestId(), $reference);
            Log::info('operation placetopay' . print_r($response, true));

            $res = ['processUrl' => $response->processUrl(), 'requestId' => $response->requestId(), 'reference' => $reference];
            return Response::json($res, 200);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::json($e->getMessage(), 200);
        }
    }

    public function getOrderList(){
        try {
            $model = new Responses();
            $res = $model->getOrder();
            return $res;
        } catch (Exception $e) {
            return Response::json($e->getMessage(), 200);
        }
    }

    private function createOrder($customer_name, $customer_email, $customer_mobile, $price, $idProduct)
    {
        try {
            $model = new Orders();
            return $model->createOrder($customer_name, $customer_email, $customer_mobile, $price, $idProduct);
        } catch (Exception $e) {
            return Response::json($e->getMessage(), 200);
        }
    }

    private function updateOrder($reference, $status)
    {
        try {
            $model = new Orders();
            $result = $model->updateOrder($reference, $status);
            return $result;
        } catch (Exception $e) {
            return Response::json($e->getMessage(), 200);
        }
    }

    private function createResponse($id_order, $process_url, $request_id, $reference)
    {
        try {
            $model = new Responses();
            $model->createResponse($id_order, $process_url, $request_id, $reference);
            Log::info('response created in data base');
        } catch (Exception $e) {
            return Response::json($e->getMessage(), 200);
        }
    }
}
