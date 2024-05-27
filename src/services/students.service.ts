import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { StudentInformation } from "@/models/student.model";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase
let app: any = null;

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

        const indexQuestion = parseInt(questionsCode.substring(1), 10);

        console.log({ indexQuestion });

        await fetch(
            `https://success-academy-test-default-rtdb.firebaseio.com/students/${id}/currentQuestion.json`,
            {
                method: "PUT",
                body: JSON.stringify(indexQuestion),
            }
        );

        const data = await response.json();

        return data;
    } catch (error) {
        return null;
    }
};

export const updateStudentState = async (id: string, state: string) => {
    try {
        const response = await fetch(
            `https://success-academy-test-default-rtdb.firebaseio.com/students/${id}/state.json`,
            {
                method: "PUT",
                body: JSON.stringify(state),
            }
        );

        const data = await response.json();

        return data;
    } catch (error) {
        return null;
    }
};

export const setDateToCall = async (id: string, date: any) => {
    console.log({ id, date });
    try {
        const response = await fetch(
            `https://success-academy-test-default-rtdb.firebaseio.com/students/${id}/dateToCall.json`,
            {
                method: "PUT",
                body: JSON.stringify(date),
            }
        );

        const data = await response.json();

        return data;
    } catch (error) {
        return null;
    }
};

export const updateAudioFile = async (
    audioQuestionID: string,
    studentCode: string,
    file: Blob
) => {
    try {
        const storage = await initAppFirestore();
        const storageRef = ref(
            storage,
            `audios/${studentCode}/${audioQuestionID}.wav`
        );

        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        return {
            success: true,
            url: url,
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            url: null,
            error,
        };
    }
};

const initAppFirestore = async () => {
    if (app === null) {
        app = initializeApp(firebaseConfig);
    }

    return getStorage(app);
};
