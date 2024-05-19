'use client';

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { SET_AUTH_STATE, SET_AUTH_USER } from '@/lib/slices/authSlice';
import { FormularioLogin } from '@/components/login/FormularioLogin';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/services/login.service';

const SuccessAdminLoginPage = () => {

    const authState = useAppSelector((state) => state.auth.authState);
    const dispatch = useAppDispatch();
    const router = useRouter();

    // states
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const tryLogin = async (username: string, password: string) => {
        setLoading(true);

        const user = await loginAdmin(username, password);

        if (user === null) {
            setError(true);
            setLoading(false);
            return;
        } else {
            setError(false);
            setLoading(false);

            const { email, name } = user as any;

            dispatch(SET_AUTH_USER({ email, name }));;
            dispatch(SET_AUTH_STATE(true));
            navigateToHome();
        }
    }

    const navigateToHome = () => {
        router.push('/admin/home');
    }


    return (
        <div>
            <div className='flex justify-center items-center w-full'>
                {authState ? 'Bienvenido' :
                    <FormularioLogin tryLogin={tryLogin} loading={loading} loginError={error} />}
            </div>
        </div>
    )
}

export default SuccessAdminLoginPage