import React, { useEffect, useState } from 'react'
import { StudentInformation } from '@/models/student.model'
import { StudentStates } from '@/types/studentStates.types'
import { updateStudentCalled, updateStudentState } from '@/services/students.service';
import { useAppSelector } from '@/lib/store';

export const ExamCallAndComment = ({ user }: { user: StudentInformation }) => {
    const auth = useAppSelector((state) => state.auth);

    const [called, setcalled] = useState(false);
    const [comment, setComment] = useState('');
    const [oralProduction, setOralProduction] = useState('');

    const [finished, setFinished] = useState(user.state === StudentStates.CALLED);

    const handleFinish = async () => {
        await updateStudentCalled(user.code, comment, Number(oralProduction));
        await updateStudentState(user.code, StudentStates.CALLED);
        setFinished(true);
    }

    const handleRecomendedLevel = () => {

        const totalPoints = getTotalPoints();

        if (totalPoints < 40) {
            return "Nivel 1";
        } else if (totalPoints < 76) {
            return "Nivel 2";
        } else if (totalPoints < 100) {
            return "Nivel 3";
        }
    }

    const getTotalPoints = () => {

        const examPoints = getTotal(user.answers);
        const callPoints = Number(oralProduction);
        const totalPoints = examPoints + callPoints;

        return totalPoints;

    }

    const getTotal = (answers: any) => {

        const allKeys = Object.keys(answers);
        let total: number = 0;

        allKeys.forEach(anwerKey => {
            const answer = answers[anwerKey];
            total += answer.points;
        })

        return total;
    }


    useEffect(() => {
        setcalled(user.state === StudentStates.CALLED);
        if (!user.callDetails) return;

        setOralProduction(user.callDetails.callPoints);
        setComment(user.callDetails.comment);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='pb-10'>
            {
                ((user.state === StudentStates.TO_CALL || user.state === StudentStates.IN_PROGRESS) && called === false) && (
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

                        <h2 className='mt-10 text-xl font-bold border-b-2 border-orange-500' >Oral Production {auth.email !== "sac@successacademyhn.com" && (<span onClick={() => { setFinished(false) }} className='text-orange-200 hover:text-orange-500 cursor-pointer text-sm' >Editar</span>)} </h2>
                        <hr />
                        <div className='flex justify-between items-center'>
                            <div className='m-5'>
                                <p> <strong>Observaciones:</strong> {comment}</p>
                            </div>
                            <div className='min-w-48 text-end'>
                                <span className='text-2xl font-bold text-orange-500 m-5'>{oralProduction} / 50</span>
                            </div>
                        </div>
                        <div className='m-5 text-center p-5 bg-orange-50 rounded-lg'>
                            <p> <strong>Nivel recomendado ( <span>{getTotalPoints()} puntos</span> ) </strong> </p>
                            <span className='text-2xl font-bold text-orange-500 m-5 block'>{handleRecomendedLevel()}</span>
                            <span className="text-sm text-gray-400 px-10 block" >
                                * Este nivel se recomienda en base a la calificación numérica. Si se desea recomendar otro nivel puede especificarse en los comentarios
                            </span>
                        </div>
                    </div>
                )
            }

        </div>
    )
}
