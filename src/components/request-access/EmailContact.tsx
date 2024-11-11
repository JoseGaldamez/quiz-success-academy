import React from 'react'

export const EmailContact = () => {
    return (
        <div className='text-center mt-20'>
            <h2 className='text-slate-900'>Correo Electrónico</h2>
            <p className='text-slate-700'>Envianos un correo, lo contestaremos lo más pronto posible.</p>
            <a className='px-16 py-3 bg-slate-600 block mt-8 w-72 mx-auto text-white font-bold rounded-lg' href="mailto:evaluaciones.academicas@successacademyhn.com" target="_blank" rel="noreferrer">
                <button>Enviar email</button>
            </a>
            <p className='mt-10 text-xl'>
                Correo: <strong>evaluaciones.academicas@successacademyhn.com</strong>
            </p>
        </div>
    )
}
