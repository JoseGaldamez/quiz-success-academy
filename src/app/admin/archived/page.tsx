'use client';

import React, { useEffect, useState } from 'react'
import { archiveStudentService, getArchivedStudents, getStudents } from '@/services/students.service';
import Link from 'next/link';

import { IoIosRefresh } from "react-icons/io";
import { StudentInformation } from '@/models/student.model';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { StudentStates } from '@/types/studentStates.types';
import { RESET_USER_STATE } from '@/lib/slices/currentStudent';



const HomeAdminPage = () => {

    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    const [listOfStudents, setListOfStudents] = useState<StudentInformation[]>([]);
    const [listOfStudentsChecked, setListOfStudentsChecked] = useState<StudentInformation[]>([]);
    const [listOfStudentsBase, setListOfStudentsBase] = useState<StudentInformation[]>([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setshowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState("");



    useEffect(() => {
        // Fetch all students
        getAllStudents();
        dispatch(RESET_USER_STATE())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAllStudents = async () => {
        setLoading(true);
        const response = await getArchivedStudents();
        if (response === null) {
            setListOfStudents([]);
            setLoading(false);
            return
        }

        const keys = Object.keys(response);
        const responseArray: StudentInformation[] = keys.map(key => {
            return response[key];
        });

        setListOfStudents(responseArray);
        setListOfStudentsBase(responseArray);
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



    const archiveStudent = async () => {

        await archiveStudentService(selectedStudent);
        await getAllStudents();
        setshowModal(false);

    }


    return (
        <div>


            <div className='max-w-5xl mt-10 mx-auto p-10'>
                <div className='flex justify-between'>
                    <h1 className='text-3xl font-bold text-blue-950'>Bienvenido a la página de administrador</h1>
                    <button onClick={getAllStudents}>
                        <IoIosRefresh className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
                <hr />

                <div className='flex justify-between items-center mt-5'>
                    <h3 className='text-xl'>Lista de estudiantes</h3>
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
                                    <th className='p-2'>Nombre</th>
                                    <th className='p-2'>Correo</th>
                                    <th className='p-2'>Fecha</th>
                                    <th className='p-2'>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listOfStudents.map(student => (
                                        <tr key={student.code}>
                                            <td className='p-2 py-4'>{student.name}</td>
                                            <td className='p-2 py-4'>{student.email}</td>
                                            <td className='p-2 py-4'>{student.dateToCall?.date}</td>
                                            <td className='p-2 py-4'>{visibleState(student.state)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                }

            </div>

            {
                showModal && (
                    <div className='w-full fixed bottom-0 right-0 bg-black/55 h-full p-5 shadow-lg flex justify-center items-center'>
                        <div className='bg-white p-5 rounded-lg max-w-2xl mx-auto '>
                            <h3 className='font-bold text-xl text-center mb-5 text-gray-900'>
                                ¿Está seguro que desea archivar este usuario?
                            </h3>
                            <p>Si archiva este usuario solo podrá verla en la pestaña de Historial.</p>
                            <div className='flex justify-center mt-5 gap-5'>
                                <button onClick={() => {
                                    setshowModal(false);
                                    setSelectedStudent("");
                                }} className='px-5 py-2 bg-gray-300 hover:bg-gray-500 text-white rounded-lg transition-all ease-in-out duration-300'>
                                    Cancelar
                                </button>
                                <button onClick={archiveStudent} className='px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all ease-in-out duration-300'>
                                    Archivar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}




export default HomeAdminPage