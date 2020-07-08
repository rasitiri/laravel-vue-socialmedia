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

    public function getById($id)
    {
        $post = Post::find($id);
        if ($post) {
            return $post;
        } else {
            return response()->json([
                'message' => 'The post not found.',
            ]);
        }
    }

    public function userProfile($id)
    {
        $posts = Post::all();
        $posts->pluck('user_id');

        if (count($posts->where('user_id', $id)) > 0) {
            return $posts->where('user_id', $id);
        }
    }

    public function destroy($id)
    {
        //This code will be fixed. Need a middleware.
        if (Post::find($id)->user_id == Auth::user()->id) {
            if (Post::find($id)) {
                Post::destroy($id);

                return response()->json([
                    'message' => 'The post has been removed.',
                    'data' => $id
                ]);
            } else {
                return response()->json([
                    'message' => 'The post has not been found.',
                ]);
            }
        } else {
            return response()->json([
                'message' => 'Unauthorized'
            ]);
        }
    }
}
