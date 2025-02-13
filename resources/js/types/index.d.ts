import { Config } from 'ziggy-js';

export interface User {
    id: number;
    username: string;
    email: string;
    email_verified_at?: string;
    avatar: string | null;
    onboarded: boolean;
}

export interface Project {
    id?: number;
    user_id: number;
    title: string;
    description: string;
    is_active?: boolean;
    stack: {
        [key: string]: Array<{
            id: number;
            name: string;
            skill_level: string | null;
        }>;
    };
    contact: Record<string, string>;
    created_at: string;
    updated_at: string;
    creator: {
        username: string;
        created_at: string;
    };
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export type ProjectsResponse = PageProps & {
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
};

export interface ProjectContact {
    github?: string;
    discord?: string;
    email?: string;
    website?: string;
}

export interface ProjectType {
    title: string;
    description: string;
    contact: ProjectContact;
    domain: string[];
    language: string[];
    framework: string[];
    expertise: string;
    specialization: string[];
}

export interface ProjectDetailsProps {
    data: ProjectType;
    onChange: (
        field: keyof ProjectType,
        value: string | string[] | Record<string, string>,
    ) => void;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export type NavItem = {
    name: string;
    href: string;
    icon: string;
};
