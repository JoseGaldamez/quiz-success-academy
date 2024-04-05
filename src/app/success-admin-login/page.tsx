'use client';

import React from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { SET_AUTH_STATE } from '@/lib/slices/authSlice';
import { MenuBar } from '@/common/MenuBar';

const SuccessAdminLoginPage = () => {

    const authState = useAppSelector((state) => state.auth.authState);
    const dispatch = useAppDispatch();


    return (
        <>
            {authState ? 'Bienvenido' : 'Logged out'}
            <br />

            <button onClick={() => dispatch(SET_AUTH_STATE(!authState))}>Change auth state</button>
        </>
    )
}

export default SuccessAdminLoginPage