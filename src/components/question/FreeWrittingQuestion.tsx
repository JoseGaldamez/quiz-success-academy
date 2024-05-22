'use client';

import React, { useEffect, useState } from 'react'
import { FreeWrittingQuestionModel } from '@/models/question.model'

interface IFreeWrittingQuestionProps {
    question: FreeWrittingQuestionModel
}

export const FreeWrittingQuestion = ({ question }: IFreeWrittingQuestionProps) => {

    const [answer, setAnswer] = useState<string>("");

    useEffect(() => {
        return () => {
            setAnswer("");
        };
    }, [question]);

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
                    }
                } className='w-full p-2 border border-gray-300 rounded-lg mb-10 h-52' placeholder='Write your answer here' />
            </div>
        </div>
    )
}

