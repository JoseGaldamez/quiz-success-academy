'use client';

import { MenuBar } from '@/common/MenuBar';
import { TopBar } from '@/common/TopBar';
import { UserInformation } from '@/models/user.model';
import React, { useEffect, useState } from 'react'


const UserCodeCheckPage = ({ params }: { params: { usercode: string } }) => {

    const [user, setUser] = useState<UserInformation | undefined>();
    const [found, setFound] = useState(false);

    useEffect(() => {
        console.log('UserCodeCheckPage useEffect');
        const userLocal = localStorage.getItem(params.usercode);
        if (userLocal) {
            setUser(JSON.parse(userLocal));
            setFound(true);
        } else {
            setFound(false);
        }
    }, []);


    return (
        <div>
            <TopBar />
            <MenuBar />
            <div className='max-w-4xl mx-auto my-10'>

                <h1 className='text-2xl'>
                    UserCodeCheckPage <strong>{params.usercode}</strong>
                </h1>
                <hr />
                {found ? <div>
                    <h2 className='text-xl my-5'>Usuario encontrado</h2>
                    <p>Nombre: {user?.name}</p>
                    <p>DNI: {user?.dni}</p>
                    <p>Email: {user?.email}</p>
                    <p>Edad: {user?.age}</p>
                    <p>Teléfono: {user?.phone}</p>
                    <p>Ciudad: {user?.city}</p>
                    <button className='bg-orange-500 rounded-lg mt-10 py-3 w-full text-white text-xl font-bold'>
                        Comenzar prueba
                    </button>
                </div> : <h1>Usuario no encontrado</h1>}

            </div>
        </div>
    )
}

export default UserCodeCheckPage