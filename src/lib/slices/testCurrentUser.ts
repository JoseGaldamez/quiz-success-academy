"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ITestCurrentUser {
    userName: String;
    userCode: String;
}

const initialState: ITestCurrentUser = {
    userName: "",
    userCode: "",
};

export const testCurrentUser = createSlice({
    name: "testCurrentUser",
    initialState,
    reducers: {
        SET_USER_STATE: (state, action: PayloadAction<ITestCurrentUser>) => {
            state.userName = action.payload.userName;
            state.userCode = action.payload.userCode;
        },
    },
});

export const { SET_USER_STATE } = testCurrentUser.actions;
export const testCurrentUserReducer = testCurrentUser.reducer;
