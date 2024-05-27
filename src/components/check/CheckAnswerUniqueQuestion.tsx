import React from 'react'

interface CheckAnswerUniqueQuestionProps {
    answer?: any;
}

export const CheckAnswerUniqueQuestion = ({ answer }: CheckAnswerUniqueQuestionProps) => {
    return (
        <div className='flex justify-between items-center'>
            <p className='py-10'>
                Response:
                <span className={answer?.correct ? "text-green-600 font-bold px-2" : "text-red-600 px-2"}>
                    {answer?.value}
                </span>
            </p>
            <p>
                <strong>Point: </strong>
                {answer?.points}
            </p>
        </div>
    )
}
