<?php

namespace App\Http\Requests;

use App\Enums\SkillLevelEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class OnboardingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return ! is_null($this->user()->email_verified_at);
    }

    /**
     * Indicates if the validator should stop on the first rule failure.
     *
     * @var bool
     */
    protected $stopOnFirstFailure = true;

    /**
     * The route that users should be redirected to if validation fails.
     *
     * @var string
     */
    protected $redirectRoute = 'profile.onboarding';

    public function rules(): array
    {
        return [
            'skills' => ['required', 'array'],
            'skills.domain' => ['required', 'array', 'min:1'],
            'skills.domain.*' => ['required', 'string', 'min:3'],
            'skills.language' => ['required', 'array', 'min:1'],
            'skills.language.*' => ['required', 'string', 'min:3'],
            'skills.framework' => ['required', 'array', 'min:1'],
            'skills.framework.*' => ['required', 'string', 'min:3'],
            'skills.expertise' => ['required', 'string', new Enum(SkillLevelEnum::class)],
            'skills.specialization' => ['required', 'array', 'min:1'],
            'skills.specialization.*' => ['required', 'string', 'min:3'],
        ];
    }

    public function messages(): array
    {
        return [
            'skills.required' => 'The skills information is required.',
            'skills.array' => 'The skills must be provided in the correct format.',

            'skills.domain.required' => 'Please select at least one domain.',
            'skills.domain.array' => 'Domain must be provided as a list.',
            'skills.domain.min' => 'Please select at least one domain.',
            'skills.domain.*.required' => 'Each domain must be specified.',
            'skills.domain.*.string' => 'Each domain must be text.',
            'skills.domain.*.min' => 'Each domain must be at least 3 characters.',

            'skills.language.required' => 'Please select at least one programming language.',
            'skills.language.array' => 'Language must be provided as a list.',
            'skills.language.min' => 'Please select at least one programming language.',
            'skills.language.*.required' => 'Each language must be specified.',
            'skills.language.*.string' => 'Each language must be text.',
            'skills.language.*.min' => 'Each language must be at least 3 characters.',

            'skills.framework.required' => 'Please select at least one framework.',
            'skills.framework.array' => 'Framework must be provided as a list.',
            'skills.framework.min' => 'Please select at least one framework.',
            'skills.framework.*.required' => 'Each framework must be specified.',
            'skills.framework.*.string' => 'Each framework must be text.',
            'skills.framework.*.min' => 'Each framework must be at least 3 characters.',

            'skills.expertise.required' => 'Please select your skill level.',
            'skills.expertise.string' => 'Skill level must be text.',
            'skills.expertise.Illuminate\Validation\Rules\Enum' => 'Please select a valid skill level (beginner, intermediate, advanced, or expert).',

            'skills.specialization.required' => 'Please select at least one specialization.',
            'skills.specialization.array' => 'Specialization must be provided as a list.',
            'skills.specialization.min' => 'Please select at least one specialization.',
            'skills.specialization.*.required' => 'Each specialization must be specified.',
            'skills.specialization.*.string' => 'Each specialization must be text.',
            'skills.specialization.*.min' => 'Each specialization must be at least 3 characters.',
        ];
    }
}
