'use client';
import React, { useEffect, useState } from 'react'

import { MenuBar } from '@/common/MenuBar';
import { TopBar } from '@/common/TopBar';
import { SET_USER_STATE } from '@/lib/slices/currentStudent';
import { useAppDispatch } from '@/lib/store';
import { StudentInformation } from '@/models/student.model';
import { getStudentByCode } from '@/services/students.service';
import Link from 'next/link';
import { StudentStates } from '@/types/studentStates.types';


const UserCodeCheckPage = ({ params }: { params: { usercode: string } }) => {

    const dispatch = useAppDispatch();

    const [user, setUser] = useState<StudentInformation | undefined | null>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getStudentInformation(params.usercode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStudentInformation = async (userCode: string) => {

        const student: StudentInformation = await getStudentByCode(userCode);

        if (student === null) {
            setLoading(false);
            setUser(null);
            return;
        }

        if (student === undefined) {
            setLoading(false);
            setUser(null);
            return;
        }
        setUser(student);
        setLoading(false);
        dispatch(SET_USER_STATE(student));
    }


    return (
        <div>
            <MenuBar showRequestAccessButton={false} />
            <div className='max-w-4xl mx-auto my-20 text-center'>

                {!loading ? <div>

                    {
                        (user != null) ? <div>
                            <h2 className='text-2xl my-5'>Bienvenido <strong>{user?.name}</strong></h2>
                            {
                                (user.state === StudentStates.PENDING || user.state === StudentStates.IN_PROGRESS) &&
                                <div className='my-16'>
                                    <Link href={`./${params.usercode}/placement`}
                                        className='bg-orange-500 
                                rounded-lg text-white text-xl font-bold py-5 px-10'>
                                        Comenzar prueba
                                    </Link>
                                </div>
                            }

                            {
                                (user.state === StudentStates.TO_CALL) &&
                                <div className='px-16 py-5 text-lg'>
                                    <p>
                                        You have finish your online test. We will contact you on the date and hour you have chosen to continue the process with the speaking part of this test. <strong>Please be ready and on time for the call.</strong>
                                    </p>
                                </div>
                            }


                        </div> : <p>Usuario no encontrado.</p>
                    }
                </div> : <div>Buscando usuario...</div>}

            </div>
        </div>
    )
}

export default UserCodeCheckPage