'use client';

import React, { useState } from 'react';
import styles from "./Common.module.css";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { SET_AUTH_STATE } from '@/lib/slices/authSlice';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navLinksData = [
    { name: 'Users', href: '/admin/users' },
    { name: 'Archived', href: '/admin/archived' },
    { name: 'Schedules', href: '/admin/hours' },
];

export const TopAdminBar = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logout = () => {
        localStorage.setItem('authState', 'false');
        localStorage.removeItem('authUser');
        dispatch(SET_AUTH_STATE(false));
    };

    const navLinks = user.rol === "admin" ? navLinksData : [];

    return (
        <div className={styles['menu-blue']}>
            <section className={styles.menu}>
                <div className={styles.logoSection}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={styles.LogoPrincipal} src="https://successacademyhn.com/wp-content/uploads/2023/02/logo_succress-blanco-copia.png" alt="logo" />
                    <Link href={'/admin/home'} className={styles.adminBadge}>Admin Home</Link>
                </div>

                {/* Desktop Menu */}
                <div className={styles.desktopMenu}>
                    <ul className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link className={styles.adminNavLink} href={link.href}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <button onClick={logout} className={styles.adminCloseButton}>
                        Cerrar sesión
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className={styles.mobileMenuBtn}>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.iconButton}>
                        {isMenuOpen ? (
                            <XMarkIcon aria-hidden="true" />
                        ) : (
                            <Bars3Icon aria-hidden="true" />
                        )}
                    </button>
                </div>
            </section>

            {/* Mobile Menu Panel */}
            {isMenuOpen && (
                <div className={styles.mobileMenuPanel}>
                    <ul className={styles.mobileNavLinks}>
                         <li>
                            <Link 
                                href="/admin/home"
                                onClick={() => setIsMenuOpen(false)}
                                className={styles.mobileLink}
                            >
                                Admin Home
                            </Link>
                        </li>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={styles.mobileLink}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button 
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    logout();
                                }} 
                                className={`${styles.closeButton} ${styles.mobileCloseButton}`}
                            >
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
