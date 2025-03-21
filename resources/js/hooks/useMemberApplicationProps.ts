import { usePageProps } from '@/hooks/usePageProps';

type QuestionAndAnswer = {
    question: string;
    answer: string | null;
};

type MemberApplication = {
    id: number;
    project_id: number;
    created_at: string;
    questions_and_answers: QuestionAndAnswer[];
    user: {
        id: number;
        username: string;
        avatar: string | null;
    };
};

export function useMemberApplicationProps(): MemberApplication {
    const { props } = usePageProps();
    return props.application;
}
