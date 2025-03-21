import { create } from 'zustand';
import { defaultQuestions } from '../constants/defaultQuestions';
import { QuestionsState, SubmittableQuestion } from '../types/configureRequestQuestionsType';

interface QuestionsStore {
    questions: QuestionsState;
    toggleSelection: (id: string) => void;
    toggleOptional: (id: string) => void;
    addCustomQuestion: (text: string) => void;
    removeQuestion: (id: string) => void;
    reset: () => void;
    getSubmittableQuestions: () => SubmittableQuestion[];
}

export const useQuestionsStore = create<QuestionsStore>((set, get) => ({
    questions: defaultQuestions,

    toggleSelection: (id) =>
        set((state) => ({
            questions: state.questions.map((question) =>
                question.id === id
                    ? { ...question, selected: !question.selected }
                    : question,
            ),
        })),

    toggleOptional: (id) =>
        set((state) => ({
            questions: state.questions.map((question) =>
                question.id === id
                    ? { ...question, optional: !question.optional }
                    : question,
            ),
        })),

    addCustomQuestion: (text) =>
        set((state) => ({
            questions: [
                ...state.questions,
                {
                    id: `custom-${Date.now()}`,
                    text,
                    selected: true,
                    optional: false,
                    isCustom: true,
                },
            ],
        })),

    removeQuestion: (id) =>
        set((state) => ({
            questions: state.questions.filter((question) => question.id !== id),
        })),

    reset: () => set({ questions: defaultQuestions }),

    getSubmittableQuestions: () => {
        // Filter selected questions and transform to include only necessary fields
        return get()
            .questions.filter((q) => q.selected)
            .map(({ text, optional }) => ({
                text,
                optional,
            }));
    },
}));
