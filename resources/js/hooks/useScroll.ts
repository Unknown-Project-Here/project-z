import { useEffect, useState } from 'react';

interface UseScrollOptions {
    threshold?: number;
}

export const useScroll = ({ threshold = 20 }: UseScrollOptions = {}) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    const scrollToElement = (href: string) => {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            window.history.pushState(null, '', href);
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        }
    };

    return {
        isScrolled,
        scrollToElement,
    };
};
