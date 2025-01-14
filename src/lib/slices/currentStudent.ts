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
    initedQuizDate: undefined,
    answers: {},
    details: "",
    callDetails: undefined,
    sac: undefined,
    code: "",
    currentQuestion: 0,
    dateToCall: null,
};

export const testCurrentUser = createSlice({
    name: "currentStudent",
    initialState,
    reducers: {
        RESET_USER_STATE: (state) => {
            state.name = "";
            state.dni = "";
            state.email = "";
            state.age = 0;
            state.phone = "";
            state.city = "";
            state.state = StudentStates.PENDING;
            state.initedQuizDate = undefined;
            state.code = "";
            state.currentQuestion = 0;
            state.dateToCall = null;
            state.answers = {};
            state.details = "";
            state.callDetails = undefined;
            state.sac = undefined;
        },
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
            state.initedQuizDate = action.payload.initedQuizDate;
            state.dateToCall = action.payload.dateToCall;
            state.answers = action.payload.answers;
            state.details = action.payload.details;
            state.callDetails = action.payload.callDetails;
            state.sac = action.payload.sac;
        },
        SET_INIT_TIMER_DATE: (state, action: PayloadAction<Date>) => {
            state.initedQuizDate = action.payload;
        },
        UPDATE_ANSWER: (
            state,
            action: PayloadAction<{ questionCode: string; answer: any }>
        ) => {
            state.answers[action.payload.questionCode] = action.payload.answer;
        },
    },
});

export const {
    SET_USER_STATE,
    UPDATE_ANSWER,
    RESET_USER_STATE,
    SET_INIT_TIMER_DATE,
} = testCurrentUser.actions;
export const currentStudentReducer = testCurrentUser.reducer;
