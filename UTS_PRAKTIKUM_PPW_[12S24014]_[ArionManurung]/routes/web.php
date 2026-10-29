<?php

use App\Http\Controllers\LaboratoriumController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LaboratoriumController::class, 'index']);
Route::get('/pinjam', [LaboratoriumController::class, 'pinjam']);
