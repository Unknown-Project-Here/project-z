<?php

namespace App\Notifications;

use App\Models\ProjectRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectJoinRequestNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private readonly ProjectRequest $request
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database', 'broadcast'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Project Join Request')
            ->line('A user has requested to join your project: ' . $this->request->project->title)
            ->line('User: ' . $this->request->user->username)
            ->action('View Request', url('/projects/' . $this->request->project_id))
            ->line('Please review this request at your earliest convenience.');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'project_request',
            'request_id' => $this->request->id,
            'project_id' => $this->request->project_id,
            'project_title' => $this->request->project->title,
            'requester_name' => $this->request->user->username,
            'requester_id' => $this->request->user_id,
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'type' => 'project_request',
            'request_id' => $this->request->id,
            'project_id' => $this->request->project_id,
            'project_title' => $this->request->project->title,
            'requester_name' => $this->request->user->username,
            'requester_id' => $this->request->user_id,
            'created_at' => $this->request->created_at,
        ]);
    }
}
