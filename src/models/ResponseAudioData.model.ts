export interface ResponseAudioData {
    status: string;
    success: boolean;
    result: Result;
}

export interface Result {
    privPronJson: PrivPronJSON;
}

export interface PrivPronJSON {
    Confidence: number;
    Lexical: string;
    ITN: string;
    MaskedITN: string;
    Display: string;
    PronunciationAssessment: PrivPronJSONPronunciationAssessment;
    Words: SingleWordModel[];
}

export interface PrivPronJSONPronunciationAssessment {
    AccuracyScore: number;
    FluencyScore: number;
    ProsodyScore: number;
    CompletenessScore: number;
    PronScore: number;
}

export interface SingleWordModel {
    Word: string;
    Offset: number;
    Duration: number;
    PronunciationAssessment: WordPronunciationAssessment;
    Syllables: Syllable[];
    Phonemes: Phoneme[];
}

export interface Phoneme {
    Phoneme: string;
    PronunciationAssessment: PhonemePronunciationAssessment;
    Offset: number;
    Duration: number;
}

export interface PhonemePronunciationAssessment {
    AccuracyScore: number;
}

export interface WordPronunciationAssessment {
    AccuracyScore: number;
    ErrorType: string;
    Feedback: Feedback;
}

export interface Feedback {
    Prosody: Prosody;
}

export interface Prosody {
    Break: Break;
    Intonation: Intonation;
}

export interface Break {
    ErrorTypes: string[];
    BreakLength: number;
    UnexpectedBreak?: MissingBreakClass;
    MissingBreak?: MissingBreakClass;
}

export interface MissingBreakClass {
    Confidence: number;
}

export interface Intonation {
    ErrorTypes: any[];
    Monotone: Monotone;
}

export interface Monotone {
    SyllablePitchDeltaConfidence: number;
}

export interface Syllable {
    Syllable: string;
    Grapheme: string;
    PronunciationAssessment: PhonemePronunciationAssessment;
    Offset: number;
    Duration: number;
}
