import { UsersList } from '@/components/usersList/UsersList';
import Link from 'next/link';
import React from 'react';

const UsersPage = () => {
    return (
        <div className='max-w-5xl mt-5 mx-auto p-5'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold text-blue-950'>Usuarios</h1>
                <Link href='/admin/users/create' className='px-5 py-2 rounded-lg bg-orange-400 transition-all hover:bg-orange-600 text-white'>
                    Nuevo Usuario
                </Link>
            </div>

            <UsersList />
        </div>
    );
}

export default UsersPage;
