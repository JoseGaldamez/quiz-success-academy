import { StudentInformation } from '@/models/student.model'
import { listOfComprehensionQuestions, listOfGrammarQuestions, listOfSpeakingQuestions, listOfWrittingQuestions } from '@/types/listQuestionsByType'
import React from 'react'

export const PointByCategory = ({ user }: { user: StudentInformation }) => {
    return (
        <div >

            <h2 className='text-lg font-bold' >Point by Category</h2>
            <hr />

            <div className='p-5'>
                <p>
                    <span className='font-bold'>Grammar:  </span>{getTotalPointOfGrammar(user.answers)}
                </p>
                <p>
                    <span className='font-bold'>Comprehension:  </span>{getTotalPointOfComprehension(user.answers)}
                </p>
                <p>
                    <span className='font-bold'>Speaking:  </span>{getTotalPointOfSpeaking(user.answers)}
                </p>
                <p>
                    <span className='font-bold'>Writting:  </span>{getTotalPointOfWritting(user.answers)}
                </p>
            </div>
            <hr />

        </div>
    )
}

const getTotalPointOfGrammar = (answers: any) => {

    const allKeys = Object.keys(answers);
    let total: number = 0;

    allKeys.forEach(anwerKey => {
        if (listOfGrammarQuestions.includes(anwerKey)) {
            const answer = answers[anwerKey];
            total += answer.points;
        }
    })

    return total;
}

const getTotalPointOfComprehension = (answers: any) => {

    const allKeys = Object.keys(answers);
    let total: number = 0;

    allKeys.forEach(anwerKey => {
        if (listOfComprehensionQuestions.includes(anwerKey)) {
            const answer = answers[anwerKey];
            total += answer.points;
        }
    })

    return total;
}

const getTotalPointOfSpeaking = (answers: any) => {

    const allKeys = Object.keys(answers);
    let total: number = 0;

    allKeys.forEach(anwerKey => {
        if (listOfSpeakingQuestions.includes(anwerKey)) {
            const answer = answers[anwerKey];
            total += answer.points;
        }
    })

    return total;
}

const getTotalPointOfWritting = (answers: any) => {

    const allKeys = Object.keys(answers);
    let total: number = 0;

    allKeys.forEach(anwerKey => {
        if (listOfWrittingQuestions.includes(anwerKey)) {
            const answer = answers[anwerKey];
            total += answer.points;
        }
    })

    return total;
}