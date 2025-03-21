import { usePageProps } from '@/hooks/usePageProps';

type Provider = 'github' | 'discord' | 'google' | 'email';

type SocialProviderUsername = {
    provider: Provider;
    username: string;
};

export const useGetSocialProviderUsernames = () => {
    const { props } = usePageProps();

    return props.socialUsernames as SocialProviderUsername[];
};
