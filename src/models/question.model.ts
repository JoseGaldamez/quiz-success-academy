import { WrittingQuestion } from "../components/question/WrittingQuestion";
export interface OptionsModel {
    index: number;
    value: string;
    correct: boolean;
    points: number;
}

export interface QuestionUniqueSelect {
    title: string;
    type: string;
    options?: OptionsModel[];
    questionCode: string;
}

export interface DetailsQuestion {
    title: string;
    type: string;
    details: string;
    subtitle: string;
    questionCode: string;
}

export interface RecordQuestionModel {
    questionCode: string;
    title: string;
    type: string;
    subtitle: string;
}

export interface WrittingQuestionModel {
    questionCode: string;
    title: string;
    type: string;
    subtitle: string;
    correct: string;
}

export interface FreeWrittingQuestionModel {
    questionCode: string;
    title: string;
    type: string;
    subtitle: string;
}
