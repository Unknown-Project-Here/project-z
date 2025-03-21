import { Project } from '@/types';
import { usePageProps } from './usePageProps';

export const useProjectProps = () => {
    const { props } = usePageProps();

    return props.project as Project;
};
