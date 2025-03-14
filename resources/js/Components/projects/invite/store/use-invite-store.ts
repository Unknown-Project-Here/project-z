import { InviteState } from '@/Components/projects/invite/types';
import { create } from 'zustand';

export const useInviteStore = create<InviteState>(() => ({
    searchQuery: '',
    users: [],
    isSearching: false,
    selectedUser: null,
    selectedRole: 'contributor',
    currentStep: 0,
    isInviting: false,
}));
