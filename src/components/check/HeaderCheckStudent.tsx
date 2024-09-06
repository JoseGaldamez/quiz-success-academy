import { useAppSelector } from '@/lib/store';
import { StudentInformation } from '@/models/student.model'
import { updateStudentDetails, updateStudentState } from '@/services/students.service'
import React, { useState } from 'react'

export const HeaderCheckStudent = ({ user }: { user: StudentInformation }) => {

    const [localState, setLocalState] = useState(user.state);
    const [detailsText, setDetailsText] = useState(user.details || "");
    const auth = useAppSelector((state) => state.auth);
    const [saved, setSaved] = useState(true);

    const setStudentState = async (newState: string) => {

        const response = await updateStudentState(user.code, newState);
        if (response) {
            setLocalState(response);
        }

    }

    const saveDetailsNoRegistered = async (details: string) => {

        await updateStudentDetails(user.code, details);

        setSaved(true);

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
                    <span className='text-sm pl-2'> {localState} </span>
                </h2>
            </div>

        </header>
    )
}
