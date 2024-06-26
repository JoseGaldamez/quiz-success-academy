import React from 'react'

import styles from "./Common.module.css";
import Link from 'next/link';

interface IMenuBarProps {
    showRequestAccessButton?: boolean;
}

export const MenuBar = ({ showRequestAccessButton = true }: IMenuBarProps) => {
    return (
        <div className={styles['menu-blue']} >
            <section className={styles.menu}>
                <span>
                    <Link href={'/'}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className={styles.LogoPrincipal} src="https://successacademyhn.com/wp-content/uploads/2023/02/logo_succress-blanco-copia.png" alt="logo" />
                    </Link>
                </span>
                {
                    showRequestAccessButton && (
                        <Link href={'/request-access'} className={styles.contactButton}>
                            Solicitar acceso
                        </Link>
                    )
                }
            </section>
        </div>
    )
}
