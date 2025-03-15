<?php

namespace App\Services\Auth;

use App\Models\User;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class UsernameGeneratorService
{
    public function generateFromSocialUser(SocialiteUser $socialUser): string
    {
        $baseUsername = $this->extractBaseUsername($socialUser);
        $cleanUsername = $this->sanitizeUsername($baseUsername);

        return $this->ensureUniqueUsername($cleanUsername);
    }

    private function extractBaseUsername(SocialiteUser $socialUser): string
    {
        return $socialUser->getNickname()
            ?? $socialUser->getName()
            ?? $this->getEmailPrefix($socialUser->getEmail())
            ?? 'user';
    }

    private function getEmailPrefix(?string $email): ?string
    {
        return $email ? explode('@', $email)[0] : null;
    }

    private function sanitizeUsername(string $username): string
    {
        $cleaned = preg_replace('/[^a-zA-Z0-9]/', '', strtolower($username));

        if (strlen($cleaned) < 3) {
            $cleaned .= substr(str_shuffle('abcdefghijklmnopqrstuvwxyz'), 0, 3);
        }

        return substr($cleaned, 0, 15);
    }

    private function ensureUniqueUsername(string $baseUsername): string
    {
        $username = $baseUsername;

        // Check if the base username is already unique
        if (! User::where('username', $username)->exists()) {
            return $username;
        }

        // Fetch existing usernames with the same base in one query
        $existingUsernames = User::where('username', 'like', "$baseUsername%")
            ->pluck('username')
            ->toArray();

        // Try appending numbers up to 999
        for ($counter = 1; $counter < 1000; $counter++) {
            $candidate = substr($baseUsername, 0, 15 - strlen((string) $counter)).$counter;
            if (! in_array($candidate, $existingUsernames)) {
                return $candidate;
            }
        }

        // Fallback to random username
        return 'user'.substr(md5(uniqid()), 0, 10);
    }
}
