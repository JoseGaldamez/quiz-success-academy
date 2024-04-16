'use client';

import Link from 'next/link';
import React from 'react'

const HomeAdminPage = () => {

    return (
        <div className='max-w-5xl mt-10 mx-auto'>
            <h1 className='text-3xl font-bold text-blue-950'>Bienvenido a la página de administrador</h1>
            <hr />

            <div className='flex justify-between items-center mt-5'>
                <h3 className='text-xl'>Lista de usuarios</h3>
                <Link className='px-5 py-2 rounded-lg bg-orange-400 transition-all hover:bg-orange-600 text-white' href='/admin/create-user'>Nuevo</Link>
            </div>

        </div>
    )
}

export default HomeAdminPage