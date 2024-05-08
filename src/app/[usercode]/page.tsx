'use client';

import { MenuBar } from '@/common/MenuBar';
import { TopBar } from '@/common/TopBar';
import { SET_USER_STATE } from '@/lib/slices/testCurrentUser';
import { useAppDispatch } from '@/lib/store';
import { UserInformation } from '@/models/user.model';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


const UserCodeCheckPage = ({ params }: { params: { usercode: string } }) => {

    const dispatch = useAppDispatch();

    const [user, setUser] = useState<UserInformation | undefined | null>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const userLocal = JSON.parse(localStorage.getItem(params.usercode) || '{}');
        if (userLocal.name) {
            setUser(userLocal);
            setLoading(false);
            dispatch(SET_USER_STATE({ userName: userLocal.name, userCode: params.usercode }));
        } else {
            setLoading(false);
            setUser(null);
        }
    }, []);


    return (
        <div>
            <TopBar />
            <MenuBar />
            <div className='max-w-4xl mx-auto my-20 text-center'>

                {!loading ? <div>

                    {
                        (user != null) ? <div>
                            <h2 className='text-2xl my-5'>Bienvenido <strong>{user?.name}</strong></h2>
                            <div className='my-16'>
                                <Link href={`./${params.usercode}/placement`}
                                    className='bg-orange-500 
                                rounded-lg text-white text-xl font-bold py-5 px-10'>
                                    Comenzar prueba
                                </Link>
                            </div>

                        </div> : <p>Usuario no encontrado.</p>
                    }
                </div> : <div>Buscando usuario...</div>}

            </div>
        </div>
    )
}

export default UserCodeCheckPage