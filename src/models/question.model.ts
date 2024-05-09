export interface OptionsModel {
    index: number;
    value: string;
    correct: boolean;
    points: number;
}

export interface QuestionQuizModel {
    title: string;
    type: string;
    options?: OptionsModel[];
}
