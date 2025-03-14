<?php

namespace App\Notifications;

use App\Models\ProjectInvitation;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectInvitationNotification extends Notification
{
    use Queueable;

    public function __construct(
        private readonly ProjectInvitation $invitation
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database', 'broadcast'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('You\'ve Been Invited to Join a Project')
            ->line('You have been invited to join the project: '.$this->invitation->project->title)
            ->action('View Invitation', url('/projects/'.$this->invitation->project->id))
            ->line('This invitation will expire in 7 days.');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'invitation_id' => $this->invitation->id,
            'project_id' => $this->invitation->project_id,
            'project_title' => $this->invitation->project->title,
            'inviter_name' => $this->invitation->inviter->username,
            'role' => $this->invitation->role,
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'invitation_id' => $this->invitation->id,
            'project_id' => $this->invitation->project_id,
            'project_title' => $this->invitation->project->title,
            'inviter_name' => $this->invitation->inviter->username,
            'role' => $this->invitation->role,
            'created_at' => $this->invitation->created_at,
        ]);
    }
}
