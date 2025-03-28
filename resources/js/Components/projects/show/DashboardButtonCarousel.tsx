import { Button } from '@/Components/ui/button';
import { useProjectPermissions } from '@/hooks/useProjectPermissions';
import { useProjectProps } from '@/hooks/useProjectProps';
import { router } from '@inertiajs/react';
import {
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    ClipboardList,
    Settings,
    ShieldX,
    Trophy,
    UserPlus,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface ButtonItem {
    text: string;
    icon: React.ReactNode;
    link: string;
    visible?: boolean;
}

const ButtonCarousel: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const project_id = useProjectProps('id');
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const { canManageRequests, canInviteToProject } = useProjectPermissions();

    const buttons: ButtonItem[] = [
        {
            text: 'Configure Request Questions',
            icon: <Settings className="mr-2 size-4" />,
            link: route('projects.show', {
                project: project_id,
                activeTab: 'dashboard',
                activeSection: 'configure-questions',
            }),
            visible: canManageRequests,
        },
        {
            text: 'Invite Members',
            icon: <UserPlus className="mr-2 size-4" />,
            link: route('projects.show', {
                project: project_id,
                activeTab: 'members',
                activeSection: 'invite',
            }),
            visible: canInviteToProject,
        },
        {
            text: 'View Applications',
            icon: <ClipboardList className="mr-2 size-4" />,
            link: route('projects.show', {
                project: project_id,
                activeTab: 'members',
                activeSection: 'view-applications',
            }),
            visible: canManageRequests,
        },
        {
            text: 'View All Issues',
            icon: <AlertCircle className="mr-2 size-4" />,
            link: route('projects.show', {
                project: project_id,
                activeTab: 'issues',
            }),
            visible: true,
        },
        {
            text: 'View Blocklist',
            icon: <ShieldX className="mr-2 size-4" />,
            link: route('projects.show', {
                project: project_id,
                activeTab: 'members',
                activeSection: 'blocklist',
            }),
            visible: true,
        },
        {
            text: 'View Leaderboard',
            icon: <Trophy className="mr-2 size-4" />,
            link: route('projects.show', {
                project: project_id,
                activeTab: 'leaderboard',
            }),
            visible: true,
        },
    ];

    const checkScrollPosition = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            checkScrollPosition();
            scrollElement.addEventListener('scroll', checkScrollPosition);
            return () =>
                scrollElement.removeEventListener(
                    'scroll',
                    checkScrollPosition,
                );
        }
    }, []);

    return (
        <div className="mb-2 flex w-full items-center gap-2">
            <Button onClick={scrollLeft} disabled={!canScrollLeft}>
                <ChevronLeft />
            </Button>

            <div
                ref={scrollRef}
                className="scrollbar-hide flex flex-1 snap-x snap-mandatory gap-2 overflow-x-auto py-2"
                style={{ scrollBehavior: 'smooth' }}
            >
                {buttons
                    .filter((button) => button.visible)
                    .map((button, index) => (
                        <Button
                            key={index}
                            variant="secondary"
                            className="flex flex-shrink-0 snap-start items-center whitespace-nowrap"
                            onClick={() => router.visit(button.link)}
                        >
                            {button.icon}
                            {button.text}
                        </Button>
                    ))}
            </div>

            <Button
                size="icon"
                onClick={scrollRight}
                disabled={!canScrollRight}
            >
                <ChevronRight />
            </Button>
        </div>
    );
};

export default ButtonCarousel;
