'use client';
import React, { useEffect, useState } from 'react'

import { MenuBar } from '@/common/MenuBar';

import { SET_USER_STATE } from '@/lib/slices/currentStudent';
import { useAppDispatch } from '@/lib/store';
import { StudentInformation } from '@/models/student.model';
import { getStudentByCode } from '@/services/students.service';
import Link from 'next/link';
import { StudentStates } from '@/types/studentStates.types';


const UserCodeCheckPage = ({ params }: { params: { usercode: string } }) => {

    const dispatch = useAppDispatch();

    const [user, setUser] = useState<StudentInformation | undefined | null>(undefined);
    const [thereIsTime, setThereIsTime] = useState(false);
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

        if (student.initedQuizDate === undefined) {
            dispatch(SET_USER_STATE(student));
            setThereIsTime(true);
        } else {
            // check if there is still time
            const initedQuizDate = new Date(student.initedQuizDate).getTime();
            const currentDate = new Date().getTime();

            // milisecont from init
            const timer = currentDate - initedQuizDate;

            const admintedTime = 1000 * 60 * 90; //
            if (timer < admintedTime) {
                dispatch(SET_USER_STATE(student));
                setThereIsTime(true);
            } else {
                setThereIsTime(false);
            }
        }

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
                                ((user.state === StudentStates.PENDING || user.state === StudentStates.IN_PROGRESS) && thereIsTime) &&
                                <div className='my-16'>
                                    <Link href={`./${params.usercode}/placement`}
                                        className='bg-orange-500 
                                rounded-lg text-white text-xl font-bold py-5 px-10'>
                                        Comenzar prueba
                                    </Link>
                                </div>
                            }

                            {
                                ((user.state === StudentStates.PENDING || user.state === StudentStates.IN_PROGRESS) && !thereIsTime) &&
                                <div className='my-16'>
                                    <span
                                        className='bg-gray-400 
                                rounded-lg text-gray-500 text-xl font-bold py-5 px-10'>
                                        El tiempo para realizar la prueba ha acabado
                                    </span>
                                </div>
                            }

                            {
                                (user.state === StudentStates.TO_CALL) &&
                                <div className='px-16 py-5 text-lg'>

                                    {
                                        user.dateToCall === undefined ? <div>
                                            Elige una fecha para la llamada
                                            <div className='my-16'>
                                                <Link href={`./${params.usercode}/calendar`}
                                                    className='bg-orange-500 
                                rounded-lg text-white text-xl font-bold py-5 px-10'>
                                                    Elige una fecha
                                                </Link>
                                            </div>

                                        </div> : <p>
                                            You have finish your online test. We will contact you on the date and hour you have chosen to continue the process with the speaking part of this test. <strong>Please be ready and on time for the call.</strong>
                                        </p>
                                    }


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