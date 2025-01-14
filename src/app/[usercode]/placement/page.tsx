'use client';

import { MenuBar } from '@/common/MenuBar'
import { SET_LIST_QUESTIONS_STATE } from '@/lib/slices/questions';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { getAllQuestions } from '@/services/question.service';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const PlacementTest = () => {

    const dispatch = useAppDispatch();

    const currentStudent = useAppSelector((state) => state.currentStudent);
    const [checked, setChecked] = useState<Boolean>();
    const [questionsList, setQuestionsList] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        if (currentStudent.code === "") {
            router.push('/');
        } else {
            getQuestions();
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getQuestions = async () => {
        setLoading(true);
        const questions = await getAllQuestions();
        setQuestionsList(questions);
        setLoading(false);
    }

    const handleClickStartQuiz = async () => {
        if (loading) return;
        setLoading(true);


        if (!checked) return;

        dispatch(SET_LIST_QUESTIONS_STATE({ list: questionsList }));

        setLoading(false);
        // Redirect to the quiz page
        router.push(`/${currentStudent.code}/quiz`);
    }

    return (
        <div>
            <MenuBar showRequestAccessButton={false} />
            <div className='max-w-3xl mx-auto p-10'>

                <h1 className='text-3xl font-bold my-2'>SUCCESS ACADEMY ENGLISH PLACEMENT TEST</h1>
                <h2 className='py-5'>Hi <strong>{currentStudent.name}</strong>, thank you for choosing Success Academy to be part of your learning process, we’re thrilled to have you!</h2>
                <hr />

                <p className='text-red-700 font-bold'>
                    Instructions:
                </p>
                <h3 className='font-bold mt-5 mb-2'>
                    Step 1: Prepare for the placement test
                </h3>
                <p>
                    *You will have  a maximum of 90 minutes to answer 40 questions.
                </p>
                <p>
                    *You will only have one attempt on the placement test.
                </p>
                <p>
                    *You are not permitted to obtain assistance by improper means or ask for help from other person.
                </p>
                <p>
                    *You are not permitted to take screenshots, record the screen, copy and paste questions or answers or otherwise attempt to take any of the content of this exam out of the exam for any purpose.
                </p>
                <p>
                    *You are not permitted to post any requests for clarification of exam content. Answer all questions to the best of your ability and perception of the questions’ intent, make reasonable assumptions if necessary, to answer all questions.
                </p>
                <p>
                    * In case of external problems, please contact our offices within a considerable period of time.
                </p>

                <h3 className='font-bold mt-5 mb-2'>
                    Step 2:
                </h3>
                <p>
                    You will need to be in a quiet space for the duration of your exam with no interruptions.
                </p>

                <h3 className='font-bold mt-5 mb-2'>
                    Step 3:
                </h3>
                <p>
                    Check your computer to make sure you are able to take the online test
                    (Your computer must meet the technical requirements for testing).
                </p>

                <h3 className='font-bold mt-5 mb-2'>
                    System requirements are:
                </h3>
                <p>
                    1. Desktop computer, laptop, tablet, or cell phone.
                </p>
                <p>
                    2. A working microphone.
                </p>
                <p>
                    3. Hot spots are not recommended. Test internet speed online.
                </p>

                <h3 className='font-bold mt-5 mb-2'>
                    Step 4: Student declaration
                </h3>
                <p>
                    By attempting this exam, I acknowledge that:
                </p>
                <p>
                    I agree to be bound by the academy’s rules, codes of conduct, and other policies relating to examinations.
                </p>
                <p>
                    I have read and understand the examination conduct requirements for this exam.
                </p>
                <p>
                    I am aware of the academy’s rules regarding misconduct during examinations.
                </p>
                <p>
                    I am not in possession of, nor do I have access to, any unauthorised material during this examination.
                </p>
                <hr className='mt-10' />
                <p className='my-10'>
                    <input onChange={(value) => {
                        setChecked(value.target.checked || false);
                    }} className='text-2xl' type="checkbox" id='acceptPlacementCheck' name='acceptPlacementCheck' />
                    <label className='ml-2 text-xl' htmlFor="acceptPlacementCheck">I agree and accept the conditions.</label>
                </p>

                <button onClick={handleClickStartQuiz} disabled={!checked} className={`bg-blue-500 disabled:bg-slate-600 hover:bg-blue-700 text-lg text-white font-bold py-2 px-4 rounded mb-36 w-full`}>
                    {loading ? 'Loading...' : 'Start Test'}
                </button>

            </div>

        </div>
    )
}

export default PlacementTest