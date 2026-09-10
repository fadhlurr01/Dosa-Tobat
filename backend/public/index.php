<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

// Normalize Authorization header if renamed or stripped by FastCGI/Apache
if (empty($_SERVER['HTTP_AUTHORIZATION'])) {
    if (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $_SERVER['HTTP_AUTHORIZATION'] = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    } elseif (!empty($_SERVER['HTTP_X_AUTHORIZATION'])) {
        $_SERVER['HTTP_AUTHORIZATION'] = $_SERVER['HTTP_X_AUTHORIZATION'];
    } elseif (!empty($_SERVER['HTTP_X_AUTH_TOKEN'])) {
        $_SERVER['HTTP_AUTHORIZATION'] = 'Bearer ' . $_SERVER['HTTP_X_AUTH_TOKEN'];
    } elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        foreach (['Authorization', 'authorization', 'X-Authorization', 'x-authorization'] as $h) {
            if (!empty($headers[$h])) {
                $_SERVER['HTTP_AUTHORIZATION'] = $headers[$h];
                break;
            }
        }
    }
}

$app->handleRequest(Request::capture());
