import { FormField } from '@/Components/projects/request/components/FormField';
import { FormSection } from '@/Components/projects/request/components/FormSection';
import { GradientHeader } from '@/Components/projects/request/components/GradientHeader';
import { useProjectQuestionsProps } from '@/Components/projects/request/hooks/useProjectQuestionsProps';
import { Button } from '@/Components/ui/button';
import { useProjectProps } from '@/hooks/useProjectProps';
import { router } from '@inertiajs/react';
import { Send } from 'lucide-react';
import { useState } from 'react';

type Answer = {
    question_id: string;
    answer: string;
};

export default function ProjectRequestApplicationForm() {
    const questions = useProjectQuestionsProps();
    const project = useProjectProps();
    const [answers, setAnswers] = useState<Answer[]>([]);

    const handleAnswerChange = (question_id: string, answer: string) => {
        setAnswers((prev) => {
            const existingAnswerIndex = prev.findIndex(
                (a) => a.question_id === question_id,
            );

            if (existingAnswerIndex >= 0) {
                const newAnswers = [...prev];
                newAnswers[existingAnswerIndex] = { question_id, answer };
                return newAnswers;
            }

            return [...prev, { question_id, answer }];
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.post(route('projects.request.store', { project: project.id }), {
            answers,
        });
    };

    return (
        <div className="relative col-span-2 overflow-hidden border border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(231.4,30%,92%)] via-[hsl(264.7,35%,88%)] to-[hsl(325.5,40%,85%)] shadow-md transition-all duration-300 hover:shadow-lg dark:from-[hsl(231.4,15.3%,16.4%)] dark:via-[hsl(264.7,20%,18%)] dark:to-[hsl(325.5,25%,20%)]">
            <div className="container mx-auto px-4 py-2">
                <div className="min-h-screen w-full p-4 md:p-8">
                    <div className="mx-auto space-y-8">
                        {questions.length ? (
                            <GradientHeader
                                title="Join Our Project"
                                description="We're excited to have you join our project. Please tell us a bit about yourself."
                            />
                        ) : (
                            <GradientHeader
                                title="Join Our Project"
                                description="We're excited to have you join our project! You can directly submit an application.    "
                            />
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {questions.length > 0 && (
                                <FormSection title="Screening Questions">
                                    <div className="space-y-6">
                                        {questions.map((question) => (
                                            <FormField
                                                key={question.id}
                                                id={question.id.toString()}
                                                name={question.id.toString()}
                                                label={question.question}
                                                optional={question.is_optional}
                                                onChange={(value) =>
                                                    handleAnswerChange(
                                                        question.id.toString(),
                                                        value,
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </FormSection>
                            )}
                            <div className="flex justify-end">
                                <Button>
                                    <Send className="h-5 w-5" />
                                    Submit Application
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
