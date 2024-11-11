import React from 'react'

export const CallContact = () => {
    return (
        <div className='text-center mt-20'>
            <h2 className='text-slate-900'>Llamada</h2>
            <p className='text-slate-700'>Puedes hacernos una llamada telefónica.</p>
            <a className='px-16 py-3 bg-blue-950 block mt-8 w-72 mx-auto text-white font-bold rounded-lg' href="tel:+50495182139" target="_blank" rel="noreferrer">
                <button>Llamar</button>
            </a>
            <p className='mt-10 text-xl'>
                Número de teléfono: <strong> +504 9518-2139</strong>
            </p>
        </div>
    )
}
