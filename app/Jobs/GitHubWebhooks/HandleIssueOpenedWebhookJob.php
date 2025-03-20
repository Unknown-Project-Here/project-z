<?php

namespace App\Jobs\GitHubWebhooks;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Spatie\GitHubWebhooks\Models\GitHubWebhookCall;

class HandleIssueOpenedWebhookJob implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public GitHubWebhookCall $webhookCall
    ) {}

    public function handle()
    {
        logger()->channel('webhook')->info('GitHub issue opened', [
            'repository' => $this->webhookCall->payload('repository.full_name'),
            'issue_number' => $this->webhookCall->payload('issue.number'),
            'issue_title' => $this->webhookCall->payload('issue.title'),
            'issue_body' => $this->webhookCall->payload('issue.body'),
            'issue_url' => $this->webhookCall->payload('issue.html_url'),
            'sender' => $this->webhookCall->payload('sender.login'),
        ]);
    }
}
