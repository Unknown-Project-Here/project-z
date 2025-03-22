<?php

namespace App\Notifications;

use App\Models\ProjectRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectRequestAcceptedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        private readonly ProjectRequest $request
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Your Project Join ConfigureRequestQuestions Has Been Accepted')
            ->line('Your join request to the project: '.$this->request->project->title.' has been accepted.')
            ->action('View Project', url('/projects/'.$this->request->project->id))
            ->line('You can now start contributing to the project.');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'project_title' => $this->request->project->title,
            'project_id' => $this->request->project->id,
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'type' => 'project_request_accepted',
            'project_title' => $this->request->project->title,
            'project_id' => $this->request->project->id,
            'created_at' => $this->request->created_at,
        ]);
    }
}
