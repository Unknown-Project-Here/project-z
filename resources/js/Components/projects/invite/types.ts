export type ProjectRole = 'creator' | 'admin' | 'contributor';

export interface SearchResultUser {
    user_id: number;
    username: string;
}

export interface InviteState {
    // Search state
    searchQuery: string;
    users: SearchResultUser[];
    isSearching: boolean;

    // Invite flow state
    selectedUser: SearchResultUser | null;
    selectedRole: ProjectRole;
    currentStep: number;

    // Submission state
    isInviting: boolean;
}
