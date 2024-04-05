"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IAuthState {
    authState: boolean;
}

const initialState: IAuthState = {
    authState: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_AUTH_STATE: (state, action: PayloadAction<boolean>) => {
            state.authState = action.payload;
        },
    },
});

export const { SET_AUTH_STATE } = authSlice.actions;
export const authReducer = authSlice.reducer;
