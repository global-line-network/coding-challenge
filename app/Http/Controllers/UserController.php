<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Carbon\Carbon;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return response()->json(['users' => $users]);
    }

    public function show ($id)
    {
        $user = User::find($id);

        return response()->json(['user' => $user]);
    }

    public function create(Request $request)
    {
        User::create([
            'name' => $request->name,
            'date' => Carbon::now()
        ]);

        return response()->json(['created' => true]);

    }

    public function update(Request $request)
    {
        $user = User::find($request->id);

        $user->name = $request->name;
        $user->date = $request->date;

        $user->save();

        return response()->json(['updated' => true]);
    }

    public function delete($id)
    {
        $user = User::find($id);

        $user->delete();

        return response()->json(['deleted' => true]);
    }
}
