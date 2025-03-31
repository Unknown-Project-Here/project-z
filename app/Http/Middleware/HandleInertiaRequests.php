<?php

namespace App\Http\Middleware;

use App\Http\Middleware\Actions\HandleProjectPermissions;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    public function __construct(
        protected HandleProjectPermissions $projectPermissions
    ) {
    }

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'message' => fn () => $request->session()->get('message'),
                'imageUrl' => fn () => $request->session()->get('imageUrl'),
                'closeTab' => fn () => $request->session()->get('closeTab'),
            ],
            'permissions' => [
                'project' => $this->projectPermissions->handle($request),
            ],
            'notifications' => $request->user()?->notifications->take(5)->map(function ($notification) {
                return array_merge([
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'created_at' => $notification->created_at,
                    'read_at' => $notification->read_at,
                ], $notification->data);
            }) ?? [],
        ];
    }
}
