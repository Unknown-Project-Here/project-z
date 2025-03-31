import { usePageProps } from './usePageProps';

export const useUser = () => {
    const { props } = usePageProps();

    return props.auth.user;
};
