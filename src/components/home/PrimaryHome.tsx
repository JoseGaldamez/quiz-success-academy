import React from 'react'

import styles from './Home.module.css';
import Link from 'next/link';

export const PrimaryHome = () => {
    return (
        <section className={styles.section} >
            <div>
                <h2 className={styles.subtitle}>Prueba tu <strong>nivel de inglés</strong></h2>
                <h1 className={styles.title}>Quiz <span className={styles.titleUnderline}>Success Academy</span></h1>
                <p className={styles.info}>Con nuestra prueba de inglés interactiva podrás probar tu <strong>gramática, ortografía, pronunciación y escucha</strong>. Y con una llamada de un profesor experto podrás conocer tu nivel definitivo.</p>
                <Link className={styles.buttonStart} href="/quiz">
                    Comenzar
                </Link>
            </div>
            <div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://successacademyhn.com/wp-content/uploads/2023/02/miss.png" alt="Miss maestra" />
            </div>
        </section>
    )
}
