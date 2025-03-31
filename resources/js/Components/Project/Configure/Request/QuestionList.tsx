import { QuestionItem } from '@/Components/Project/Configure/Request/QuestionItem';
import { Card } from '@/Components/ui/card';
import { Question, QuestionId } from './types/configureRequestQuestionsType';

interface QuestionListProps {
    questions: Question[];
    title: string;
    description?: string;
    onToggleSelection: (id: QuestionId) => void;
    onToggleOptional: (id: QuestionId) => void;
    onRemoveQuestion?: (id: QuestionId) => void;
}

export function QuestionList({
    questions,
    title,
    description,
    onToggleSelection,
    onToggleOptional,
    onRemoveQuestion,
}: QuestionListProps) {
    if (questions.length === 0) {
        return null;
    }

    return (
        <Card className="mb-6 p-6">
            <h2 className="mb-4 text-xl font-semibold">{title}</h2>
            {description && <p className="mb-4 text-sm">{description}</p>}
            <div className="space-y-2 overflow-y-auto rounded pr-2">
                {questions.map((question) => (
                    <QuestionItem
                        key={question.id}
                        question={question}
                        onToggleSelection={onToggleSelection}
                        onToggleOptional={onToggleOptional}
                        onRemoveQuestion={onRemoveQuestion}
                    />
                ))}
            </div>
        </Card>
    );
}
