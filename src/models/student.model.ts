import { StudentStates } from "@/types/studentStates.types";

export interface StudentInformation {
    name: string;
    dni: string;
    email: string;
    age: number;
    phone: string;
    city: string;
    state: StudentStates;
    code: string;
}
