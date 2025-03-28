import { usePageProps } from './usePageProps';

type ProjectEditProps = {
    id: number;
    title: string;
    description: string;
    is_active: boolean;
    is_requestable: boolean;
};

export function useProjectEditProps(): ProjectEditProps {
    const { props } = usePageProps();
    return props.project as ProjectEditProps;
}
