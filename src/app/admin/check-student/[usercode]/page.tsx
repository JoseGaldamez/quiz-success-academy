'use client';

import React, { useEffect, useState } from 'react'
import { SET_USER_STATE } from '@/lib/slices/currentStudent';
import { useAppDispatch } from '@/lib/store';
import { StudentInformation } from '@/models/student.model';
import { getStudentByCode } from '@/services/students.service';
import { HeaderCheckStudent } from '@/components/check/HeaderCheckStudent';
import { getAllQuestions } from '@/services/question.service';
import { list } from '@firebase/storage';
import { listenerCount } from 'process';
import { questionTypes } from '@/types/questions.types';
import { CheckAnswerUniqueQuestion } from '@/components/check/CheckAnswerUniqueQuestion';

const CheckStudent = ({ params }: { params: { usercode: string } }) => {

    const dispatch = useAppDispatch();

    const [user, setUser] = useState<StudentInformation | undefined | null>(undefined);
    const [questionsList, setQuestionsList] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getStudentAndQuestionsInformation(params.usercode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStudentAndQuestionsInformation = async (userCode: string) => {

        const student: StudentInformation = await getStudentByCode(userCode);
        await createListOfQuestions();

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

    const createListOfQuestions = async () => {
        const questions = await getAllQuestions();

        const list: any[] = [];

        const indexQuestions = Object.keys(questions);
        indexQuestions.forEach((key) => {
            list.push(questions[key]);
        });

        console.log(list);

        setQuestionsList(list);
    }

    return (
        <div className='max-w-5xl mt-10 mx-auto px-10'>
            {
                loading && <p>Cargando...</p>
            }
            {
                (user != null) && (
                    <div className='px-10'>
                        <HeaderCheckStudent user={user} />

                        <h3 className='mt-10 text-xl font-bold border-b-2 border-orange-500'>Answers</h3>
                        {
                            questionsList.map((question, index) => {
                                return (
                                    <div key={index} className='p-5 my-5 border-b border-slate-400'>
                                        <h3 className='text-lg font-bold'>{index + 1}- {question.title}</h3>
                                        {
                                            question.type === questionTypes.UNIQUE_SELECTION && (
                                                <CheckAnswerUniqueQuestion answer={user.answers[question["questionCode"]]} />
                                            )
                                        }
                                    </div>
                                )
                            })
                        }

                    </div>
                )
            }
        </div>
    )
}

export default CheckStudent
