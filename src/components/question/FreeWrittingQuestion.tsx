'use client';

import React, { useEffect, useState } from 'react'
import { FreeWrittingQuestionModel } from '@/models/question.model'
import { updateStudentAnswers } from '@/services/students.service';

interface IFreeWrittingQuestionProps {
    question: FreeWrittingQuestionModel,
    setButtonDisable: (v: boolean) => void,
    studentCode: string,
}

export const FreeWrittingQuestion = ({ question, setButtonDisable, studentCode }: IFreeWrittingQuestionProps) => {

    const [answer, setAnswer] = useState<string>("");
    const [answerSaved, setAnswerSaved] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            setAnswer("");
            setAnswerSaved(false);
            setButtonDisable(true);
        };
    }, [question]);

    const handleSaveAnswer = async () => {

        await updateStudentAnswers(studentCode, question.questionCode, {
            answer: answer,
            points: 0
        });

        setButtonDisable(false);
        setAnswerSaved(true);
    }

    return (
        <div>
            <div className='mb-5'>
                <p>{question.subtitle}</p>
            </div>
            <div className='mb-5'>
                <h3 className='text-xl font-bold'>{question.title}</h3>
            </div>
            <hr />
            <div>
                <textarea value={answer} onChange={
                    (e) => {
                        setAnswer(e.target.value);
                        setAnswerSaved(false);
                        setButtonDisable(true);
                    }
                } className='w-full p-2 border border-gray-300 rounded-lg mb-10 h-52' placeholder='Write your answer here' />
            </div>

            {
                answerSaved ? (
                    <div className='mb-10'>
                        <p>Your answer has been saved</p>
                    </div>
                ) : (
                    <div className='mb-10'>
                        <button disabled={answer.length === 0} className='bg-orange-600 hover:bg-orange-700 disabled:bg-orange-100 transition-colors py-2 px-5 rounded-lg text-white text-center flex justify-center items-center gap-2'
                            onClick={handleSaveAnswer}
                        >Save answer</button>
                    </div>
                )
            }
        </div>
    )
}

