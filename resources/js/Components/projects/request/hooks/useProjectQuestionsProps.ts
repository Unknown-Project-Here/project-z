import { usePageProps } from '@/hooks/usePageProps';

type ProjectQuestion = {
    id: number;
    question: string;
    project_id: number;
    is_optional: boolean;
};

export const useProjectQuestionsProps = () => {
    const { props } = usePageProps();

    return props.questions as ProjectQuestion[];
};
