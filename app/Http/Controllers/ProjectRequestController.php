<?php

namespace App\Http\Controllers;

use App\Exceptions\UnauthorizedAccessException;
use App\Models\Project;
use App\Models\ProjectRequest;
use App\Services\ProjectRequestService;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProjectRequestController extends Controller
{
    protected ProjectRequestService $projectRequestService;

    public function __construct(ProjectRequestService $projectRequestService)
    {
        $this->projectRequestService = $projectRequestService;
    }

    public function acceptRequest(Project $project, ProjectRequest $application): JsonResponse
    {
        try {
            $result = $this->projectRequestService->acceptRequest(
                $project,
                $application,
                request()->user()->id
            );

            return response()->json($result);
        } catch (UnauthorizedAccessException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 403);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to accept request. Please try again.',
            ], 500);
        }
    }

    public function rejectRequest(Project $project, ProjectRequest $application): JsonResponse
    {
        try {
            $result = $this->projectRequestService->rejectRequest(
                $project,
                $application,
                request()->user()->id
            );

            return response()->json($result);
        } catch (UnauthorizedAccessException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 403);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to reject request. Please try again.',
            ], 500);
        }
    }
}
