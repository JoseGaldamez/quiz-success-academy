'use client';

import { MenuBar } from '@/common/MenuBar'
import { QuestionsQuiz } from '@/components/question/QuestionQuiz';
import { SET_INIT_TIMER_DATE } from '@/lib/slices/currentStudent';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { QuestionUniqueSelect } from '@/models/question.model';
import { initQuizStudent, updateStudentState } from '@/services/students.service';
import { StudentStates } from '@/types/studentStates.types';
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
            initQuiz(currentStudent.code, StudentStates.IN_PROGRESS);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initQuiz = async (code: string, status: StudentStates) => {
        await updateStudentState(code, status);
        if (currentStudent.initedQuizDate === undefined) {
            await initQuizStudent(code)
            dispatch(SET_INIT_TIMER_DATE(new Date()));
        }
    }


    return (
        <div>
            <MenuBar
                showRequestAccessButton={false}
                timerInitDate={currentStudent.initedQuizDate} />

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