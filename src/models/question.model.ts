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
