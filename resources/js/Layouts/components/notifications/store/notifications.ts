import { router } from '@inertiajs/react';
import axios from 'axios';
import { create } from 'zustand';
import { Notification } from '../types';

interface NotificationStore {
    notifications: Notification[];
    allNotifications: Notification[];
    setNotifications: (notifications: Notification[]) => void;
    setAllNotifications: (notifications: Notification[]) => void;
    addNotification: (notification: Notification) => void;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    subscribeToNotifications: (userId: number) => () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: [],
    allNotifications: [],
    setNotifications: (notifications) => set({ notifications }),
    setAllNotifications: (notifications) =>
        set({ allNotifications: notifications }),
    addNotification: (notification) =>
        set((state) => ({
            notifications: [notification, ...state.notifications].slice(0, 5),
            allNotifications: [notification, ...state.allNotifications],
        })),
    markAsRead: async (id) => {
        try {
            await axios.post(
                route('notifications.markAsRead', { notification: id }),
            );
            set((state) => {
                const updateNotification = (n: Notification) =>
                    n.id === id
                        ? { ...n, read_at: new Date().toISOString() }
                        : n;

                return {
                    notifications: state.notifications.map(updateNotification),
                    allNotifications:
                        state.allNotifications.map(updateNotification),
                };
            });
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    },
    markAllAsRead: async () => {
        try {
            await axios.post(route('notifications.markAllAsRead'));
            set((state) => ({
                notifications: state.notifications.map((n) => ({
                    ...n,
                    read_at: new Date().toISOString(),
                })),
                allNotifications: state.allNotifications.map((n) => ({
                    ...n,
                    read_at: new Date().toISOString(),
                })),
            }));
            router.reload({
                only: ['notifications', 'shouldShowMarkAllAsRead'],
            });
        } catch (error) {
            console.error('Failed to mark all notifications as read:', error);
        }
    },
    subscribeToNotifications: (userId: number) => {
        const channel = window.Echo.private(`App.Models.User.${userId}`);
        channel.notification((notification: Notification) => {
            set((state) => ({
                notifications: [notification, ...state.notifications].slice(
                    0,
                    5,
                ),
                allNotifications: [notification, ...state.allNotifications],
            }));
        });
        return () => channel.stopListening('notification');
    },
}));
