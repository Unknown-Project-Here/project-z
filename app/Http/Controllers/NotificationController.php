<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        return inertia()->render('Notifications', [
            'notifications' => $request->user()?->notifications,
        ]);
    }

    public function markAllAsRead(Request $request): JsonResponse
    {
        try {
            $request->user()?->unreadNotifications->markAsRead();
            return response()->json(['success' => true, 'message' => 'All notifications marked as read']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to mark all notifications as read'], 500);
        }
    }
}
