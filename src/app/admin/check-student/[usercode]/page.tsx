'use client';

import React, { useEffect, useState } from 'react'
import { SET_USER_STATE, UPDATE_ANSWER } from '@/lib/slices/currentStudent';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { StudentInformation } from '@/models/student.model';
import { getStudentByCode, updateStudentAnswers } from '@/services/students.service';
import { HeaderCheckStudent } from '@/components/check/HeaderCheckStudent';
import { getAllQuestions } from '@/services/question.service';
import { questionTypes } from '@/types/questions.types';
import { CheckAnswerUniqueQuestion } from '@/components/check/CheckAnswerUniqueQuestion';
import { CheckAnswerRecordedQuestion } from '@/components/check/CheckAnswerRecordedQuestion';
import { CheckAnswerInputQuestion } from '@/components/check/CheckAnswerInputQuestion';
import { PointByCategory } from '@/components/check/PointsByCategory';
import { ExamCallAndComment } from '@/components/check/ExamCallAndComment';
import Link from 'next/link';
import { SACComments } from '@/components/check/SACComments';

const CheckStudent = ({ params }: { params: { usercode: string } }) => {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.currentStudent);
    const auth = useAppSelector((state) => state.auth);


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
        await updateStudentAnswers(user.code, question, newAnswer);

    }

    const countPoints = () => {
        let points = 0;


        if (user.answers === undefined) {
            return 0;
        }

        Object.keys(user.answers).forEach((key) => {
            points += user.answers[key].points;
        });

        return points;
    }

    return (
        <div className='max-w-5xl mt-10 mx-auto py-10'>
            {
                loading && <p>Cargando...</p>
            }
            {
                (user.code !== "") && (
                    <div className='px-10'>

                        <span className='text-lg font-bold w-10 h-10 flex justify-center items-center bg-orange-500 text-white rounded-full fixed bottom-10 left-10'>
                            <Link href={"/admin/home"}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg></Link>
                        </span>

                        <HeaderCheckStudent user={user} />

                        {
                            user.dateToCall && (
                                <div className='flex justify-between mt-10 mb-10 bg-blue-50 p-10 rounded-lg'>
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

                        {
                            user.answers && (
                                <PointByCategory user={user} />
                            )
                        }

                        <ExamCallAndComment user={user} />

                        {
                            auth.email === "sac@successacademyhn.com" && (
                                <SACComments user={user} />
                            )
                        }


                        <h3 className='mt-10 text-xl font-bold border-b-2 border-orange-500'>Answers</h3>
                        {
                            questionsList.map((question, index) => {
                                return (
                                    <div key={index} className='p-5 my-5 border-b border-slate-400'>
                                        <h3 className='text-lg font-bold'>{index + 1}- {question.title}</h3>
                                        {
                                            (question.type === questionTypes.DETAILS && user.answers && user.answers[question["questionCode"]]) && (
                                                <div className='w-full mt-10 border-b-4 border-orange-700'></div>
                                            )
                                        }
                                        {
                                            (question.type === questionTypes.UNIQUE_SELECTION && user.answers && user.answers[question["questionCode"]]) && (
                                                <CheckAnswerUniqueQuestion answer={user.answers[question["questionCode"]]} />
                                            )
                                        }
                                        {
                                            (question.type === questionTypes.RECORD && user.answers && user.answers[question["questionCode"]]) && (
                                                <CheckAnswerRecordedQuestion
                                                    questionCode={question["questionCode"]}
                                                    updateCheckAnwer={updateCheckAnwer} answer={user.answers[question["questionCode"]]} />
                                            )
                                        }
                                        {
                                            (question.type === questionTypes.WRITTING && user.answers && user.answers[question["questionCode"]]) && (
                                                <CheckAnswerInputQuestion
                                                    questionCode={question["questionCode"]}
                                                    updateCheckAnwer={updateCheckAnwer}
                                                    answer={user.answers[question["questionCode"]]} />
                                            )
                                        }
                                        {
                                            (question.type === questionTypes.FREE_WRITE && user.answers && user.answers[question["questionCode"]]) && (
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

                            {
                                user.answers && (
                                    <PointByCategory user={user} />
                                )
                            }

                            <p className='mt-5'>
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
