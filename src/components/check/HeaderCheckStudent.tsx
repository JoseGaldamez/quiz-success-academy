import React from 'react'

import { StudentInformation } from '@/models/student.model'
import { StudentStates } from '@/types/studentStates.types';

export const HeaderCheckStudent = ({ user }: { user: StudentInformation }) => {

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
        <header className='border border-slate-300 p-5 rounded-lg'>

            <div className='flex items-center justify-between'>
                <h2 className='text-2xl my-5 items-start'>
                    <strong>{user?.name}</strong>
                    <span className='text-sm pl-2'> <i>{user?.dni}</i> </span>
                </h2>
                <p className='text-slate-400'>{user?.code}</p>
            </div>
            <div className='flex justify-between gap-2'>
                <p>Ciudad: {user?.city}</p>
                <p>Email: {user?.email}</p>
                <p>Phone: {user?.phone}</p>
            </div>


            <div className='flex items-center justify-between'>
                <h2 className='text-lg my-5 items-start'>
                    <strong>Estado: </strong>
                    <span className='text-sm pl-2'> {visibleState(user.state)} </span>
                </h2>
            </div>

        </header>
    )
}
