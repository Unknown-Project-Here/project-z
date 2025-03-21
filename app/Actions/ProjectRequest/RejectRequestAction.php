<?php

namespace App\Actions\ProjectRequest;

use App\Models\Project;
use App\Models\ProjectApplicationRequestAnswers;
use App\Models\ProjectRequest;
use App\Notifications\ProjectRequestRejectedNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class RejectRequestAction
{
    public function execute(Project $project, ProjectRequest $application): array
    {
        try {
            DB::beginTransaction();

            Notification::send($application->user, new ProjectRequestRejectedNotification($application));

            ProjectApplicationRequestAnswers::where('project_id', $project->id)
                ->where('user_id', $application->user_id)
                ->delete();

            $application->delete();

            DB::commit();

            return [
                'success' => true,
                'message' => 'Application rejected successfully.',
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to reject project request', [
                'project_id' => $project->id,
                'application_id' => $application->id,
                'error' => $e->getMessage(),
            ]);

            throw new \RuntimeException('Failed to reject project request', 0, $e);
        }
    }
}
