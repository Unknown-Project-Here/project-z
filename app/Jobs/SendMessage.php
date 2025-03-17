<?php

namespace App\Jobs;

use App\Events\GotMessage;
use App\Models\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendMessage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public Message $message)
    {
        //
    }

    public function handle(): void
    {
        GotMessage::dispatch([
            'id' => $this->message->id,
            'text' => $this->message->text,
            'user_id' => $this->message->user_id,
            'recipient_id' => $this->message->recipient_id,
            'image_url' => $this->message->image_url,
            'created_at' => $this->message->created_at,
            'user' => [
                'id' => $this->message->user->id,
                'username' => $this->message->user->username,
                'avatar' => $this->message->user->avatar ?? '',
            ],
        ]);
    }
}