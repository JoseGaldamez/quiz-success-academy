'use client';
import { OptionsModel, QuestionUniqueSelect } from '@/models/question.model'
import { updateStudentAnswers } from '@/services/students.service';
import React, { useEffect, useState } from 'react'

interface IUniqueSelectionQuestionProps {
    question: QuestionUniqueSelect,
    studentCode: string,
    setButtonDisable: (v: boolean) => void
}

export const UniqueSelectionQuestion = ({ question, studentCode, setButtonDisable }: IUniqueSelectionQuestionProps) => {

    const [correct, setCorrect] = useState(false);
    const [options, setOptions] = useState<OptionsModel[]>([]);

    useEffect(() => {
        setCorrect(false);
        setOptions([]);
        setTimeout(() => {
            setOptions(optionsList(question.options));
        }, 1);
        setButtonDisable(true);

    }, [question]);

    const questionTitleString = (title: string) => {
        return title.replaceAll('\\n', '<br />');
    }

    const optionsList = (options: any): OptionsModel[] => {

        if (options === undefined) {
            return [];
        }

        const optionsArray = Object.keys(options).map((index) => {
            return options[index];
        });
        return optionsArray;
    }

    const handleOptionChange = async (option: OptionsModel) => {
        setCorrect(option.correct);
        await updateStudentAnswers(studentCode, question.questionCode, option);
        setButtonDisable(false);
    }

    return (
        <div className='mb-10 border-b-2 pb-10'>
            <div className='text-left'>
                <span className='text-xl font-bold' dangerouslySetInnerHTML={{ __html: questionTitleString(question.title) }} ></span>
                {
                    correct && (
                        <span className='text-green-500 text-lg font-bold'>OK</span>
                    )
                }
            </div>

            {
                options.map((option, index) => {
                    return (
                        <div key={index} className='text-lg my-3'>
                            <input onChange={() => {
                                handleOptionChange(option);
                            }} type="radio" id={option.value}
                                name={question.title} value={option.value} />
                            <label className='pl-3' htmlFor={option.value}>
                                {option.index} {option.value}
                            </label>
                        </div>
                    )
                })
            }
        </div>
    )
}
