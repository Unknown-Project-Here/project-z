<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\SkillLevelEnum;
use Illuminate\Validation\Rules\Enum;

class ProjectRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'project.title' => 'required|string|max:255',
            'project.description' => 'required|string',
            'project.contact' => ['required', 'array', 'min:1'],
            'project.contact.*' => ['required', 'string', 'min:3'],
            'project.skills.domain' => ['required', 'array', 'min:1'],
            'project.skills.domain.*' => ['required', 'string', 'min:1'],
            'project.skills.language' => ['required', 'array', 'min:1'],
            'project.skills.language.*' => ['required', 'string', 'min:1'],
            'project.skills.framework' => ['required', 'array', 'min:1'],
            'project.skills.framework.*' => ['required', 'string', 'min:1'],
            'project.skills.expertise' => ['required', 'string', new Enum(SkillLevelEnum::class)],
            'project.skills.specialization' => ['required', 'array', 'min:1'],
            'project.skills.specialization.*' => ['required', 'string', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'project.title.required' => 'A project title is required.',
            'project.title.string' => 'The project title must be a text value.',
            'project.title.max' => 'The project title cannot be longer than 100 characters.',
            'project.title.unique' => 'This project title is already taken.',
            'project.description.required' => 'A project description is required.',
            'project.description.string' => 'The project description must be a text value.',
            'project.description.max' => 'The project description cannot be longer than 5000 characters.',
            'project.contact.required' => 'A project contact is required.',
            'project.contact.array' => 'The project contact must be an array.',
        ];
    }
}
