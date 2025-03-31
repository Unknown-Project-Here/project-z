import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

// Define the structure of flash messages
interface FlashMessages {
    success?: string;
    error?: string;
    closePopup?: boolean;
}

// Define the structure of Inertia page props
interface AppPageProps extends PageProps {
    flash: FlashMessages;
}

interface AuthPopupHandlerProps {
    children: React.ReactNode;
}

// Define the message event type
interface AuthPopupMessage {
    type: 'auth-success' | 'auth-error';
    message: string;
}

// Convert to Inertia Page component
export function AuthPopupHandler({ children }: AuthPopupHandlerProps) {
    const flashMessages = React.useMemo(() => {
        try {
            const page = usePage<PageProps & AppPageProps>();
            return page.props.flash;
        } catch (error) {
            console.debug('AuthPopupHandler: Not in Inertia context');
            return {};
        }
    }, []);

    useEffect(() => {
        // Check if we're in a popup window
        const isPopup = window.opener && !window.opener.closed;

        if (isPopup && flashMessages.closePopup) {
            try {
                // Get the origin of the parent window
                const targetOrigin = window.opener.location.origin;

                if (flashMessages.success) {
                    window.opener.postMessage(
                        {
                            type: 'auth-success',
                            message: flashMessages.success,
                        } satisfies AuthPopupMessage,
                        targetOrigin,
                    );
                }

                if (flashMessages.error) {
                    window.opener.postMessage(
                        {
                            type: 'auth-error',
                            message: flashMessages.error,
                        } satisfies AuthPopupMessage,
                        targetOrigin,
                    );
                }

                setTimeout(() => window.close(), 100);
            } catch (error) {
                console.error(
                    'Failed to communicate with parent window:',
                    error,
                );
                window.close();
            }
        }

        const handleMessage = (event: MessageEvent) => {
            // Validate the origin of the message
            if (event.origin !== window.location.origin) {
                return;
            }

            const data = event.data as AuthPopupMessage;

            if (!data?.type) {
                return;
            }

            switch (data.type) {
                case 'auth-success':
                    toast.success(data.message ?? 'Authentication successful');
                    window.location.reload();
                    break;
                case 'auth-error':
                    toast.error(data.message ?? 'Authentication failed');
                    break;
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [flashMessages]);

    return <>{children}</>;
}
