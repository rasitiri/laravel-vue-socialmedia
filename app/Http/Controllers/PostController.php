<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        return Post::orderBy('created_at', 'desc')->with('user')->get();
    }

    public function store()
    {
        $attributes = request()->validate([
            'body' => 'required|min:5|max:255'
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

    public function profile()
    {
        $posts = Post::all();
        $posts->pluck('user_id');

        return $posts->where('user_id', Auth::user()->id);
    }
}
