'use client';


import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaMicrophone } from 'react-icons/fa'
import { IoStopCircleOutline } from 'react-icons/io5'

import AudioReactRecorder, { RecordState } from 'audio-react-recorder';

import { PrivPronJSON, ResponseAudioData } from '@/models/ResponseAudioData.model';
import { SingleWord } from './SingleWord';
import { updateAudioFile, updateStudentAnswers } from '@/services/students.service';
import { questionTypes } from '@/types/questions.types';
import { RecordQuestionModel } from '@/models/question.model'
import { GrInProgress } from 'react-icons/gr';
import { ArrowPathIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';


interface IRecordQuestionProps {
    question: RecordQuestionModel,
    setButtonDisable: (v: boolean) => void,
    studentCode: string,
}

export const RecordQuestion = ({ question, setButtonDisable, studentCode }: IRecordQuestionProps) => {

    const [urlAudio, seturlAudio] = useState<string | undefined>();
    const [recording, setRecording] = useState<boolean>(false);
    const [validating, setValidating] = useState<boolean>(false);
    const [audioFile, setAudioFile] = useState<Blob | undefined>(undefined);

    const [resultData, setResultData] = useState<PrivPronJSON | undefined>();

    const [recordState, setRecordState] = useState<any>(RecordState.STOP);


    useEffect(() => {
        // setButtonDisable(true);
        return () => {
            seturlAudio(undefined);
            setRecording(false);
            setRecordState(RecordState.STOP);
            setAudioFile(undefined);
            setResultData(undefined);
            setButtonDisable(true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question]);



    // send file
    const handleFileUpload = async () => {

        const file = audioFile;

        if (!file) {
            return;
        }

        setValidating(true);

        // create a new FormData object and append the file to it
        const formData = new FormData();
        formData.append("file", file!);
        formData.append("questionCode", question.questionCode);
        formData.append("studentCode", studentCode);
        formData.append("phase", question.title);

        // make a POST request to the File Upload API with the FormData object and Rapid API headers
        axios.post<ResponseAudioData>("/api/check-speech/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Cross-Origin-Opener-Policy": "same-origin",
            },
        })
            .then(async (response) => {
                // handle the response
                setResultData(response.data.result.privPronJson);

                if (response.data.urlAudio !== null) {

                    await updateStudentAnswers(studentCode, question.questionCode, {
                        type: questionTypes.RECORD,
                        response: response.data.result.privPronJson,
                        urlAudio: response.data.urlAudio
                    });

                    setButtonDisable(false);
                }
                // TODO: Save response on firebase
            })
            .catch((error) => {
                // handle errors
                console.error(error);
            }).finally(() => {
                setValidating(false);
            });
    };


    const start = () => {
        setRecording(true);
        setRecordState(RecordState.START);
    }

    const stop = () => {
        setRecording(false);
        setRecordState(RecordState.STOP);
    }

    const onStop = (audioData: any) => {
        seturlAudio(audioData.url);
        setAudioFile(audioData.blob);
        setRecording(false);
    }

    return (
        <div>
            <div>
                <AudioReactRecorder state={recordState} onStop={onStop} />
            </div>
            <p>{question.subtitle}</p>
            <h3 className='mt-5 text-xl font-bold'>{question.title}</h3>
            <hr />
            <section className='p-5 mx-auto max-w-lg flex flex-col justify-center text-center'>
                {
                    recording ?
                        (<button
                            className='bg-red-600 hover:bg-red-700 max-w-60 mx-auto transition-colors py-2 px-5 rounded-lg text-white text-center flex justify-center items-center gap-2'
                            onClick={stop}>
                            <IoStopCircleOutline width={30} />
                            Stop recording</button>)
                        :
                        (<button
                            disabled={resultData !== undefined}
                            className='bg-orange-600 max-w-60 mx-auto hover:bg-orange-700 disabled:bg-slate-200 transition-colors py-2 px-5 rounded-lg text-white text-center flex justify-center items-center gap-2'
                            onClick={start}>
                            <FaMicrophone width={30} />
                            Start recording</button>
                        )
                }


            </section>

            <section className='p-5 text-center items-center justify-center'>
                {
                    (urlAudio && !recording) && <audio src={urlAudio} controls />
                }
            </section>

            <section className='my-10'>


                <button disabled={!urlAudio || resultData !== undefined || validating} className='disabled:bg-slate-300 bg-blue-950 text-white rounded py-2 px-5 ' onClick={handleFileUpload}>
                    {validating ? <span className='flex gap-2'>
                        <ArrowPathIcon width={20} height={20} className='animate-spin' /> Saving
                    </span> : <span className='flex gap-2'>
                        <ArrowUpTrayIcon width={20} height={20} /> Save Answer
                    </span>}
                </button>
            </section>


            <section className='mt-5'>
                {/* <h3 className='text-xl font-bold mb-5'>Your result: {resultData ? resultData.PronunciationAssessment.AccuracyScore : '0'}%</h3> */}
                <div className='border-b-2 mb-5'>

                    {
                        resultData && resultData.Words.map((word, index) => (
                            <SingleWord key={index} {...word} />
                        ))
                    }

                </div>

            </section>

        </div>
    )
}
