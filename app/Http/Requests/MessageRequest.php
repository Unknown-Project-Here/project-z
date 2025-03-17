<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'text' => 'required_without:image_url|string|max:1000',
            'recipient_id' => 'required|exists:users,id',
            'image_url' => 'required_without:text|url',
        ];
    }

    public function messages(): array
    {
        return [
            'text.required_without' => 'Please provide either a message or an image',
            'recipient_id.required' => 'Please select a recipient',
            'image_url.required_without' => 'Please provide either a message or an image',
        ];
    }
}
