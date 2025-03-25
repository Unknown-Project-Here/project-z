<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectShowRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'activeTab' => 'nullable|string|in:dashboard,members,issues,assigned,leaderboard',
            'activeSection' => 'nullable|string',
            'search' => 'sometimes|string|min:2|max:16',
            'application' => 'sometimes|integer|exists:project_requests,id',
        ];
    }
}
