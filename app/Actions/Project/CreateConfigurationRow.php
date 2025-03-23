<?php

namespace App\Actions\Project;

use Closure;

class CreateConfigurationRow
{
    public function handle($pipeline, Closure $next)
    {
        $project = $pipeline['project'];

        $project->configuration()->create([
            'is_questions_configured' => false,
            'is_requestable' => false,
            'request_configured_at' => null,
        ]);

        return $next($pipeline);
    }
}
