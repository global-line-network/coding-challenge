<?php

namespace App\Http\Controllers;



use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show ($id)
    {
        $user = User::find($id);

        return response()->json(['user' => $user]);
    }

    public function create()
    {
        factory(User::class, 1)->create();
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

    public function checkValue(Request $request){

        $user = User::find($request->id);

        if ($user->name === $request->name && $user->date == $request->date){
            return response()->json(['matches' => true]);
        } else {
            return response()->json(['matches' => false]);
        }

    }
}
