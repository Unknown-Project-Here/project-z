<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notification;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        return inertia()->render('Notifications', [
            'allNotifications' => $request->user()?->notifications,
            'shouldShowMarkAllAsRead' => $request->user()?->unreadNotifications->count() > 0,
        ]);
    }

    public function markAllAsRead(Request $request): JsonResponse
    {
        if (!$request->user()) {
            return response()->json(['success' => false, 'message' => 'User not found'], 401);
        }

        try {
            $request->user()->unreadNotifications->markAsRead();
            return response()->json(['success' => true, 'message' => 'All notifications marked as read']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to mark all notifications as read'], 500);
        }
    }

    public function markNotificationAsRead(Request $request, string $id): JsonResponse
    {
        if (!$request->user()) {
            return response()->json(['success' => false, 'message' => 'User not found'], 401);
        }

        $notification = $request->user()->unreadNotifications()->where('id', $id)->first();

        if (!$notification) {
            return response()->json(['success' => false, 'message' => 'Notification not found'], 404);
        }

        try {
            $notification->markAsRead();
            return response()->json(['success' => true, 'message' => 'Notification marked as read']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to mark notification as read'], 500);
        }
    }
}
