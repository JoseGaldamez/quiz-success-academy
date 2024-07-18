import { StudentInformation } from '@/models/student.model'
import { updateStudentState } from '@/services/students.service'
import React, { useState } from 'react'

export const HeaderCheckStudent = ({ user }: { user: StudentInformation }) => {

    const [localState, setLocalState] = useState(user.state);

    const setStudentState = async (newState: string) => {

        const response = await updateStudentState(user.code, newState);
        if (response) {
            setLocalState(response);
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
                    <span className='text-sm pl-2'> {localState} </span>
                </h2>

                <div>




                    <button onClick={() => {
                        setStudentState("called")
                    }} className='bg-orange-500 text-white hover:bg-orange-600 p-2 rounded-lg'>
                        Change to Called
                    </button>
                </div>
            </div>


        </header>
    )
}
