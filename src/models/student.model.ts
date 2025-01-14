import { StudentStates } from "@/types/studentStates.types";

export interface StudentInformation {
    name: string;
    dni: string;
    email: string;
    age: number;
    phone: string;
    city: string;
    state: StudentStates;
    initedQuizDate?: Date;
    code: string;
    currentQuestion: number;
    dateToCall?: any;
    answers?: any;
    details?: string;
    callDetails?: any;
    sac?: any;
}
