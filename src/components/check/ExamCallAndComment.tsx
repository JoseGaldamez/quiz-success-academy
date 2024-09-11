import React, { useEffect, useState } from 'react'
import { StudentInformation } from '@/models/student.model'
import { StudentStates } from '@/types/studentStates.types'
import { updateStudentCalled, updateStudentState } from '@/services/students.service';

export const ExamCallAndComment = ({ user }: { user: StudentInformation }) => {
    const [called, setcalled] = useState(false);
    const [comment, setComment] = useState('');
    const [oralProduction, setOralProduction] = useState('');

    const [finished, setFinished] = useState(user.state === StudentStates.CALLED);

    const handleFinish = async () => {
        await updateStudentCalled(user.code, comment, Number(oralProduction));
        await updateStudentState(user.code, StudentStates.CALLED);
        setFinished(true);
    }


    useEffect(() => {
        setcalled(user.state === StudentStates.CALLED);
        if (!user.callDetails) return;

        setOralProduction(user.callDetails.callPoints);
        setComment(user.callDetails.comment);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='pb-36'>
            {
                (user.state === StudentStates.TO_CALL && called === false) && (
                    <div>
                        <button type="button" onClick={() => { setcalled(true) }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5 w-full mb-10'>Llamada realizada</button>
                    </div>
                )
            }

            {
                (called === true && finished === false) && (
                    <div>

                        <p className='m-5'>
                            <strong>Oral Production:</strong>
                            <input value={oralProduction} onChange={(e) => { setOralProduction(e.target.value) }} className='p-2 border ml-3' type="number" placeholder='50' />
                        </p>

                        <p className='m-5'>
                            <textarea value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder='Observaciones' className='p-2 border ml-3 w-full' name="commentCallExam" rows={4} cols={50} id="commentCallExam"></textarea>
                        </p>


                        <button type="button" onClick={handleFinish} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mt-5 w-full mb-10'>Guardar cambios</button>
                    </div>
                )
            }

            {
                (finished === true) && (
                    <div>

                        <h2 className='mt-10 text-xl font-bold border-b-2 border-orange-500' >Oral Production <span onClick={() => { setFinished(false) }} className='text-orange-200 hover:text-orange-500 cursor-pointer text-sm' >Editar</span> </h2>
                        <hr />
                        <div className='flex justify-between items-center'>
                            <div className='m-5'>
                                <p> <strong>Observaciones:</strong> {comment}</p>
                            </div>
                            <div className='min-w-48 text-end'>
                                <span className='text-2xl font-bold text-orange-500 m-5'>{oralProduction} / 50</span>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}
