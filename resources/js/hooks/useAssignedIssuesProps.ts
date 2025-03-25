import { ProjectIssue } from '@/types';
import { useProjectProps } from './useProjectProps';

export function useAssignedIssuesProps() {
    const project = useProjectProps();
    return project.issues as ProjectIssue[];
}
