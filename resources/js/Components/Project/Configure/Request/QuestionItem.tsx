import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { Label } from '@/Components/ui/label';
import { Trash2 } from 'lucide-react';
import { Question, QuestionId } from './types/configureRequestQuestionsType';

interface QuestionItemProps {
    question: Question;
    onToggleSelection: (id: QuestionId) => void;
    onToggleOptional: (id: QuestionId) => void;
    onRemoveQuestion?: (id: QuestionId) => void;
}

export function QuestionItem({
    question,
    onToggleSelection,
    onToggleOptional,
    onRemoveQuestion,
}: QuestionItemProps) {
    const { id, text, selected, optional, isCustom } = question;

    return (
        <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-muted">
            <Checkbox
                id={`question-${id}`}
                checked={selected}
                onCheckedChange={() => onToggleSelection(id)}
            />
            <Label
                htmlFor={`question-${id}`}
                className="flex-grow cursor-pointer"
            >
                {text}
            </Label>
            {selected && (
                <div className="flex items-center space-x-2">
                    <Label
                        htmlFor={`optional-${id}`}
                        className="cursor-pointer text-xs text-muted-foreground"
                    >
                        Optional
                    </Label>
                    <Checkbox
                        id={`optional-${id}`}
                        checked={optional}
                        onCheckedChange={() => onToggleOptional(id)}
                    />
                </div>
            )}
            {isCustom && onRemoveQuestion && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveQuestion(id)}
                    className="ml-2"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}
