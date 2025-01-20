'use client';

import React from 'react';
import styles from "./Common.module.css";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { SET_AUTH_STATE } from '@/lib/slices/authSlice';

export const TopAdminBar = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth);

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
                <div className=''>
                    <ul className='flex items-center justify-end'>
                        {
                            user.rol === "admin" && (
                                <li>
                                    <Link className={styles.link} href={'/admin/users'}>Users</Link>
                                </li>
                            )
                        }
                        <button onClick={logout} className={styles.closeButton}>
                            Cerrar sesión
                        </button>
                    </ul>
                </div>
            </section>
        </div>
    )
}
