'use client';
import React, { useEffect, useState } from 'react';
import { AdminModel } from '@/models/admins.model';
import { useRouter } from 'next/navigation';
import { deleteAdmin, getAdminByCode, udpateAdmin } from '@/services/admin';

export const EditUserForm = ({ userId }: { userId: string }) => {


    const router = useRouter();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        rol: ''
    });


    const [error, setError] = useState("");



    useEffect(() => {
        getAdminInfo();
    }, []);


    const getAdminInfo = async () => {
        const response = await getAdminByCode(userId);
        if (response === null) {
            router.push('/admin/users');
            return;
        }

        setUserData({
            name: response.name,
            email: response.email,
            password: response.pass,
            repeatPassword: response.pass,
            rol: response.rol
        })
    }

    const deleteUser = async () => {
        const result = await deleteAdmin(userId);
        if (result) {
            router.push('/admin/users');
        }
        console.log(result)
    }

    const saveUser = async () => {

        if (userData.name === "") {
            setError("El nombre es requerido");
            return;
        } else {
            setError("");
        }

        if (userData.email === "") {
            setError("El email es requerido");
            return;
        } else {
            setError("");
        }

        if (!userData.email.includes("@")) {
            setError("El email no es válido");
            return;
        } else {
            setError("");
        }

        if (userData.password === "") {
            setError("La contraseña es requerida");
            return;
        } else {
            setError("");
        }

        if (userData.password !== userData.repeatPassword) {
            setError("Las contraseñas no coinciden");
            return;
        } else {
            setError("");
        }

        const newAdmin: AdminModel = {
            name: userData.name,
            email: userData.email,
            pass: userData.password,
            rol: userData.rol,
            user: userId
        }

        const saved = await udpateAdmin(userId, newAdmin);

        if (saved == null) {
            setError("El usuario ya existe");
            return;
        } else {
            setError("");
        }

        router.push('/admin/users');

    }



    return (
        <div className='pt-5'>
            <p>
                <input onChange={e => {
                    setUserData({ ...userData, name: e.target.value });
                    if (error !== "") {
                        setError("");
                    }
                }
                } type="text" value={userData.name} className='border w-full my-2 p-3 rounded-lg' placeholder='Name' />
            </p>
            <p>
                <input onChange={e => {
                    setUserData({ ...userData, email: e.target.value });
                    if (error !== "") {
                        setError("");
                    }
                }} type="email" value={userData.email} className='border w-full my-2 p-3 rounded-lg' placeholder='Email' disabled />
            </p>
            <p>
                <input onChange={e => {
                    setUserData({ ...userData, password: e.target.value });
                    if (error !== "") {
                        setError("");
                    }
                }} type="password" value={userData.password} className='border w-full my-2 p-3 rounded-lg' placeholder='Password' />
            </p>
            <p>
                <input onChange={e => {
                    setUserData({ ...userData, repeatPassword: e.target.value });
                    if (error !== "") {
                        setError("");
                    }
                }} type="password" value={userData.repeatPassword} className='border w-full my-2 p-3 rounded-lg' placeholder='Repeat Password' />
            </p>
            <p>
                <select onChange={e => {
                    setUserData({ ...userData, rol: e.target.value });
                    if (error !== "") {
                        setError("");
                    }
                }} value={userData.rol} className='border w-full my-2 p-3 rounded-lg'>
                    <option value="admin">Admin</option>
                    <option value="sac">SAC</option>
                </select>
            </p>

            {
                (error !== "") && <p className='text-red-500'>{error}</p>
            }

            <button onClick={saveUser} className='mt-5 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full'>
                Update User
            </button>

            <button onClick={deleteUser} className='mt-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full'>
                Delete user
            </button>
        </div>
    );
}

