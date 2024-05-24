"use client";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "./slices/authSlice";
import { currentStudentReducer } from "./slices/currentStudent";
import { questionsListReducer } from "./slices/questions";
import { loaderReducer } from "./slices/loader";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        currentStudent: currentStudentReducer,
        questions: questionsListReducer,
        loader: loaderReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;