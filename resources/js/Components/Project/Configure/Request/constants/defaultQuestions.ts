import { Question } from '../types/configureRequestQuestionsType';

export const defaultQuestions: Question[] = [
    {
        id: 'skills-1',
        text: 'What relevant skills do you bring to this project?',
        selected: true,
        optional: false,
        isCustom: false,
    },
    {
        id: 'avail-1',
        text: 'How many hours per week can you commit?',
        selected: true,
        optional: false,
        isCustom: false,
    },
    {
        id: 'tz-1',
        text: 'What is your timezone?',
        selected: true,
        optional: false,
        isCustom: false,
    },
    {
        id: 'tech-1',
        text: 'What frameworks are you proficient in?',
        selected: true,
        optional: false,
        isCustom: false,
    },
    {
        id: 'port-1',
        text: 'Please provide links to your previous work or portfolio.',
        selected: false,
        optional: false,
        isCustom: false,
    },
    {
        id: 'experience-1',
        text: 'How many years of experience do you have in this field?',
        selected: false,
        optional: false,
        isCustom: false,
    },
    {
        id: 'tools-1',
        text: 'What tools and software are you familiar with?',
        selected: false,
        optional: false,
        isCustom: false,
    },
    {
        id: 'motivation-1',
        text: 'Why are you interested in this project?',
        selected: false,
        optional: false,
        isCustom: false,
    },
];
