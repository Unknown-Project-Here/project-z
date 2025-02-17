<?php

namespace App\Http\Middleware;

use App\Models\Project;
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
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'message' => fn() => $request->session()->get('message'),
            ],
            'permissions' => [
                'project' => [
                    'invite' => $request->user()?->can('invite', $request->route('project')) ?? false,
                    'edit' => $request->user()?->can('edit', $request->route('project')) ?? false,
                    'request' => $request->user()?->can('request', $request->route('project')) ?? false,
                ],
            ],
            'notifications' => $request->user()?->notifications->take(5)->map(function ($notification) {
                return array_merge([
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'created_at' => $notification->created_at,
                    'read_at' => $notification->read_at
                ], $notification->data);
            }) ?? [],
        ];
    }
}
