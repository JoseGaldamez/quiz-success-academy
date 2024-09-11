import { StudentInformation } from '@/models/student.model'
import { listOfComprehensionQuestions, listOfGrammarQuestions, listOfSpeakingQuestions, listOfWrittingQuestions } from '@/types/listQuestionsByType'
import { StudentStates } from '@/types/studentStates.types'
import React, { useState } from 'react'

export const PointByCategory = ({ user }: { user: StudentInformation }) => {

    return (
        <div >

            <h2 className='mt-10 text-xl font-bold border-b-2 border-orange-500' >Point by Category</h2>
            <hr />

            <div className='flex justify-between items-center'>
                <div className='p-5'>
                    <p>
                        <span className='font-bold'>Grammar:  </span>{getTotalPointOfGrammar(user.answers)} / {listOfGrammarQuestions.length}
                    </p>
                    <p>
                        <span className='font-bold'>Comprehension:  </span>{getTotalPointOfComprehension(user.answers)} / {listOfComprehensionQuestions.length}
                    </p>
                    <p>
                        <span className='font-bold'>Speaking:  </span>{getTotalPointOfSpeaking(user.answers)} / {listOfSpeakingQuestions.length}
                    </p>
                    <p>
                        <span className='font-bold'>Writting:  </span>{getTotalPointOfWritting(user.answers)} / {listOfWrittingQuestions.length}
                    </p>
                </div>
                <div>
                    <span className='text-2xl font-bold text-orange-500 mr-5'>{getTotal(user.answers)} / 50</span>
                </div>
            </div>
            <hr />



            <div>

            </div>

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

const getTotal = (answers: any) => {

    const allKeys = Object.keys(answers);
    let total: number = 0;

    allKeys.forEach(anwerKey => {
        const answer = answers[anwerKey];
        total += answer.points;
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