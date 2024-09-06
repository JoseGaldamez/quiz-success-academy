'use client';

import React, { useEffect, useState } from 'react'
import { getStudents } from '@/services/students.service';
import Link from 'next/link';

import { IoIosRefresh } from "react-icons/io";
import { StudentInformation } from '@/models/student.model';
import { useAppSelector } from '@/lib/store';
import { StudentStates } from '@/types/studentStates.types';



const HomeAdminPage = () => {

    const [listOfStudents, setListOfStudents] = useState<StudentInformation[]>([]);
    const [listOfStudentsBase, setListOfStudentsBase] = useState<StudentInformation[]>([]);
    const auth = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all students
        getAllStudents();
    }, []);

    const getAllStudents = async () => {
        setLoading(true);
        const response = await getStudents();
        if (response === null) {
            setListOfStudents([]);
            setLoading(false);
            return
        }

        const keys = Object.keys(response);
        const responseArray: StudentInformation[] = keys.map(key => {
            return response[key];
        });

        const orderedArray = responseArray.sort((a, b) => {
            const dateA = a.dateToCall ? a.dateToCall.date : "";
            const dateB = b.dateToCall ? b.dateToCall.date : "";

            return dateA.localeCompare(dateB)
        });

        setListOfStudents(orderedArray);
        setListOfStudentsBase(orderedArray);
        setLoading(false);

    };

    const searchStudent = (value: string) => {
        const filtered = listOfStudentsBase.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))

        setListOfStudents(filtered)
    }

    const visibleState = (state: StudentStates) => {
        switch (state) {
            case StudentStates.PENDING:
                return "Evaluacion en curso";
            case StudentStates.TO_CALL:
                return "Esperando llamada evaluativa"
            case StudentStates.CALLED:
                return "Evaluado";
            case StudentStates.REGISTERED:
                return "Matriculado";
            case StudentStates.NO_REGISTERED:
                return "No matriculado"

            default:
                return "En Proceso"
        }
    }


    return (
        <div className='max-w-5xl mt-10 mx-auto p-10'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold text-blue-950'>Bienvenido a la página de administrador</h1>
                <button onClick={getAllStudents}>
                    <IoIosRefresh className={loading ? 'animate-spin' : ''} />
                </button>
            </div>
            <hr />

            <div className='flex justify-between items-center mt-5'>
                <h3 className='text-xl'>Lista de usuarios</h3>
                {
                    auth.email !== "guest@successacademyhn.com" && (
                        <Link className='px-5 py-2 rounded-lg bg-orange-400 transition-all hover:bg-orange-600 text-white' href='/admin/create-user'>Nuevo</Link>
                    )
                }
            </div>

            <div className='w-2/3 flex'>
                <input type="text" onChange={(e) => {
                    searchStudent(e.target.value)
                }} className='mt-1 block w-2/3 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Buscar usuario' />
            </div>

            {
                loading && <p>Cargando estudiantes...</p>
            }

            {
                listOfStudents.length === 0 && !loading && <p>No hay estudiantes registrados</p>
            }

            {
                listOfStudents.length > 0 && !loading && (
                    <table className='w-full mt-5'>
                        <thead>
                            <tr className='bg-slate-200 text-left'>
                                <th className='p-3'>Nombre</th>
                                <th className='p-3'>Correo</th>
                                <th className='p-3'>Fecha</th>
                                <th className='p-3'>Estado</th>
                                <th className='p-3'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listOfStudents.map(student => (
                                    <tr key={student.code}>
                                        <td className='p-5'>{student.name}</td>
                                        <td className='p-5'>{student.email}</td>
                                        <td className='p-5'>{student.dateToCall?.date}</td>
                                        <td className='p-5'>{visibleState(student.state)}</td>
                                        <td className='p-5'>
                                            {
                                                student.state === StudentStates.PENDING ? (
                                                    <span>No disponible</span>
                                                ) : (
                                                    <Link className='bg-orange-500 text-white px-2 py-1 rounded' href={`/admin/check-student/${student.code}`}>Revisar</Link>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}




export default HomeAdminPage