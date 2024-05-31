'use client';

import React, { useEffect, useState } from 'react'
import { WrittingQuestionModel } from '@/models/question.model'
import { updateStudentAnswers } from '@/services/students.service';

interface IWrittingQuestionProps {
    question: WrittingQuestionModel,
    setButtonDisable: (v: boolean) => void,
    studentCode: string,
}

export const WrittingQuestion = ({ question, setButtonDisable, studentCode }: IWrittingQuestionProps) => {

    const [answer, setAnswer] = useState<string>("");
    const [successLevel, setSuccessLevel] = useState<number>(0);
    const [answerSaved, setAnswerSaved] = useState<boolean>(false);


    useEffect(() => {
        return () => {
            setAnswer("");
            setSuccessLevel(0);
            setAnswerSaved(false);
            setButtonDisable(true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question]);


    const handleSaveAnswer = async () => {

        await updateStudentAnswers(studentCode, question.questionCode, {
            answer: answer,
            successLevel: successLevel.toFixed(2),
            points: 0
        });

        setButtonDisable(false);
        setAnswerSaved(true);
    }

    return (
        <div>
            <div className='mb-5'>
                <p>{question.subtitle}</p>
            </div>
            <div className='mb-5'>
                <h3 className='text-xl font-bold'>{question.title}</h3>
            </div>
            <hr />
            <div>
                <input value={answer} onChange={
                    (e) => {
                        setAnswer(e.target.value);
                        const wrotten = e.target.value.trim()
                            .toLowerCase()
                            .replaceAll(",", "")
                            .replaceAll(".", "")
                            .replaceAll(";", "")
                            .replaceAll(":", "")
                            .replaceAll("!", "")
                            .replaceAll("?", "")
                            .replaceAll("¿", "")
                            .replaceAll("¡", "")
                            .replaceAll("á", "a")
                            .replaceAll("é", "e")
                            .replaceAll("í", "i")
                            .replaceAll("ó", "o")
                            .replaceAll("ú", "u")
                            .replaceAll("ü", "u")
                            .replaceAll("'", "")
                            .replaceAll("´", "")

                        const result = similarity(wrotten, question.correct);
                        setSuccessLevel(result * 100);
                        setAnswerSaved(false);
                        setButtonDisable(true);

                    }
                } type="text" className='w-full p-2 border border-gray-300 rounded-lg mb-10' placeholder='Write your answer here' />
            </div>

            {
                answerSaved ? (
                    <div className='mb-10'>
                        <p>Your answer has been saved</p>
                    </div>
                ) : (
                    <div className='mb-10'>
                        <button disabled={answer.length === 0} className='bg-orange-600 hover:bg-orange-700 disabled:bg-orange-100 transition-colors py-2 px-5 rounded-lg text-white text-center flex justify-center items-center gap-2'
                            onClick={handleSaveAnswer}
                        >Save answer</button>
                    </div>
                )
            }


            {/* <div>
                <h3 className='text-xl font-bold mb-5'>Your result: {successLevel.toFixed(2)}%</h3>
            </div> */}
        </div>
    )
}


function similarity(s1: string, s2: string) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength.toString());
}

function editDistance(s1: string, s2: string) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}