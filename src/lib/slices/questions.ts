"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IQuestionsList {
    list: any;
}

const initialState: IQuestionsList = {
    list: {},
};

export const questionsList = createSlice({
    name: "questionsList",
    initialState,
    reducers: {
        SET_LIST_QUESTIONS_STATE: (
            state,
            action: PayloadAction<IQuestionsList>
        ) => {
            state.list = action.payload.list;
        },
    },
});

export const { SET_LIST_QUESTIONS_STATE } = questionsList.actions;
export const questionsListReducer = questionsList.reducer;
