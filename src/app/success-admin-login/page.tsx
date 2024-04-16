'use client';

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { SET_AUTH_STATE } from '@/lib/slices/authSlice';
import { FormularioLogin } from '@/components/login/FormularioLogin';
import { useRouter } from 'next/navigation';

const SuccessAdminLoginPage = () => {

    const authState = useAppSelector((state) => state.auth.authState);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const isLogged = localStorage.getItem('authState');
        if (isLogged === 'true') {
            dispatch(SET_AUTH_STATE(true));
            navigateToHome();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tryLogin = (username: string, password: string) => {
        console.log('tryLogin');
        console.log({ username, password });
        localStorage.setItem('authState', 'true');
        dispatch(SET_AUTH_STATE(true));
        navigateToHome();
    }

    const navigateToHome = () => {
        router.push('/admin/home');
    }


    return (
        <div >
            <div className='flex justify-center items-center w-full'>
                {authState ? 'Bienvenido' : <FormularioLogin tryLogin={tryLogin} />}
            </div>
        </div>
    )
}

export default SuccessAdminLoginPage