<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        return Post::orderBy('created_at','desc')->get();
    }

    public function store()
    {
        $attributes = request()->validate([
            'body' => 'required|min:5'
        ]);

        $newPost = new Post([
            'user_id' => Auth::user()->id,
            'post' => request('body'),
        ]);

        $newPost->save();

        return response()->json([
            'message' => 'Successfully created post!',
            'data' => $newPost
        ]);
    }
}
