import React from 'react'
import styles from './Home.module.css';
import Link from 'next/link';

export const TestContent = () => {
    return (
        <section className={styles.testContentSection}>
            <h3>¿Cómo es la prueba?</h3>
            <h2>Nuestra prueba de inglés incluye</h2>
            <div className={styles.testElements}>
                <article>
                    <h4>Gramática</h4>
                    <p>Prueba tu conocimiento de gramática con preguntas de selección múltiple.</p>
                </article>
                <article>
                    <h4>Escucha</h4>
                    <p>Prueba tu conocimiento de gramática con preguntas de selección múltiple.</p>
                </article>
                <article>
                    <h4>Pronunciación</h4>
                    <p>Prueba tu conocimiento de gramática con preguntas de selección múltiple.</p>
                </article>
                <article>
                    <h4>Ortografía</h4>
                    <p>Prueba tu conocimiento de gramática con preguntas de selección múltiple.</p>
                </article>
            </div>

            <Link href={'/request-access'} className={styles.requestAccessButton}>Solicitar Acceso</Link>

        </section>
    )
}
