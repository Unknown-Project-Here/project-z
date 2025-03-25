<?php

namespace App\Jobs\GitHubWebhooks;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Spatie\GitHubWebhooks\Models\GitHubWebhookCall;

class HandleIssueAssignedWebhookJob implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public GitHubWebhookCall $webhookCall
    ) {}

    public function handle()
    {
        logger()->channel('webhook')->info('---START ISSUE ASSIGNED---');
        $payload = $this->webhookCall->payload();
        $filename = 'webhook_issue_assigned_' . now()->format('Ymd_His') . '_' . uniqid() . '.json';
        Storage::put(
            'webhooks/' . $filename,
            json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
        );

        logger()->channel('webhook')->info('Payload stored in: ' . $filename);
        logger()->channel('webhook')->info('---END ISSUE ASSIGNED---');
    }
}
