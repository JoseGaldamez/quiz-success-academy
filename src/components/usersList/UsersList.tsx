'use client';
import { AdminModel } from '@/models/admins.model';
import { getAdmins } from '@/services/admin';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export const UsersList = () => {

    const [admins, setAdmins] = useState<AdminModel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getAllAdmins();


    }, []);

    const getAllAdmins = async () => {
        const list: AdminModel[] = [];
        const adminsList = await getAdmins();
        const keys = Object.keys(adminsList);

        keys.forEach(key => {
            adminsList[key].user = key;
            list.push(adminsList[key]);
        });

        setAdmins(list);
        setLoading(false);
    }

    return (
        <div>
            {
                loading && <p>Cargando usuarios...</p>
            }

            {
                (!loading && admins.length == 0) &&
                <div>
                    No hay usuarios registrados
                </div>
            }

            {
                (!loading && admins.length > 0) &&
                <div>
                    <table className='w-full mt-5'>
                        <thead>
                            <tr className='bg-slate-200 text-left'>
                                <th className='p-3'>Nombre</th>
                                <th className='p-3'>Correo</th>
                                <th className='p-3'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                admins.map(admin => {
                                    return <tr key={admin.user}>
                                        <td className='py-5'>{admin.name}</td>
                                        <td className='py-5'>{admin.email}</td>
                                        <td className='py-5'>
                                            <Link href={`/admin/users/edit/${admin.user}`} className='bg-orange-500 text-white px-2 py-1 rounded'>
                                                Editar
                                            </Link>

                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }

        </div>
    );
}
