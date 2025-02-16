<?php

namespace App\Notifications;

use App\Models\ProjectInvitation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
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
        return ['mail', 'database'];
    }

    public function databaseType(object $notifiable): string
    {
        return 'project_invitation';
    }


    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('You\'ve Been Invited to Join a Project')
            ->line('You have been invited to join the project: ' . $this->invitation->project->title)
            ->action('View Invitation', url('/projects/' . $this->invitation->project->id))
            ->line('This invitation will expire in 7 days.');
    }


    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'project_invitation',
            'invitation_id' => $this->invitation->id,
            'project_id' => $this->invitation->project_id,
            'project_title' => $this->invitation->project->title,
            'inviter_name' => $this->invitation->inviter->username,
            'role' => $this->invitation->role,
            'expires_at' => $this->invitation->expires_at,
        ];
    }
}
