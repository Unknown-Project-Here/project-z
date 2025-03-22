import { useProjectProps } from './useProjectProps';

type ProjectConfigurationProps = {
    members_request: boolean;
    questions: boolean;
    repo: boolean;
};

export const useProjectConfigurationProps = () => {
    const project = useProjectProps();

    return project.must_configure as ProjectConfigurationProps;
};
