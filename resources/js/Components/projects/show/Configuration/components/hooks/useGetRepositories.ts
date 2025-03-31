import { ProjectCreateGithubRepoList } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type RepositoriesResponse = {
    success: boolean;
    data: ProjectCreateGithubRepoList;
};

export const useGetRepositories = () => {
    const { data, isError, isLoading } = useQuery<ProjectCreateGithubRepoList>({
        queryKey: ['repositories'],
        queryFn: async () => {
            const response = await axios.get<RepositoriesResponse>(
                route('user.repositories'),
            );

            if (!response.data.success) {
                throw new Error('Failed to fetch repositories');
            }

            return response.data.data;
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });

    return {
        repositories: data,
        isError,
        isLoading,
    };
};
