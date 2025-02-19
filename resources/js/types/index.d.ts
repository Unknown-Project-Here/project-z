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

export interface Member {
    id: number;
    username: string;
    created_at: string;
}

export interface ProjectStack {
    id: number;
    name: string;
    skill_level: string | null;
}

export interface BaseProject {
    id: number;
    title: string;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    creator: {
        id: number;
        username: string;
        created_at: string;
    };
    contact?: ProjectContact;
    skill_level: string;
}

export interface IndexProject extends BaseProject {
    stack: ProjectStack[];
}

export interface Project extends BaseProject {
    stack: {
        [category: string]: ProjectStack[];
    };
    members: Member[];
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
