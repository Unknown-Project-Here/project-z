import { Project } from '@/types';
import { usePageProps } from './usePageProps';

type ProjectKey = keyof Project;

export function useProjectProps(): Project;
export function useProjectProps<K extends ProjectKey>(key: K): Project[K];
export function useProjectProps<K extends ProjectKey>(
    keys: K[],
): Pick<Project, K>;
export function useProjectProps<K extends ProjectKey>(keys?: K | K[]) {
    const { props } = usePageProps();

    if (!props.project) {
        throw new Error('Project is not available in props');
    }

    const project = props.project as Project;

    if (!keys) {
        return project;
    }

    if (Array.isArray(keys)) {
        return keys.reduce((acc, key) => {
            acc[key] = project[key];
            return acc;
        }, {} as Partial<Project>);
    }

    return project[keys];
}
