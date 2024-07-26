"use client";

import { StudentInformation } from "@/models/student.model";
import { StudentStates } from "@/types/studentStates.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: StudentInformation = {
    name: "",
    dni: "",
    email: "",
    age: 0,
    phone: "",
    city: "",
    state: StudentStates.PENDING,
    code: "",
    currentQuestion: 0,
    dateToCall: null,
};

export const testCurrentUser = createSlice({
    name: "currentStudent",
    initialState,
    reducers: {
        SET_USER_STATE: (state, action: PayloadAction<StudentInformation>) => {
            state.name = action.payload.name;
            state.dni = action.payload.dni;
            state.email = action.payload.email;
            state.age = action.payload.age;
            state.phone = action.payload.phone;
            state.city = action.payload.city;
            state.state = action.payload.state;
            state.code = action.payload.code;
            state.currentQuestion = action.payload.currentQuestion;
            state.dateToCall = action.payload.dateToCall;
            state.answers = action.payload.answers;
            state.details = action.payload.details;
        },
        UPDATE_ANSWER: (
            state,
            action: PayloadAction<{ questionCode: string; answer: any }>
        ) => {
            state.answers[action.payload.questionCode] = action.payload.answer;
        },
    },
});

export const { SET_USER_STATE, UPDATE_ANSWER } = testCurrentUser.actions;
export const currentStudentReducer = testCurrentUser.reducer;
