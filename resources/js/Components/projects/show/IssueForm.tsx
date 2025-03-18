import React, { useCallback } from 'react';
import AssigneeSelect from './IssueForm/AssigneeSelect';
import DifficultySelect from './IssueForm/DifficultySelect';
import IssueDescriptionInput from './IssueForm/IssueDescriptionInput';
import IssueTitleInput from './IssueForm/IssueTitleInput';
import PrioritySelect from './IssueForm/PrioritySelect';
import SubmitButton from './IssueForm/SubmitButton';
import { IssueFormData, MemberSimple } from './IssueForm/types/IssueFormTypes';

interface IssueFormProps {
    formData: IssueFormData;
    onFormChange: (field: keyof IssueFormData, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    members: MemberSimple[];
    submitButtonText?: string;
}

const IssueForm: React.FC<IssueFormProps> = ({
    formData,
    onFormChange,
    onSubmit,
    members,
    submitButtonText,
}) => {
    const handleChange = useCallback(
        (field: keyof IssueFormData) => (value: string) => {
            onFormChange(field, value);
        },
        [onFormChange],
    );

    return (
        <form onSubmit={onSubmit}>
            <div className="space-y-6 pt-6">
                <IssueTitleInput
                    value={formData.title}
                    onChange={(value) => handleChange('title')(value)}
                />
                <IssueDescriptionInput
                    value={formData.description}
                    onChange={(value) => handleChange('description')(value)}
                />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <PrioritySelect
                        value={formData.priority}
                        onValueChange={(value) =>
                            handleChange('priority')(value)
                        }
                    />
                    <DifficultySelect
                        value={formData.difficulty}
                        onValueChange={(value) =>
                            handleChange('difficulty')(value)
                        }
                    />
                </div>
                <AssigneeSelect
                    value={formData.assignee}
                    members={members}
                    onValueChange={(value) => handleChange('assignee')(value)}
                />
            </div>
            <div className="mt-6">
                <SubmitButton submitButtonText={submitButtonText} />
            </div>
        </form>
    );
};

export default React.memo(IssueForm);
