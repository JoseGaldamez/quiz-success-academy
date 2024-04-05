import React from 'react'

export const WhatsappContact = () => {
    return (
        <div className='text-center mt-20'>
            <h2 className='text-slate-900'>Whatsapp</h2>
            <p className='text-slate-700'>Envíanos un mensaje a nuestro número de WhatsApp y te responderemos lo antes posible.</p>
            <a className='px-16 py-3 bg-green-700 block mt-8 w-72 mx-auto text-white font-bold rounded-lg' href="https://wa.me/50431751455" target="_blank" rel="noreferrer">
                <button>Enviar mensaje</button>
            </a>
            <p className='mt-10 text-xl'>
                Número de WhatsApp: <strong> +504 3175-1455</strong>
            </p>
        </div>
    )
}
