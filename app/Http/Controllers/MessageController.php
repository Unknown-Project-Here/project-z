<?php

namespace App\Http\Controllers;

use App\Jobs\SendMessage;
use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\User;

class MessageController extends Controller
{
    /**
     * Display the messages with a specific user
     */
    public function index(Request $request)
    {
        $recipientId = $request->input('user_id');

        // Get all messages between the authenticated user and the recipient
        $messages = Message::with('user')
            ->where(function($query) use ($recipientId) {
                // Get messages where either:
                // 1. Auth user is sender AND recipient is the selected user
                // OR
                // 2. Auth user is recipient AND sender is the selected user
                $query->where(function($q) use ($recipientId) {
                    $q->where('user_id', Auth::id())
                      ->where('recipient_id', $recipientId);
                })->orWhere(function($q) use ($recipientId) {
                    $q->where('user_id', $recipientId)
                      ->where('recipient_id', Auth::id());
                });
            })
            ->orderBy('created_at', 'asc') // Changed to ASC to show oldest messages first
            ->get();
            
        return Inertia::render('Messages/Index', [
            'messages' => $messages,
            'recipientId' => $recipientId,
            'users' => User::select(['id', 'username'])->get(),
        ]);
    }

    /**
     * Store a new message
     */
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'text' => 'required|string|max:1000',
            'recipient_id' => 'required|exists:users,id',
        ]);
        
        if (!Auth::check()) {
            return back()->with('error', 'User not authenticated');
        }

        try {
            $message = Message::create([
                'text' => $validated['text'],
                'user_id' => Auth::id(),
                'recipient_id' => $validated['recipient_id'],
            ]);

            if (!$message) {
                Log::error('Failed to create message');
                return back()->with('error', 'Failed to create message');
            }

            $message->load('user');
            
            SendMessage::dispatch($message);

            return back()->with('success', 'Message created successfully');
            
        } catch (\Exception $e) {
            Log::error('Error creating message: ' . $e->getMessage());
            return back()->with('error', 'Failed to create message');
        }
    }
}