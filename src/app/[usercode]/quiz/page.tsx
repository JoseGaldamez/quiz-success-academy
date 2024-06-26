'use client';

import { MenuBar } from '@/common/MenuBar'
import { QuestionsQuiz } from '@/components/question/QuestionQuiz';
import { useAppSelector } from '@/lib/store';
import { QuestionUniqueSelect } from '@/models/question.model';
import { updateStudentState } from '@/services/students.service';
import { StudentStates } from '@/types/studentStates.types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Quiz = () => {

    const router = useRouter();

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
            updateStudentState(currentStudent.code, StudentStates.IN_PROGRESS);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div>
            <MenuBar showRequestAccessButton={false} />

            <div className='max-w-3xl mx-auto py-10'>
                <QuestionsQuiz
                    questions={questions}
                    studentCode={currentStudent.code}
                    currentQuestion={currentStudent.currentQuestion} />
            </div>

        </div>
    )
}

export default Quiz