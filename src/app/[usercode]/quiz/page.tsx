'use client';

import { MenuBar } from '@/common/MenuBar'
import { QuestionsQuiz } from '@/components/question/QuestionQuiz';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { QuestionUniqueSelect } from '@/models/question.model';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Quiz = () => {

    const router = useRouter();

    const dispatch = useAppDispatch();
    const currentStudent = useAppSelector((state) => state.currentStudent);
    const questionsList = useAppSelector((state) => state.questions.list);

    const [questions, setQuestions] = useState<QuestionUniqueSelect[]>([]);

    useEffect(() => {
        if (currentStudent.code === '') {
            router.push('/');
        } else {
            const indexList = Object.keys(questionsList);
            const questionsArray = indexList.map((index) => {
                return questionsList[index] as QuestionUniqueSelect;
            });
            setQuestions(questionsArray);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div>
            <MenuBar showRequestAccessButton={false} />

            <div className='max-w-3xl mx-auto py-10'>
                <QuestionsQuiz questions={questions} studentCode={currentStudent.code} />
            </div>

        </div>
    )
}

export default Quiz