'use client';

import React from 'react';
import styles from "./Common.module.css";
import Link from 'next/link';
import { useAppDispatch } from '@/lib/store';
import { SET_AUTH_STATE } from '@/lib/slices/authSlice';

export const TopAdminBar = () => {
    const dispatch = useAppDispatch();

    const logout = () => {
        localStorage.setItem('authState', 'false');
        dispatch(SET_AUTH_STATE(false));
    }

    return (
        <div className={styles['menu-blue']} >
            <section className={styles.menu}>
                <span>
                    <div className='flex items-center'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className={styles.LogoPrincipal} src="https://successacademyhn.com/wp-content/uploads/2023/02/logo_succress-blanco-copia.png" alt="logo" />
                        <span className={styles.LogoPrincipalDot}>Admin</span>
                    </div>
                </span>
                <button onClick={logout} className={styles.closeButton}>
                    Cerrar sesión
                </button>
            </section>
        </div>
    )
}
