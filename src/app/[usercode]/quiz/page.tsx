'use client';

import { MenuBar } from '@/common/MenuBar'
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Quiz = () => {

    const router = useRouter();

    const dispatch = useAppDispatch();
    const testCurrentUser = useAppSelector((state) => state.testCurrentUser);
    const questionsList = useAppSelector((state) => state.questions.list);

    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        console.log(questionsList);

        if (testCurrentUser.userCode === '') router.push('/');

        const indexList = Object.keys(questionsList);
        const questionsArray = indexList.map((index) => questionsList[index]);
        setQuestions(questionsArray);

        // TODO: Add a timer for the quiz

    }, []);


    return (
        <div>
            <MenuBar showRequestAccessButton={false} />

            <div className='max-w-3xl mx-auto py-10'>

                { // TODO: Create components for every type of question
                    questions.map((question, index) => (
                        <div key={index} className='my-5'>
                            <h3 className='font-bold text-lg'>{index + 1}. {question.title}</h3>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default Quiz