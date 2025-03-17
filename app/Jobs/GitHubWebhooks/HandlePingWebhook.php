<?php

namespace App\Jobs\GitHubWebhooks;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Spatie\GitHubWebhooks\Models\GitHubWebhookCall;

class HandlePingWebhook implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public GitHubWebhookCall $webhookCall
    ) {}

    public function handle()
    {
        logger()->info('GitHub webhook ping received', [
            'repository' => $this->webhookCall->payload('repository.full_name'),
            'zen' => $this->webhookCall->payload('zen'),
            'hook_id' => $this->webhookCall->payload('hook_id'),
        ]);
    }
}
