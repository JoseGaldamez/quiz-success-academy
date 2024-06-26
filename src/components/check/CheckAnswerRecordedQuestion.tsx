import React from 'react'
import { SingleWord } from '../question/SingleWord';
import { ApproveAndReject } from './ApproveAndReject';

interface CheckAnswerRecordedQuestionProps {
    answer?: any;
    updateCheckAnwer: (question: string, checked: boolean) => void;
    questionCode: string;
}

export const CheckAnswerRecordedQuestion = ({ answer, updateCheckAnwer, questionCode }: CheckAnswerRecordedQuestionProps) => {

    const updateThisQuestion = (checked: boolean) => {
        updateCheckAnwer(questionCode, checked);
    }

    return (
        <div className='flex justify-between items-center'>
            <div className='p-5'>
                <div>

                    {
                        answer && answer.response.Words.map((word: any, index: number) => (
                            <SingleWord key={index} {...word} />
                        ))
                    }
                </div>
                <div className='mt-5'>
                    <audio src={answer ? answer.urlAudio : ''} controls />
                </div>

                {
                    (answer?.checked !== undefined) ? (
                        <p className={answer.checked ? 'text-green-600' : 'text-red-600'}>
                            Checked
                        </p>
                    ) : (
                        <ApproveAndReject updateCheckAnwer={updateThisQuestion} />
                    )
                }


            </div>
            <div>
                {
                    (answer?.checked !== undefined) ? (
                        <h3 className='text-lg font-bold'>Point: {answer?.points}</h3>
                    ) : (
                        <h3 className='text-lg font-bold'>Result: {answer ? answer.response.PronunciationAssessment.AccuracyScore : '0'}%</h3>
                    )
                }
            </div>
        </div>
    )
}
