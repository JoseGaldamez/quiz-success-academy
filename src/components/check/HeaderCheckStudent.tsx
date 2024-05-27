import { StudentInformation } from '@/models/student.model'
import React from 'react'

export const HeaderCheckStudent = ({ user }: { user: StudentInformation }) => {
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
                <p>State: {user?.state}</p>
            </div>
        </header>
    )
}
