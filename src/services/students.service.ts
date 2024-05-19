import { StudentInformation } from "@/models/student.model";

export const getStudents = async () => {
    try {
        const response = await fetch(
            `https://success-academy-test-default-rtdb.firebaseio.com/students.json`
        );

        const data = await response.json();

        return data;
    } catch (error) {
        return null;
    }
};

export const addNewStudent = async (id: string, user: StudentInformation) => {
    try {
        const response = await fetch(
            `https://success-academy-test-default-rtdb.firebaseio.com/students/${id}.json`,
            {
                method: "PUT",
                body: JSON.stringify(user),
            }
        );

        const data = await response.json();

        return data;
    } catch (error) {
        return null;
    }
};

export const getStudentByCode = async (id: string) => {
    try {
        const response = await fetch(
            `https://success-academy-test-default-rtdb.firebaseio.com/students/${id}.json`
        );

        const data = await response.json();

        return data;
    } catch (error) {
        return null;
    }
};

export const updateStudentAnswers = async (
    id: string,
    questionsCode: string,
    answers: any
) => {
    try {
        const response = await fetch(
            `https://success-academy-test-default-rtdb.firebaseio.com/students/${id}/answers/${questionsCode}.json`,
            {
                method: "PUT",
                body: JSON.stringify(answers),
            }
        );

        const data = await response.json();

        return data;
    } catch (error) {
        return null;
    }
};
