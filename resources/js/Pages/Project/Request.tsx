import { FormField } from '@/Components/projects/request/components/FormField';
import { FormSection } from '@/Components/projects/request/components/FormSection';
import { GradientHeader } from '@/Components/projects/request/components/GradientHeader';
import { QuestionList } from '@/Components/projects/request/components/QuestionList';
import { Button } from '@/Components/ui/button';
import { MessageSquarePlus, Send, UserPlus } from 'lucide-react';
import { useState } from 'react';

export default function Request() {
    const [questions, setQuestions] = useState([{ id: '1', question: '' }]);

    const addQuestion = () => {
        setQuestions([...questions, { id: crypto.randomUUID(), question: '' }]);
    };

    const removeQuestion = (id: string) => {
        if (questions.length > 1) {
            setQuestions(questions.filter((q) => q.id !== id));
        }
    };
    return (
        <div className="to-primary/950 dark:from-primary-950 dark:to-primary-900 min-h-screen bg-gradient-to-b from-primary/50">
            <div className="container mx-auto px-4 py-2">
                <div className="min-h-screen w-full p-4 md:p-8">
                    <div className="mx-auto space-y-8">
                        <GradientHeader
                            title="Join Our Project"
                            description="We're excited to have you join our community. Please tell us a bit about yourself."
                        />

                        <form className="space-y-6">
                            <FormSection
                                title="Introduce Yourself"
                                icon={UserPlus}
                            >
                                <div className="space-y-4">
                                    <FormField
                                        id="name"
                                        label="Full Name"
                                        placeholder="John Doe"
                                    />
                                    <FormField
                                        id="bio"
                                        label="Brief Bio"
                                        type="textarea"
                                        placeholder="Tell us about your background, interests, and what excites you about this project..."
                                    />
                                </div>
                            </FormSection>

                            <FormSection title="Contact Information">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        placeholder="john@example.com"
                                    />
                                    <FormField
                                        id="github"
                                        label="GitHub Username"
                                        placeholder="johndev"
                                    />
                                </div>
                            </FormSection>

                            <FormSection title="Screening Questions">
                                <div className="space-y-6">
                                    <FormField
                                        id="experience"
                                        label="What experience do you have with our tech stack?"
                                        type="textarea"
                                        placeholder="Describe your experience with React, TypeScript, and related technologies..."
                                    />
                                    <FormField
                                        id="contribution"
                                        label="How do you plan to contribute to the project?"
                                        type="textarea"
                                        placeholder="Tell us about the specific areas where you'd like to contribute..."
                                    />
                                </div>
                            </FormSection>

                            <FormSection
                                title="Ask Questions"
                                icon={MessageSquarePlus}
                            >
                                <QuestionList
                                    questions={questions}
                                    onAddQuestion={addQuestion}
                                    onRemoveQuestion={removeQuestion}
                                />
                            </FormSection>

                            <div className="flex justify-end">
                                <Button
                                    size="lg"
                                    className="gap-2 bg-primary/90 text-lg transition-colors hover:bg-primary"
                                >
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
