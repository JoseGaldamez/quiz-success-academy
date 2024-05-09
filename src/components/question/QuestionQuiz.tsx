import { QuestionQuizModel } from '@/models/question.model';
import { questionTypes } from '@/types/questions.types';
import React, { useEffect, useState } from 'react'
import { UniqueSelectionQuestion } from './UniqueSelectionQuestion';

interface IQuestionQuizProps {
    questions: QuestionQuizModel[];
}

export const QuestionsQuiz = ({ questions }: IQuestionQuizProps) => {

    const [questionSelected, setQuestionSelected] = useState<number>(0);

    useEffect(() => {
        console.log(questions[questionSelected]);

    }, []);

    const questionTypeString = (type: string) => {
        switch (type) {
            case questionTypes.UNIQUE_SELECTION:
                return 'Unique selection';
            case questionTypes.MULTIPLE_SELECTION:
                return 'Multiple selection';
            case questionTypes.READING_MULTIPLE:
                return 'Reading';
            case questionTypes.WRITTING_MULTIPLE:
                return 'Writting';
            default:
                return 'Unknown';
        }
    }

    if (questions.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div>

            {/* Question type */}
            <div className='border-orange-500 border-b-4 mb-5'>
                <h3 className='text-base font-bold'>Question ( {questionSelected + 1}/24 ) - {questionTypeString(questions[questionSelected].type)}</h3>
            </div>

            {
                questions[questionSelected].type === questionTypes.UNIQUE_SELECTION && (
                    <UniqueSelectionQuestion question={questions[questionSelected]} />
                )
            }


            {/* Botones anterior y siguiente */}
            <div>
                <div className='flex justify-between'>
                    <button onClick={() => {
                        if (questionSelected > 0) {
                            setQuestionSelected(questionSelected - 1);
                        }
                    }}
                        className='bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'>Anterior</button>

                    <button onClick={() => {
                        if (questionSelected < questions.length - 1) {
                            setQuestionSelected(questionSelected + 1);
                        }
                    }} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'>Siguiente</button>
                </div>
            </div>
        </div>
    )
}
