import { SingleWordModel } from '@/models/ResponseAudioData.model';
import React from 'react'

export const SingleWord = ({ Word, PronunciationAssessment }: SingleWordModel) => {

    const { AccuracyScore, ErrorType, Feedback } = PronunciationAssessment;

    const handleClassColor = () => {
        if (AccuracyScore < 70) {
            return 'text-red-500';
        }
        if (AccuracyScore < 90) {
            return 'text-orange-500';
        }
        return 'text-green-500';
    }

    return (
        <span className={'mr-2 font-bold text-lg ' + handleClassColor()}>
            {Word}
        </span>
    )
}
