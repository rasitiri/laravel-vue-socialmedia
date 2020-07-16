<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Searchable\Search;

class AuthController extends Controller
{
    public function index(Request $request)
    {
        $results = (new Search())->registerModel(User::class, ['name'])
            ->search($request->input('query'));

        return response()->json($results);
    }

    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'surname' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        $user = new User([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $user->save();

        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' =>  'These credentials do not match our records.'
            ], 401);
        }

        $user = $request->user();

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);

        $token->save();

        return response()->json([
            'message' => 'Login successfully',
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function getUserById($id)
    {
        $user = User::find($id);

        return $user;
    }

    public function edit($id, Request $request)
    {
        $user = User::find($id);

        //need to refactor
        $user->name = $request->name ? $request->name : $user->getOriginal('name');
        $user->surname = $request->surname ? $request->surname : $user->getOriginal('surname');
        $user->email = $request->email ? $request->email : $user->getOriginal('email');
        $user->bio = $request->bio ? $request->bio : $user->getOriginal('bio');
        
        $user->save();

        return response()->json([
            'message' => 'Successfully updated.'
        ]);
    }
}
