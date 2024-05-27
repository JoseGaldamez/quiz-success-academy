'use client';

import React, { useState } from 'react';
import axios from "axios";

import { MicrophoneIcon } from '@heroicons/react/24/outline';
import { StopIcon, ArrowPathIcon } from '@heroicons/react/16/solid';

import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import { PrivPronJSON, ResponseAudioData } from '@/models/ResponseAudioData.model';
import { SingleWord } from './SingleWord';
import { RecordQuestionModel } from '@/models/question.model';
//import { SingleWord } from '../singleword/SingleWord';

interface IRecordQuestionProps {
    question: RecordQuestionModel,
    setButtonDisable: (v: boolean) => void,
    studentCode: string,
}

export const Recorder = ({ question, setButtonDisable, studentCode }: IRecordQuestionProps) => {


    const [resultData, setResultData] = useState<PrivPronJSON | undefined>();

    const [urlAudio, seturlAudio] = useState<string | undefined>();
    const [recording, setRecording] = useState<boolean>(false);
    const [validating, setValidating] = useState<boolean>(false);
    const [audioFile, setAudioFile] = useState<Blob | undefined>(undefined);

    const [recordState, setRecordState] = useState<any>(RecordState.STOP);


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
        // make a POST request to the File Upload API with the FormData object and Rapid API headers
        axios.post<ResponseAudioData>("/api/check-speech/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Cross-Origin-Opener-Policy": "same-origin",
            },
        })
            .then((response) => {
                // handle the response
                setResultData(response.data.result.privPronJson);
            })
            .catch((error) => {
                // handle errors
                console.log(error);
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
        <div className='pt-10 m-3 p-5 mx-auto max-w-xl flex flex-col'>
            <div>
                <AudioReactRecorder state={recordState} onStop={onStop} />
            </div>

            <section>
                <h3 className='text-xl font-bold mb-2'>Say:</h3>
                <p className='italic text-2xl'>{`"The cat is playing with the toy."`}</p>
            </section>

            <section className='mt-5'>
                <h3 className='text-xl font-bold mb-5'>Your result: {resultData ? resultData.PronunciationAssessment.AccuracyScore : '0'}%</h3>
                <div className='border-b-2 border-slate-700 mb-5'>

                    {
                        resultData && resultData.Words.map((word, index) => (
                            <SingleWord key={index} {...word} />
                        ))
                    }

                </div>

            </section>

            <section className='p-5 mx-auto max-w-lg flex flex-col justify-center text-center'>
                {
                    recording ?
                        (<button
                            className='bg-red-600 hover:bg-red-700 max-w-60 mx-auto transition-colors py-2 px-5 rounded-lg text-white text-center flex justify-center items-center gap-2'
                            onClick={stop}>
                            <StopIcon width={30} />
                            Stop recording</button>)
                        :
                        (<button
                            className='bg-orange-600 max-w-60 mx-auto hover:bg-orange-700 transition-colors py-2 px-5 rounded-lg text-white text-center flex justify-center items-center gap-2'
                            onClick={start}>
                            <MicrophoneIcon width={30} />
                            Start recording</button>
                        )
                }


            </section>

            <section className='p-5 justify-center text-center'>

                {
                    (urlAudio && !recording) && <audio src={urlAudio} controls />
                }
            </section>


            <section className='p-5 mx-auto max-w-lg flex flex-col justify-center text-center'>
                <button className='disabled:bg-slate-400 bg-blue-600 max-w-60 mx-auto hover:bg-blue-700 transition-colors py-2 px-5 rounded-lg text-white text-center flex justify-center items-center gap-2' disabled={audioFile === undefined} onClick={handleFileUpload}>Enviar audio</button>
            </section>

            <div>
                <pre>
                    {JSON.stringify(resultData, null, 2)}
                </pre>
            </div>

            {
                validating && (

                    <div className='fixed w-full h-dvh bg-white bg-opacity-70 top-0 left-0 flex justify-center'>
                        <ArrowPathIcon width={50} className='text-orange-500 animate-spin' />
                    </div>
                )
            }

        </div>
    )
}