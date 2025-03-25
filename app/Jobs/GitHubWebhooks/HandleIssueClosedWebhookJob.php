<?php

namespace App\Jobs\GitHubWebhooks;

use App\Services\GitHubWebhookService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Spatie\GitHubWebhooks\Models\GitHubWebhookCall;

class HandleIssueClosedWebhookJob implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public GitHubWebhookCall $webhookCall
    ) {}

    public function handle(GitHubWebhookService $service)
    {
        $payload = $this->webhookCall->payload();
        $service->handleIssueClosed($payload);
    }
}
