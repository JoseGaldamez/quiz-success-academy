'use client';
import { AdminModel } from '@/models/admins.model';
import { addNewAdmin } from '@/services/admin';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';




export const CreateUserForm = () => {

    const router = useRouter();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        rol: 'admin'
    });


    const [error, setError] = useState("");


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

        const user = userData.email.split("@")[0].replaceAll(".", "-");

        const newAdmin: AdminModel = {
            name: userData.name,
            email: userData.email,
            pass: userData.password,
            rol: userData.rol,
            user
        }

        const saved = await addNewAdmin(newAdmin);

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
                } type="text" className='border w-full my-2 p-3 rounded-lg' placeholder='Name' />
            </p>
            <p>
                <input onChange={e => {
                    setUserData({ ...userData, email: e.target.value });
                    if (error !== "") {
                        setError("");
                    }
                }} type="email" className='border w-full my-2 p-3 rounded-lg' placeholder='Email' />
            </p>
            <p>
                <input onChange={e => {
                    setUserData({ ...userData, password: e.target.value });
                    if (error !== "") {
                        setError("");
                    }
                }} type="password" className='border w-full my-2 p-3 rounded-lg' placeholder='Password' />
            </p>
            <p>
                <input onChange={e => {
                    setUserData({ ...userData, repeatPassword: e.target.value });
                    if (error !== "") {
                        setError("");
                    }
                }} type="password" className='border w-full my-2 p-3 rounded-lg' placeholder='Repeat Password' />
            </p>
            <p>
                <select onChange={e => {
                    setUserData({ ...userData, rol: e.target.value });
                    if (error !== "") {
                        setError("");
                    }
                }} className='border w-full my-2 p-3 rounded-lg'>
                    <option value="admin">Admin</option>
                    <option value="sac">SAC</option>
                </select>
            </p>

            {
                (error !== "") && <p className='text-red-500'>{error}</p>
            }

            <button onClick={saveUser} className='mt-5 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full'>
                Create User
            </button>
        </div>
    );
}

