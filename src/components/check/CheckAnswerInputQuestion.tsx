import React from 'react'
import { SingleWord } from '../question/SingleWord';
import { ApproveAndReject } from './ApproveAndReject';
import { useAppSelector } from '@/lib/store';

interface CheckAnswerInputQuestionProps {
    answer?: any;
    updateCheckAnwer: (question: string, checked: boolean) => void;
    questionCode: string;
}

export const CheckAnswerInputQuestion = ({ answer, updateCheckAnwer, questionCode }: CheckAnswerInputQuestionProps) => {

    const auth = useAppSelector((state) => state.auth);

    const updateThisQuestion = (checked: boolean) => {
        updateCheckAnwer(questionCode, checked);
    }

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

                {
                    (answer?.checked !== undefined) ? (
                        <p className={answer.checked ? 'text-green-600 p-2 w-24 text-center rounded bg-green-100 mt-5' : 'text-red-600 p-2 w-24 text-center rounded bg-red-100 mt-5'}>
                            Checked
                        </p>
                    ) : (
                        <p></p>
                    )
                }

                {
                    auth.email !== "guest@successacademyhn.com" && (
                        <ApproveAndReject updateCheckAnwer={updateThisQuestion} />
                    )
                }

            </div>
            <div className='w-32 flex items-end'>

                {
                    (answer?.checked !== undefined) ? (
                        <h3 className='text-lg font-bold w-full items-end text-right'>
                            Points: {answer?.points}
                        </h3>
                    ) : (
                        <h3 className='text-lg font-bold w-full items-end text-right'>
                            {(answer && answer.successLevel) ? (`${answer.successLevel} %`) : ''}
                        </h3>
                    )
                }
                {
                }
            </div>
        </div>
    )
}
