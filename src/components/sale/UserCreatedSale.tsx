

import Link from 'next/link'
import React, { useState } from 'react'
import { MdContentCopy } from "react-icons/md";


export const UserCreatedSale = ({ userCode }: { userCode: string }) => {

    const [coppied, setCoppied] = useState<boolean>(false);

    const handleCopyCode = () => {

        const textToCopy = `Enlace para acceder a su quiz: ${window.location.origin}/${userCode} mucha suerte!`;

        navigator.clipboard.writeText(textToCopy);
        setCoppied(true);
    }


    return (
        <div className='p-5'>
            <h1 className='text-2xl font-bold text-blue-950'>Usuario creado exitosamente</h1>
            <hr />
            <div className='mt-5 w-full'>
                <p>
                    Su usuario se ha creado correctamente, ya puede comenzar su prueba. Le recomendamos <strong>copiar el código del usuario o el link para acceder a su cuenta después</strong> en caso de no poder realizar la prueba en este momento.
                </p>
                <div className='w-full bg-slate-200'>
                    <Link href={`${window.location.origin}/${userCode}`} className='block mt-10 text-center px-10 py-2 rounded-lg bg-orange-400 transition-all hover:bg-orange-600 text-white text-xl w-full'>Comenzar la prueba</Link>
                </div>
                <p className='flex justify-start items-center mt-10' >
                    El código del usuario es: <span className='font-bold text-white bg-orange-400 hover:bg-orange-500 underline ml-5 text-xl flex items-center pl-3 text-center rounded-md cursor-pointer' onClick={handleCopyCode} >
                        {userCode}
                        <MdContentCopy
                            className='text-3xl m-2' />
                    </span>
                </p>

                {coppied && <p className='text-green-500 mt-5'>Código copiado correctamente</p>}

            </div>
        </div>
    )
}
