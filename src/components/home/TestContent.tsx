import React from 'react'
import styles from './Home.module.css';
import Link from 'next/link';

export const TestContent = () => {
    return (
        <section className={styles.testContentSection}>
            <div className={styles.testHeader}>
                <h3 className={styles.testSubtitle}>¿Cómo es la prueba?</h3>
                <h2 className={styles.testTitle}>Nuestra prueba de inglés incluye</h2>
            </div>
            
            <div className={styles.testGrid}>
                <article className={styles.testCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrapper}>✍️</div>
                        <h4 className={styles.cardTitle}>Gramática</h4>
                    </div>
                    <p className={styles.cardDesc}>Comprueba que conoces la gramática al escribir correctamente en inglés.</p>
                </article>
                <article className={styles.testCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrapper}>🎧</div>
                        <h4 className={styles.cardTitle}>Escucha</h4>
                    </div>
                    <p className={styles.cardDesc}>Demuestra que entiendes al escuchar una conversación en inglés.</p>
                </article>
                <article className={styles.testCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrapper}>🗣️</div>
                        <h4 className={styles.cardTitle}>Pronunciación</h4>
                    </div>
                    <p className={styles.cardDesc}>Saber cómo pronunciar bien cada palabra y la entonación correcta al hablar.</p>
                </article>
                <article className={styles.testCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrapper}>📝</div>
                        <h4 className={styles.cardTitle}>Ortografía</h4>
                    </div>
                    <p className={styles.cardDesc}>Demuestra que recuerdas cómo escribir cada palabra que sabes en inglés.</p>
                </article>
            </div>

            <Link href={'/request-access'} className={styles.requestAccessButton}>Solicitar Acceso</Link>

        </section>
    )
}
