<?php

namespace App\Http\Controllers;

use App\Jobs\SendMessage;
use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Requests\MessageRequest;

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
     * Upload an image and return its URL
     */
    public function uploadImage(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        try {
            if (!$request->hasFile('image')) {
                return Inertia::location(url()->previous());
            }
            
            $image = $request->file('image');
            $path = $image->store('message-images', 'public');
            $imageUrl = asset('storage/' . $path);

            return back()->with('imageUrl', $imageUrl);

        } catch (\Exception $e) {
            Log::error('Error uploading image: ' . $e->getMessage());
            return back()->with('error', 'Failed to upload image');
        }
    }

    /**
     * Store a new message
     */
    public function store(MessageRequest $request)
    {
        $validated = $request->validated();
        
        if (!Auth::check()) {
            return back()->with('error', 'User not authenticated');
        }

        try {
            $messageData = [
                'user_id' => Auth::id(),
                'recipient_id' => $validated['recipient_id'],
            ];

            // Add text field only if it exists in validated data
            if (isset($validated['text'])) {
                $messageData['text'] = $validated['text'];
            }

            // Add image_url field only if it exists in validated data
            if (isset($validated['image_url'])) {
                $messageData['image_url'] = $validated['image_url'];
            }

            $message = Message::create($messageData);

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

