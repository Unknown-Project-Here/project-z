import { CustomQuestionInput } from '@/Components/Project/Configure/Request/CustomQuestionInput';
import { QuestionList } from '@/Components/Project/Configure/Request/QuestionList';
import { QuestionPreview } from '@/Components/Project/Configure/Request/QuestionPreview';
import { SaveButton } from '@/Components/Project/Configure/Request/SaveButton';
import { useQuestionsStore } from '@/Components/Project/Configure/Request/hooks/useQuestionsStore';
import { Button } from '@/Components/ui/button';
import Heading from '@/Components/ui/typography/Heading';
import { useProjectProps } from '@/hooks/useProjectProps';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

function ConfigureRequestQuestions() {
    const {
        questions,
        toggleSelection,
        toggleOptional,
        addCustomQuestion,
        removeQuestion,
        getSubmittableQuestions,
    } = useQuestionsStore();
    const project = useProjectProps();

    const predefinedQuestions = questions.filter((q) => !q.isCustom);
    const customQuestions = questions.filter((q) => q.isCustom);

    const handleSave = () => {
        const selectedQuestions = getSubmittableQuestions();

        const formattedQuestions = selectedQuestions.map((question) => ({
            text: question.text,
            optional: question.optional,
        }));

        axios
            .post(
                route('projects.configure.request.questions.store', project.id),
                {
                    questions: formattedQuestions,
                },
            )
            .then((response) => {
                if (response.data.success) {
                    toast.success(
                        'Application question configuration saved successfully.',
                    );
                    router.visit(route('projects.show', project.id));
                } else {
                    toast.error(
                        'Failed to save application question configuration.',
                    );
                }
            })
            .catch(() => {
                toast.error(
                    'Failed to save application question configuration.',
                );
            });
    };

    return (
        <div className="relative">
            <div className="flex justify-between">
                <Heading level={2} className="mb-2 text-3xl font-bold">
                    Create Application Form
                </Heading>
                <Button onClick={() => window.history.back()}>
                    <ChevronLeft className="mr-2 size-4" />
                    Back
                </Button>
            </div>
            <p className="mb-6 text-muted-foreground">
                Select the questions you want to include in your application
                form.
            </p>

            <QuestionList
                questions={predefinedQuestions}
                title="Select Application Questions"
                description="Choose the questions you want to include in your application form by selecting them from the list below."
                onToggleSelection={toggleSelection}
                onToggleOptional={toggleOptional}
            />

            <CustomQuestionInput onAddQuestion={addCustomQuestion} />

            {customQuestions.length > 0 && (
                <QuestionList
                    questions={customQuestions}
                    title="Your Custom Questions"
                    onToggleSelection={toggleSelection}
                    onToggleOptional={toggleOptional}
                    onRemoveQuestion={removeQuestion}
                />
            )}

            <QuestionPreview questions={questions} />

            <SaveButton onSave={handleSave} />
        </div>
    );
}

export default ConfigureRequestQuestions;
