<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Auth;

class FollowsController extends Controller
{
    public function store($id)
    {
        $user = User::find($id);
        Auth::user()->toggleFollow($user);
    }
}
