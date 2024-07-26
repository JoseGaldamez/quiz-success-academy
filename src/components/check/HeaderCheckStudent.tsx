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

                <div>


                    {
                        (localState === 'to_call' && auth.email !== 'guest@successacademyhn.com') && (
                            <button onClick={() => {
                                setStudentState("called")
                            }} className='bg-orange-500 text-white hover:bg-orange-600 p-2 rounded-lg'>
                                Change to Called
                            </button>
                        )
                    }

                    {
                        ((localState === 'called' || localState === 'no_registered') && auth.email !== 'guest@successacademyhn.com') && (
                            <div>
                                <button onClick={() => {
                                    setStudentState("registered")
                                }} className='bg-orange-500 text-white hover:bg-orange-600 p-2 rounded-lg mr-4'>
                                    Registered
                                </button>

                                <button onClick={() => {
                                    setStudentState("no_registered")
                                }} className='bg-orange-500 text-white hover:bg-orange-600 p-2 rounded-lg'>
                                    No Registered
                                </button>
                            </div>
                        )
                    }


                    {
                        localState === 'registered' && (
                            <div>
                                <span>Registered</span>
                            </div>
                        )
                    }

                </div>

            </div>
            {
                localState === 'no_registered' && (
                    <div>
                        <textarea value={detailsText} onChange={(inputInformation) => {
                            if (auth.email === 'guest@successacademyhn.com') return;

                            setDetailsText(inputInformation.target.value)
                            setSaved(false)
                        }} placeholder='Details' cols={5} className='w-full h-56 border-slate-400 border rounded-md p-5' ></textarea>

                        {

                            auth.email !== 'guest@successacademyhn.com' && (
                                <button disabled={saved} onClick={() => {
                                    saveDetailsNoRegistered(detailsText)
                                }} className='bg-orange-500 text-white hover:bg-orange-600 disabled:bg-orange-200 p-2 rounded-lg'>
                                    Save
                                </button>
                            )

                        }


                    </div>
                )
            }


        </header>
    )
}
