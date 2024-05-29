import React from 'react'
import { SingleWord } from '../question/SingleWord';
import { ApproveAndReject } from './ApproveAndReject';

interface CheckAnswerInputQuestionProps {
    answer?: any;
}

export const CheckAnswerInputQuestion = ({ answer }: CheckAnswerInputQuestionProps) => {
    return (
        <div className='flex justify-between items-center'>
            <div className='p-5'>

                <div className='mt-5'>
                    <h3>
                        {
                            answer && answer.answer
                        }
                    </h3>
                </div>

                <ApproveAndReject />

            </div>
            <div className='w-32 flex items-end'>
                {
                    <h3 className='text-lg font-bold w-full items-end text-right'>
                        {(answer && answer.successLevel) ? (`${answer.successLevel} %`) : ''}
                    </h3>
                }
            </div>
        </div>
    )
}
