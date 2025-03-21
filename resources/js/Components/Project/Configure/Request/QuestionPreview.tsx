import { Badge } from '@/Components/ui/badge';
import { Card } from '@/Components/ui/card';
import { Question } from './types/configureRequestQuestionsType';

interface QuestionPreviewProps {
    questions: Question[];
}

export function QuestionPreview({ questions }: QuestionPreviewProps) {
    const selectedQuestions = questions.filter((q) => q.selected);

    return (
        <Card className="mb-6 p-6">
            <h2 className="mb-4 text-xl font-semibold">
                Selected Questions Preview
            </h2>
            {selectedQuestions.length > 0 ? (
                <div className="space-y-2">
                    {selectedQuestions.map((question) => (
                        <div
                            key={question.id}
                            className="flex items-center rounded-md bg-muted p-3"
                        >
                            <div className="flex-grow">{question.text}</div>
                            {question.optional && (
                                <Badge variant="outline" className="ml-2">
                                    Optional
                                </Badge>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">
                    No questions selected for project application form. Confirm?
                </p>
            )}
        </Card>
    );
}
