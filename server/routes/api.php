<?php

use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::post('/payment-intent', [PaymentController::class, 'createPaymentIntent']);
Route::post('/webhook', [PaymentController::class, 'webhook'])->withoutMiddleware(['web', 'auth']);
