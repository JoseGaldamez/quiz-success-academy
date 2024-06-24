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
                    <p>Comprueba que conocer la gramática al escribir bien en inglés.</p>
                </article>
                <article>
                    <h4>Escucha</h4>
                    <p>Entiendes cuando escuchar una conversación en inglés.</p>
                </article>
                <article>
                    <h4>Pronunciación</h4>
                    <p>Saber como pronunciar bien cada palabra y entonación al hablar.</p>
                </article>
                <article>
                    <h4>Ortografía</h4>
                    <p>Recuerdas como escribir cada palabra que sabes en inglés.</p>
                </article>
            </div>

            <Link href={'/request-access'} className={styles.requestAccessButton}>Solicitar Acceso</Link>

        </section>
    )
}
