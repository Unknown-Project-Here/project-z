import { Config } from 'ziggy-js';

export enum SkillLevel {
    BEGINNER = 'Beginner',
    INTERMEDIATE = 'Intermediate',
    ADVANCED = 'Advanced',
    EXPERT = 'Expert',
}

export interface User {
    id: number;
    username: string;
    email: string;
    email_verified_at?: string;
    avatar: string | null;
    onboarded: boolean;
    created_at: string;
    skill_level: SkillLevel;
}

export interface Project {
    id: number;
    user_id: number;
    title: string;
    description: string;
    contact: string[];
    is_active: boolean;
    skill_level: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        username: string;
        email: string;
        onboarded: boolean;
        email_verified_at: string;
        skill_level: string | null;
        created_at: string;
        updated_at: string;
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
