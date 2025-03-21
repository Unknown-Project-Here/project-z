import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

interface CustomQuestionInputProps {
    onAddQuestion: (text: string) => void;
}

export function CustomQuestionInput({
    onAddQuestion,
}: CustomQuestionInputProps) {
    const [newQuestionText, setNewQuestionText] = useState('');

    const handleAddQuestion = () => {
        if (newQuestionText.trim() !== '') {
            onAddQuestion(newQuestionText.trim());
            setNewQuestionText('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newQuestionText.trim() !== '') {
            handleAddQuestion();
        }
    };

    return (
        <Card className="mb-6 p-6">
            <h2 className="mb-4 text-xl font-semibold">Add Custom Questions</h2>
            <p className="mb-4 text-sm text-muted-foreground">
                Add your own custom questions to the application form.
            </p>
            <div className="flex items-stretch space-x-2">
                <Input
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your custom question"
                    className="flex-grow"
                />
                <Button
                    onClick={handleAddQuestion}
                    disabled={newQuestionText.trim() === ''}
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add
                </Button>
            </div>
        </Card>
    );
}
