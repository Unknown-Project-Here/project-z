<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRenameRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization is handled by the Policy - commented since I forget that it doesn't actually return true
    }

    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'min:3',
                'max:255',
                function ($attribute, $value, $fail) {
                    if (strtolower($value) === strtolower($this->project->title)) {
                        $fail('This project title is already taken.');
                    }
                },
                Rule::unique('projects', 'title')->whereNot('id', $this->project->id),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'A project title is required.',
            'title.string' => 'The project title must be a text value.',
            'title.min' => 'The project title must be at least 3 characters long.',
            'title.max' => 'The project title cannot be longer than 255 characters.',
            'title.unique' => 'This project title is already taken.',
        ];
    }
}
