<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ChatPolicy
{
    use HandlesAuthorization;

    public function sendMessage(User $user, User $recipient): bool
    {
        // Check if either user has blocked the other
        if ($user->hasBlocked($recipient) || $recipient->hasBlocked($user)) {
            return false;
        }

        // Check if recipient has rejected chat requests from this user
        if ($recipient->hasChatRejected($user)) {
            return false;
        }

        return true;
    }

    public function viewChat(User $user, User $otherUser): bool
    {
        return $this->sendMessage($user, $otherUser);
    }
}