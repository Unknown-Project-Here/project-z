import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import React, { useCallback, useMemo, useState } from 'react';
import IssueForm from './IssueForm';
import { IssueFormData, MemberSimple } from './IssueForm/types/IssueFormTypes';

function IssueCreator() {
    const [formData, setFormData] = useState<IssueFormData>({
        title: '',
        description: '',
        priority: '',
        difficulty: '',
        assignee: '',
    });

    const members: MemberSimple[] = useMemo(
        () => [
            {
                id: '1',
                name: 'Alex Johnson',
                avatar: '/placeholder.svg?height=40&width=40',
            },
            {
                id: '2',
                name: 'Sarah Miller',
                avatar: '/placeholder.svg?height=40&width=40',
            },
        ],
        [],
    );

    const handleFormChange = useCallback(
        (field: keyof IssueFormData, value: string) => {
            setFormData((prevData) => ({
                ...prevData,
                [field]: value,
            }));
        },
        [],
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            console.log(formData);
            setFormData({
                title: '',
                description: '',
                priority: '',
                difficulty: '',
                assignee: '',
            });
        },
        [formData],
    );

    return (
        <Card className="mx-auto max-w-2xl">
            <CardHeader className="rounded-t-lg bg-gradient-to-r from-primary/10 via-primary/5 to-background">
                <CardTitle className="text-xl font-bold text-foreground">
                    Create New Issue
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    Create a new GitHub issue with priority and difficulty
                    levels.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <IssueForm
                    formData={formData}
                    onFormChange={handleFormChange}
                    onSubmit={handleSubmit}
                    members={members}
                />
            </CardContent>
        </Card>
    );
}

export default React.memo(IssueCreator);
