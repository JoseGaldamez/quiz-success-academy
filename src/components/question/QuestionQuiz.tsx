import { QuestionUniqueSelect } from '@/models/question.model';
import { questionTypes } from '@/types/questions.types';
import React, { useEffect, useState } from 'react'
import { UniqueSelectionQuestion } from './UniqueSelectionQuestion';
import { DetailsInfoQuestion } from './DetailsInfoQuestion';
import { RecordQuestion } from './RecordQuestion';
import { WrittingQuestion } from './WrittingQuestion';
import { FreeWrittingQuestion } from './FreeWrittingQuestion';

interface IQuestionQuizProps {
    questions: any[];
    studentCode: string;
}

export const QuestionsQuiz = ({ questions, studentCode }: IQuestionQuizProps) => {

    const [questionSelected, setQuestionSelected] = useState<number>(0);
    const [buttonDisable, setButtonDisable] = useState(true);

    const questionTypeString = (type: string) => {
        switch (type) {
            case questionTypes.UNIQUE_SELECTION:
                return 'Unique selection';
            case questionTypes.DETAILS:
                return 'Details Reading';
            case questionTypes.MULTIPLE_SELECTION:
                return 'Multiple selection';
            case questionTypes.FREE_WRITE:
                return 'Free write';
            case questionTypes.WRITTING:
                return 'Writting';
            case questionTypes.RECORD:
                return 'Record';
            default:
                return 'Unknown';
        }
    }

    if (questions.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div className='p-5'>

            {/* Question type */}
            <div className='border-orange-500 border-b-4 mb-5'>
                <h3 className='text-base font-bold'>Question ( {questionSelected + 1}/{questions.length} ) - {questionTypeString(questions[questionSelected].type)}</h3>
            </div>

            {
                questions[questionSelected].type === questionTypes.UNIQUE_SELECTION && (
                    <UniqueSelectionQuestion
                        question={questions[questionSelected]} studentCode={studentCode} setButtonDisable={(v: boolean) => setButtonDisable(v)} />
                )
            }

            {
                questions[questionSelected].type === questionTypes.DETAILS && (
                    <DetailsInfoQuestion question={questions[questionSelected]} />
                )
            }

            {
                questions[questionSelected].type === questionTypes.RECORD && (
                    <RecordQuestion
                        question={questions[questionSelected]} studentCode={studentCode}
                        setButtonDisable={(v: boolean) => setButtonDisable(v)} />
                )
            }

            {
                questions[questionSelected].type === questionTypes.WRITTING && (
                    <WrittingQuestion
                        question={questions[questionSelected]}
                        studentCode={studentCode}
                        setButtonDisable={(v: boolean) => setButtonDisable(v)} />
                )
            }


            {
                questions[questionSelected].type === questionTypes.FREE_WRITE && (
                    <FreeWrittingQuestion question={questions[questionSelected]} />
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
                    }} disabled={buttonDisable} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-400 '>
                        {
                            questionSelected === questions.length - 1 ? 'Finalizar' : 'Siguiente'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
