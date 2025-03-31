import { router } from '@inertiajs/react';
import { useRef } from 'react';

type SocialPlatform = 'github' | 'discord' | 'google';

export function useSocialAuthPopup() {
    const popupRef = useRef<Window | null>(null);

    const openAuthPopup = (provider: SocialPlatform) => {
        const width = 600;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        popupRef.current = window.open(
            route('social.login', provider),
            `Link ${provider}`,
            `width=${width},height=${height},top=${top},left=${left}`,
        );

        const checkPopup = () => {
            if (popupRef.current?.closed) {
                router.reload({ only: ['auth', 'socialUsernames'] });
            } else {
                setTimeout(checkPopup, 500);
            }
        };
        checkPopup();
    };

    return { openAuthPopup };
}
