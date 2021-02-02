<?php

namespace App\Http\Controllers;
use Dnetix\Redirection\PlacetoPay;

class ConfigPay
{
    public function config()
    {
        $placetopay = new PlacetoPay([
            'login' => env('WEB_CHECKOUT_LOGIN', '6dd490faf9cb87a9862245da41170ff2'),
            'tranKey' => env('WEB_CHECKOUT_TRANKEY', '024h1IlD'),
            'url' => env('WEB_CHECKOUT_URL', 'https://test.placetopay.com/redirection/'),
            'rest' => [
                'timeout' => 45, // (optional) 15 by default
                'connect_timeout' => 30, // (optional) 5 by default
            ]
        ]);

        return $placetopay;
    }
}