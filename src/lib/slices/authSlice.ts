"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IAuthState {
    authState: boolean;
    email?: string;
    name?: string;
    rol?: string;
}

const initialState: IAuthState = {
    authState: false,
    email: "",
    name: "",
    rol: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_AUTH_STATE: (state, action: PayloadAction<boolean>) => {
            state.authState = action.payload;
        },
        SET_AUTH_USER: (
            state,
            action: PayloadAction<{ email: string; name: string; rol: string }>
        ) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.rol = action.payload.rol;
        },
    },
});

export const { SET_AUTH_STATE, SET_AUTH_USER } = authSlice.actions;
export const authReducer = authSlice.reducer;
