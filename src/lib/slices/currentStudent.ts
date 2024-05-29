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
        },
    },
});

export const { SET_USER_STATE } = testCurrentUser.actions;
export const currentStudentReducer = testCurrentUser.reducer;
