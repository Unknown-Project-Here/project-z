import { Config } from 'ziggy-js';

export interface User {
    id: number;
    username: string;
    email: string;
    email_verified_at?: string;
    avatar: string | null;
}

export interface Project {
    id: number;
    user_id: number;
    title: string;
    description: string;
    is_active: boolean;
    stack?: string[];
    email: string;
    discord: string;
    github: string;
    website: string;
    created_at: string;
    updated_at: string;
    user: User;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface ProjectsResponse {
    data: Project[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    projects: ProjectsResponse[];
};

export type NavItem = {
    name: string;
    href: string;
    icon: string;
};
