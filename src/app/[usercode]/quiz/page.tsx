'use client';

import { MenuBar } from '@/common/MenuBar'
import { QuestionsQuiz } from '@/components/question/QuestionQuiz';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { QuestionQuizModel } from '@/models/question.model';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Quiz = () => {

    const router = useRouter();

    const dispatch = useAppDispatch();
    const testCurrentUser = useAppSelector((state) => state.testCurrentUser);
    const questionsList = useAppSelector((state) => state.questions.list);

    const [questions, setQuestions] = useState<QuestionQuizModel[]>([]);

    useEffect(() => {
        console.log(questionsList);

        if (testCurrentUser.userCode === '') router.push('/');

        const indexList = Object.keys(questionsList);
        const questionsArray = indexList.map((index) => {
            return questionsList[index] as QuestionQuizModel;
        });
        setQuestions(questionsArray);

        // TODO: Add a timer for the quiz

    }, []);


    return (
        <div>
            <MenuBar showRequestAccessButton={false} />

            <div className='max-w-3xl mx-auto py-10'>
                <QuestionsQuiz questions={questions} />
            </div>

        </div>
    )
}

export default Quiz