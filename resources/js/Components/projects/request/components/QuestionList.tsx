import { Button } from '@/Components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { FormField } from './FormField';

interface Question {
    id: string;
    question: string;
}

interface QuestionListProps {
    questions: Question[];
    onAddQuestion: () => void;
    onRemoveQuestion: (id: string) => void;
}

export function QuestionList({
    questions,
    onAddQuestion,
    onRemoveQuestion,
}: QuestionListProps) {
    return (
        <div className="space-y-4">
            {questions.map((q) => (
                <div key={q.id} className="flex items-start gap-2">
                    <FormField
                        id={`question-${q.id}`}
                        label="Your Question"
                        type="textarea"
                        placeholder="Ask any questions you have about the project, workflow, or team..."
                        className="flex-1"
                    />
                    <Button
                        variant="destructive"
                        size="icon"
                        className="mt-8 opacity-80 transition-opacity hover:opacity-100"
                        onClick={() => onRemoveQuestion(q.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                variant="outline"
                className="w-full gap-2 bg-background/50"
                onClick={onAddQuestion}
            >
                <Plus className="h-4 w-4" />
                Add Another Question
            </Button>
        </div>
    );
}
