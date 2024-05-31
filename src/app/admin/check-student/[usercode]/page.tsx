'use client';

import React, { useEffect, useState } from 'react'
import { SET_USER_STATE, UPDATE_ANSWER } from '@/lib/slices/currentStudent';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { StudentInformation } from '@/models/student.model';
import { getStudentByCode, updateStudentAnswers } from '@/services/students.service';
import { HeaderCheckStudent } from '@/components/check/HeaderCheckStudent';
import { getAllQuestions } from '@/services/question.service';
import { list } from '@firebase/storage';
import { listenerCount } from 'process';
import { questionTypes } from '@/types/questions.types';
import { CheckAnswerUniqueQuestion } from '@/components/check/CheckAnswerUniqueQuestion';
import { CheckAnswerRecordedQuestion } from '@/components/check/CheckAnswerRecordedQuestion';
import { CheckAnswerInputQuestion } from '@/components/check/CheckAnswerInputQuestion';
import { set } from 'lodash';

const CheckStudent = ({ params }: { params: { usercode: string } }) => {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.currentStudent);

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
            //setUser(null);
            return;
        }

        if (student === undefined) {
            setLoading(false);
            //setUser(null);
            return;
        }
        //setUser(student);
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

        setQuestionsList(list);
    }

    const updateCheckAnwer = async (question: string, checked: boolean) => {

        const newAnswer = {
            ...user.answers[question],
            checked,
            points: checked ? 1 : 0
        };

        dispatch(UPDATE_ANSWER({ questionCode: question, answer: newAnswer }));
        const response = await updateStudentAnswers(user.code, question, newAnswer);
        console.log({ response });


    }

    const countPoints = () => {
        let points = 0;
        Object.keys(user.answers).forEach((key) => {
            points += user.answers[key].points;
        });

        return points;
    }

    return (
        <div className='max-w-5xl mt-10 mx-auto px-10'>
            {
                loading && <p>Cargando...</p>
            }
            {
                (user.code !== "") && (
                    <div className='px-10'>
                        <HeaderCheckStudent user={user} />

                        {
                            user.dateToCall && (
                                <div className='flex justify-between mt-10 mb-20 bg-blue-50 p-10 rounded-lg'>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-lg font-bold'>Date to call:</p>
                                        <p>{user.dateToCall.date}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-lg font-bold'>Hour:</p>
                                        <p>{user.dateToCall.hour}</p>
                                    </div>
                                </div>
                            )
                        }

                        <h3 className='mt-10 text-xl font-bold border-b-2 border-orange-500'>Answers</h3>
                        {
                            questionsList.map((question, index) => {
                                return (
                                    <div key={index} className='p-5 my-5 border-b border-slate-400'>
                                        <h3 className='text-lg font-bold'>{index + 1}- {question.title}</h3>
                                        {
                                            question.type === questionTypes.DETAILS && (
                                                <div className='w-full mt-10 border-b-4 border-orange-700'></div>
                                            )
                                        }
                                        {
                                            question.type === questionTypes.UNIQUE_SELECTION && (
                                                <CheckAnswerUniqueQuestion answer={user.answers[question["questionCode"]]} />
                                            )
                                        }
                                        {
                                            question.type === questionTypes.RECORD && (
                                                <CheckAnswerRecordedQuestion
                                                    questionCode={question["questionCode"]}
                                                    updateCheckAnwer={updateCheckAnwer} answer={user.answers[question["questionCode"]]} />
                                            )
                                        }
                                        {
                                            question.type === questionTypes.WRITTING && (
                                                <CheckAnswerInputQuestion
                                                    questionCode={question["questionCode"]}
                                                    updateCheckAnwer={updateCheckAnwer}
                                                    answer={user.answers[question["questionCode"]]} />
                                            )
                                        }
                                        {
                                            question.type === questionTypes.FREE_WRITE && (
                                                <CheckAnswerInputQuestion questionCode={question["questionCode"]}
                                                    updateCheckAnwer={updateCheckAnwer} answer={user.answers[question["questionCode"]]} />
                                            )
                                        }
                                    </div>
                                )
                            })
                        }

                        <div className='p-10 mb-60 text-center'>
                            <p>
                                All the questions hava been checked, the student has a total of:
                            </p>
                            <p className='text-3xl font-bold m-10' >
                                {countPoints()} points
                            </p>
                            <p>
                                Next Step:
                            </p>

                            {
                                user.dateToCall && (
                                    <div className='flex justify-between mt-10 mb-20 bg-blue-50 p-10 rounded-lg'>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-lg font-bold'>Date to call:</p>
                                            <p>{user.dateToCall.date}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-lg font-bold'>Hour:</p>
                                            <p>{user.dateToCall.hour}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-lg font-bold'>Phone:</p>
                                            <p>{user.phone}</p>
                                        </div>
                                    </div>
                                )
                            }

                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default CheckStudent
