'use client';

import { DetailsQuestion } from '@/models/question.model'
import React, { useEffect } from 'react'

interface IUniqueSelectionQuestionProps {
    question: DetailsQuestion,
    setDisableButton: (value: boolean) => void
}

export const DetailsInfoQuestion = ({ question, setDisableButton }: IUniqueSelectionQuestionProps) => {

    const questionTitleString = (title: string) => {
        return title.replaceAll('\\n', '<br />');
    }

    useEffect(() => {
        setDisableButton(false);
    }, [setDisableButton]);

    return (
        <div>
            <div className='text-left'>
                <span className='text-xl font-bold' dangerouslySetInnerHTML={{ __html: questionTitleString(question.title) }} ></span>
            </div>
            <div className='mt-5'>
                <span className='text-lg font-bold'>{question.subtitle}</span>
            </div>
            <div className='my-5'>
                {
                    question.details.split('\\n').map((item, index) => {
                        return <p key={index} className='text-lg py-3'>{item}</p>
                    })
                }
            </div>
            <div className='mb-5'>
                <hr />
            </div>
        </div>
    )
}
