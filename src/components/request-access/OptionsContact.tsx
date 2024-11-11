'use client';

import React, { useState } from 'react';
import styles from './RequestAccess.module.css';
import { SelectedOption } from './SelectedOption';

const options = [
    {
        id: 0,
        name: 'WhatsApp',
    },
    {
        id: 1,
        name: 'Llamada',
    },
    {
        id: 2,
        name: 'Correo electrónico',
    },
    {
        id: 3,
        name: 'Pagar con tarjeta',
    },
]

export const OptionsContact = () => {

    const [selectedOption, setselectedOption] = useState<number | null>(null);

    return (
        <section className={styles.section}>
            <h2>Elige una forma de contacto.</h2>
            <p>Deja que un profesional te guíe en el proceso de medir tu nivel de inglés. Contacta con un profesional que te ayudará a hacer tu prueba.</p>
            <div className={styles['list-options']}>

                {
                    options.map(option => (
                        <div
                            key={option.id}
                            className={selectedOption === option.id ? styles['list-options-item-selected'] : styles['list-options-item']}
                            onClick={() => setselectedOption(option.id)}
                        >
                            {option.name}
                        </div>
                    ))
                }
            </div>

            <div className='max-w-2xl mx-auto'>
                <SelectedOption selected={selectedOption} />
            </div>

        </section>
    )
}
