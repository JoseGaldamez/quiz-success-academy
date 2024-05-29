import React from 'react'
import { SingleWord } from '../question/SingleWord';
import { ApproveAndReject } from './ApproveAndReject';

interface CheckAnswerRecordedQuestionProps {
    answer?: any;
}

export const CheckAnswerRecordedQuestion = ({ answer }: CheckAnswerRecordedQuestionProps) => {
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

                <ApproveAndReject />

            </div>
            <div>
                <h3 className='text-lg font-bold'>Result: {answer ? answer.response.PronunciationAssessment.AccuracyScore : '0'}%</h3>
            </div>
        </div>
    )
}
