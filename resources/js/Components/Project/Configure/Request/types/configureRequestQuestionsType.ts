export interface Question {
    id: string;
    text: string;
    selected: boolean;
    optional: boolean;
    isCustom: boolean;
}

export type QuestionId = string;

export type QuestionsState = Question[];

export interface SubmittableQuestion {
    text: string;
    optional: boolean;
}
