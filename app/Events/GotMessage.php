<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class GotMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels, InteractsWithQueue;

    public $message;

    /**
     * Create a new event instance.
     */
    public function __construct(array $message)
    {
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        Log::debug('Broadcasting message', [
            'user_id' => $this->message['user_id'],
            'recipient_id' => $this->message['recipient_id']
        ]);
        
        return [
            new PrivateChannel("chat.{$this->message['user_id']}"),
            new PrivateChannel("chat.{$this->message['recipient_id']}"),
        ];
    }
    
    // public function broadcastAs(): string
    // {
    //     return 'GotMessage';
    // }

    // public function broadcastWith(): array
    // {
    //     return $this->message;
    // }
}
