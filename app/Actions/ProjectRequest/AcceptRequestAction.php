<?php

namespace App\Actions\ProjectRequest;

use App\Enums\ProjectRole;
use App\Models\Project;
use App\Models\ProjectApplicationRequestAnswers;
use App\Models\ProjectRequest;
use App\Notifications\ProjectRequestAcceptedNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class AcceptRequestAction
{
    public function execute(Project $project, ProjectRequest $application): array
    {
        try {
            DB::beginTransaction();

            if ($project->members()->where('user_id', $application->user_id)->exists()) {
                DB::rollBack();

                return [
                    'success' => false,
                    'message' => 'User is already a member of this project.',
                ];
            }

            $project->members()->attach($application->user_id, ['role' => ProjectRole::CONTRIBUTOR]);

            Notification::send($application->user, new ProjectRequestAcceptedNotification($application));

            ProjectApplicationRequestAnswers::where('project_id', $project->id)
                ->where('user_id', $application->user_id)
                ->delete();

            $application->delete();

            DB::commit();

            return [
                'success' => true,
                'message' => 'Application accepted successfully.',
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to accept project request', [
                'project_id' => $project->id,
                'application_id' => $application->id,
                'error' => $e->getMessage(),
            ]);

            throw new \RuntimeException('Failed to accept project request', 0, $e);
        }
    }
}
