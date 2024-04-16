'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import ShortUniqueId from 'short-unique-id';


const CreateUserPage = () => {

    const uid = new ShortUniqueId({ length: 10 });
    const [userCode, setUserCode] = useState<string | null>(null);


    const createUserFromForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            name: { value: string };
            dni: { value: string };
            email: { value: string };
            age: { value: string };
            phone: { value: string };
            city: { value: string };
        };

        const user = {
            name: target.name.value,
            dni: target.dni.value,
            email: target.email.value,
            age: target.age.value,
            phone: target.phone.value,
            city: target.city.value,
        }

        console.log(user);
        const userUUID = uid.rnd();

        console.log(userUUID);

        localStorage.setItem(userUUID, JSON.stringify(user));

        setUserCode(userUUID);

    }


    if (userCode === null) {


        return (
            <div className='max-w-5xl mt-10 mx-auto'>
                <h1 className='text-2xl font-bold text-blue-950'>Crear nuevo usuario</h1>
                <hr />

                <div className='mt-5 flex justify-between'>
                    <form onSubmit={createUserFromForm} className='w-full pr-10'>
                        <div className='px-5 py-2'>
                            <label className='block text-sm font-medium text-slate-900'>Nombre completo</label>
                            <input type='text' name='name' className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        </div>
                        <div className='px-5 py-2'>
                            <label className='block text-sm font-medium text-slate-900'>DNI</label>
                            <input type='text' name='dni' className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        </div>
                        <div className='px-5 py-2'>
                            <label className='block text-sm font-medium text-slate-900'>Correo electronico</label>
                            <input type='email' name='email' className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        </div>
                        <div className='px-5 py-2'>
                            <label className='block text-sm font-medium text-slate-900'>Edad</label>
                            <input type='number' name='age' className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        </div>
                        <div className='px-5 py-2'>
                            <label className='block text-sm font-medium text-slate-900'>Telefono</label>
                            <input type='text' name='phone' className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        </div>
                        <div className='px-5 py-2'>
                            <label className='block text-sm font-medium text-slate-900'>Ciudad</label>
                            <input type='text' name='city' className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        </div>
                        <div className='p-5'>
                            <button type='submit' className='transition-all w-full bg-orange-500 py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                Crear usuario
                            </button>
                        </div>
                    </form>
                    <div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://successacademyhn.com/wp-content/uploads/2023/03/front-view-smiley-teenage-girl-with-headphones-during-online-school.jpg" alt="Crear usuario" />
                    </div>
                </div>

            </div>
        )
    } else {
        return (
            <div className='max-w-5xl mt-10 mx-auto'>
                <h1 className='text-2xl font-bold text-blue-950'>Usuario creado</h1>
                <hr />
                <div className='mt-5'>
                    <p>El usuario ha sido creado exitosamente. El código del usuario es: <Link href={`/${userCode}`} className='font-bold text-orange-500 underline'>{userCode}</Link></p>
                    <Link href='/admin/home' className='px-5 py-2 rounded-lg bg-orange-400 transition-all hover:bg-orange-600 text-white'>Volver</Link>
                </div>
            </div>
        )
    }
}

export default CreateUserPage