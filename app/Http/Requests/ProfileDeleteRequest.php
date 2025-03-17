<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileDeleteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $user = $this->user();

        if ($user->password) {
            return [
                'password' => ['required', 'current_password'],
            ];
        }

        return [
            'username_confirmation' => [
                'required',
                function ($attribute, $value, $fail) use ($user) {
                    // If it's exactly username-delete, it's valid
                    if ($value === $user->username.'-delete') {
                        return;
                    }

                    // If it doesn't contain the username at all, it's invalid
                    if (! str_starts_with($value, $user->username)) {
                        $fail('The username provided does not match your account username.');

                        return;
                    }

                    // If it contains the username but doesn't end with -delete, it's invalid
                    if (! str_ends_with($value, '-delete')) {
                        $fail('Please type your username followed by "-delete" to confirm account deletion.');
                    }
                },
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'password.required' => 'Please enter your password to confirm account deletion.',
            'password.current_password' => 'The provided password is incorrect.',
            'username_confirmation.required' => 'Please type your username followed by "-delete" to confirm account deletion.',
        ];
    }
}
