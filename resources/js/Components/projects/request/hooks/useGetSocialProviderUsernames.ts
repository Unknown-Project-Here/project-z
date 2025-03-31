import { usePageProps } from '@/hooks/usePageProps';
import { SocialProviderUsername } from '@/types';

export const useGetSocialProviderUsernames = () => {
    const { props } = usePageProps();

    return props.socialUsernames as SocialProviderUsername[];
};
