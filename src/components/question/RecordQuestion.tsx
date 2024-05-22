'use client';

import { RecordQuestionModel } from '@/models/question.model'
import React, { useEffect, useState } from 'react'
import { FaMicrophone } from 'react-icons/fa'
import { IoStopCircleOutline } from 'react-icons/io5'

import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import axios from 'axios';
import { PrivPronJSON, ResponseAudioData } from '@/models/ResponseAudioData.model';
import { SingleWord } from './SingleWord';

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

    const [recordState, setRecordState] = useState<any>(RecordState.STOP);
    const [resultData, setResultData] = useState<PrivPronJSON | undefined>();

    useEffect(() => {
        setButtonDisable(true);
        return () => {
            seturlAudio(undefined);
            setRecording(false);
            setRecordState(RecordState.STOP);
            setAudioFile(undefined);
            setButtonDisable(true);
        };
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
        setButtonDisable(false); // TODO: enable button when audio is saved
    }

    return (
        <div>
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
                            className='bg-orange-600 max-w-60 mx-auto hover:bg-orange-700 transition-colors py-2 px-5 rounded-lg text-white text-center flex justify-center items-center gap-2'
                            onClick={start}>
                            <FaMicrophone width={30} />
                            Start recording</button>
                        )
                }


            </section>

            <section className='p-5 text-center items-center justify-center'>

                {
                    (urlAudio && !recording) ? <audio className='w-full mb-10' src={urlAudio} controls /> : <div>
                        <AudioReactRecorder className="w-full" state={recordState} onStop={onStop} />
                    </div>
                }
            </section>


            <section className='mt-5'>
                <h3 className='text-xl font-bold mb-5'>Your result: {resultData ? resultData.PronunciationAssessment.AccuracyScore : '0'}%</h3>
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
