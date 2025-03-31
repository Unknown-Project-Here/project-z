<?php

namespace App\Services;

use App\Actions\ProjectRequest\AcceptRequestAction;
use App\Actions\ProjectRequest\RejectRequestAction;
use App\Exceptions\UnauthorizedAccessException;
use App\Models\Project;
use App\Models\ProjectApplicationRequestAnswers;
use App\Models\ProjectRequest;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class ProjectRequestService
{
    public function __construct(
        protected AcceptRequestAction $acceptRequestAction,
        protected RejectRequestAction $rejectRequestAction
    ) {
        $this->acceptRequestAction = $acceptRequestAction;
        $this->rejectRequestAction = $rejectRequestAction;
    }

    /**
     * Get paginated project applications with user information
     *
     * @throws UnauthorizedAccessException
     */
    public function getApplications(Project $project, int $userId, int $perPage = 20): array
    {
        $this->validateProjectAccess($project, $userId);

        try {
            $applications = $project->applications()
                ->with('user:id,username,avatar')
                ->paginate($perPage)
                ->through(fn ($application) => $this->formatApplication($application));

            return [
                'project' => $project,
                'applications' => $applications,
            ];
        } catch (\Exception $e) {
            Log::error('Failed to retrieve project applications', [
                'project_id' => $project->id,
                'error' => $e->getMessage(),
            ]);
            throw new \RuntimeException('Failed to retrieve project applications', 0, $e);
        }
    }

    /**
     * Get a specific application with questions and answers
     *
     * @throws UnauthorizedAccessException
     */
    public function getApplication(Project $project, int $application_id, int $userId): array
    {
        $this->validateProjectAccess($project, $userId);

        try {
            $application = ProjectRequest::findOrFail($application_id);
            $application->load('user:id,username,avatar');

            $applicant_id = $application->user_id;
            $project_id = $application->project_id;

            $questions = $project->applicationQuestions()->pluck('question', 'id')->toArray();

            $answers = ProjectApplicationRequestAnswers::where('user_id', $applicant_id)
                ->where('project_id', $project_id)
                ->whereIn('question_id', array_keys($questions))
                ->pluck('answer', 'question_id')
                ->all();

            $questions_and_answers = array_map(function ($questionId) use ($questions, $answers) {
                return [
                    'question' => $questions[$questionId],
                    'answer' => $answers[$questionId] ?? null,
                ];
            }, array_keys($questions));

            $application['questions_and_answers'] = $questions_and_answers;
            $applicationData = $application->only(['id', 'project_id', 'created_at', 'user', 'questions_and_answers']);

            return [
                'project' => $project,
                'application' => $applicationData,
            ];
        } catch (\Exception $e) {
            Log::error('Failed to retrieve project application details', [
                'project_id' => $project->id,
                'application_id' => $application->id,
                'error' => $e->getMessage(),
            ]);
            throw new \RuntimeException('Failed to retrieve application details', 0, $e);
        }
    }

    /**
     * Accept a project application request
     *
     * @throws UnauthorizedAccessException
     */
    public function acceptRequest(Project $project, ProjectRequest $application, int $userId): array
    {
        $this->validateRequestManagement($project, $userId);

        return $this->acceptRequestAction->execute($project, $application);
    }

    /**
     * Reject a project application request
     *
     * @throws UnauthorizedAccessException
     */
    public function rejectRequest(Project $project, ProjectRequest $application, int $userId): array
    {
        $this->validateRequestManagement($project, $userId);

        return $this->rejectRequestAction->execute($project, $application);
    }

    /**
     * Format application data for response
     */
    private function formatApplication(ProjectRequest $application): array
    {
        return [
            'id' => $application->id,
            'project_id' => $application->project_id,
            'user' => [
                'user_id' => $application->user->id,
                'username' => $application->user->username,
                'avatar' => $application->user->avatar,
            ],
            'created_at' => $application->created_at,
        ];
    }

    /**
     * Validate user can access project
     *
     * @throws UnauthorizedAccessException
     */
    private function validateProjectAccess(Project $project, int $userId): void
    {
        $user = User::findOrFail($userId);

        if (! $user->can('manage', $project)) {
            throw new UnauthorizedAccessException('You do not have permission to view this project.');
        }
    }

    /**
     * Validate user can manage project requests
     *
     * @throws UnauthorizedAccessException
     */
    private function validateRequestManagement(Project $project, int $userId): void
    {
        $user = User::findOrFail($userId);

        if (! $user->can('manageRequests', $project)) {
            throw new UnauthorizedAccessException('You do not have permission to manage project requests.');
        }
    }
}
