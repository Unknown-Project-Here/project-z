import axios from 'axios';
import { Role } from '../utils/manageMemberUtils';

interface ApiResponse {
    success: boolean;
    message: string;
}

export const updateMemberRole = async (
    project_id: number,
    user_id: number,
    role: Role,
): Promise<ApiResponse> => {
    const response = await axios.post(
        route('projects.members.updateRole', {
            project: project_id,
            user_id: user_id,
            role: role,
        }),
    );

    return response.data;
};

export const removeMember = async (
    project_id: number,
    user_id: number,
): Promise<ApiResponse> => {
    const response = await axios.delete(
        route('projects.members.removeMember', {
            project: project_id,
            user: user_id,
        }),
    );

    return response.data;
};
