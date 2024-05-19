

import Link from 'next/link'
import React, { useState } from 'react'
import { MdContentCopy } from "react-icons/md";


export const UserCreated = ({ userCode }: { userCode: string }) => {

    const [coppied, setCoppied] = useState<boolean>(false);

    const handleCopyCode = () => {

        const textToCopy = `Hola. Este es el link para acceder a hacer su quiz es: ${window.location.origin}/${userCode} mucha suerte!`;

        navigator.clipboard.writeText(textToCopy);
        setCoppied(true);
    }


    return (
        <div className='p-5'>
            <h1 className='text-2xl font-bold text-blue-950'>Usuario creado exitosamente</h1>
            <hr />
            <div className='mt-5 w-full'>
                <p>
                    Copie el siguiente código para que el usuario pueda acceder a su cuenta y completar su test.
                </p>
                <p className='flex justify-start items-center mt-10' >
                    El código del usuario es: <span className='font-bold text-white bg-orange-400 hover:bg-orange-500 underline ml-5 text-xl flex items-center pl-3 text-center rounded-md cursor-pointer' onClick={handleCopyCode} >
                        {userCode}
                        <MdContentCopy
                            className='text-3xl m-2' />
                    </span>
                </p>

                {coppied && <p className='text-green-500 mt-5'>Código copiado correctamente</p>}

                <div className='w-full bg-slate-200'>
                    <Link href='/admin/home' className='block mt-10 text-center px-10 py-2 rounded-lg bg-orange-400 transition-all hover:bg-orange-600 text-white text-xl w-full'>Volver</Link>
                </div>
            </div>
        </div>
    )
}
