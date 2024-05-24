"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ILoaderState {
    loading: boolean;
}

const initialState: ILoaderState = {
    loading: false,
};

export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        SET_LOADING: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { SET_LOADING } = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;
