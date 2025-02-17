'use client';
import React, { useEffect, useState } from 'react'

import { MenuBar } from '@/common/MenuBar';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { getListOfDates } from './helperCalendar';
import { DayModel } from '@/models/day.model';
import { ItemDay } from '@/components/calendar/ItemDay';
import { setDateToCall, updateStudentState } from '@/services/students.service';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Hour } from '@/components/calendar/Hour';
import { getDay, getHorariosCall, registerDayEndHour } from '@/services/days.service';
import { sendMessage } from '@/services/messages.service';
import { StudentStates } from '@/types/studentStates.types';

const ChooseCalendarCall = () => {
    const router = useRouter();

    const dispatch = useAppDispatch();
    const currentStudent = useAppSelector((state) => state.currentStudent);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [listOfDays, setListOfDays] = useState<DayModel[]>([]);
    const [selectedDay, setSelectedDay] = useState<DayModel | null>(null);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (currentStudent.code === '') {
            router.push('/');
        }
        fullDays();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fullDays = async () => {
        const horarios = await getHorariosCall();

        const listDays = getListOfDates(currentDate, horarios);
        setListOfDays(listDays);

    }

    const handleSetDateToCall = async () => {

        if (selectedDay == null || selectedHour == null) return;

        setLoading(true);

        const dateToCall = {
            date: selectedDay?.fullDate,
            hour: selectedHour
        };
        await setDateToCall(currentStudent.code, dateToCall);

        const dayDate = selectedDay.month + selectedDay.date;

        await registerDayEndHour(dayDate, selectedHour, currentStudent.code);

        await updateStudentState(currentStudent.code, StudentStates.TO_CALL);

        const message = `The student ${currentStudent.name} (${currentStudent.code}) has finished the online quiz and selected the date ${selectedDay.fullDate} at ${selectedHour} for the call.`;

        const messageOptions = {
            from: `"Success Academy Quiz" <${process.env.EMAIL_USERNAME}>`,
            to: "coordinacion.academica@successacademyhn.com,josegaldamez1991@gmail.com,Successacademy0101@gmail.com,sac@successacademyhn.com",
            subject: "Student has finished the quiz",
            content: message,
        };

        const res = await fetch("https://success-academy-emails.vercel.app/api/sendEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(messageOptions),
        });

        setLoading(false);
        router.push(`finish`);
    }

    return (
        <div>
            <MenuBar showRequestAccessButton={false} />
            <div className='max-w-3xl mx-auto py-10'>
                <div>
                    <h3 className='text-orange-500 text-xl font-bold border-b-2 border-slate-200 mb-10 pb-5'>
                        Congratulation. You are almost there!
                    </h3>
                </div>

                <h1 className='text-3xl font-bold my-2'>Choose a date and time for your call</h1>
                <h2 className='py-5'>Please select a date and time for your call with one of our representatives.</h2>
                <hr />

                <h3 className='text-xl font-bold mt-10'>Select a date</h3>
                <div className='flex gap-2 justify-between items-center'>
                    {
                        listOfDays.map((day) => {
                            return (
                                <ItemDay key={day.fullDate}
                                    day={day}
                                    isSelected={selectedDay?.fullDate === day.fullDate}
                                    selectDate={(day: DayModel) => {
                                        setSelectedDay(null);
                                        setSelectedHour(null);
                                        setSelectedDay(day);
                                    }}
                                />
                            )
                        })
                    }
                </div>

                <h3 className='text-xl font-bold mt-16'>Select an hour</h3>
                <div className='flex gap-2 justify-between items-center mt-10'>
                    {
                        (selectedDay !== null) && selectedDay?.hours.map((hour) => {
                            return (
                                <Hour key={selectedDay.fullDate + hour}
                                    hour={hour}
                                    selectedDay={selectedDay}
                                    selectedHour={selectedHour}
                                    setSelectedHour={(hour: string) => {
                                        setSelectedHour(hour);
                                    }}
                                />
                            )
                        })
                    }
                </div>
                <br />


                <div className='w-full border-b-2 border-slate-400 h-2 mt-10'></div>
                <div className='flex gap-2 justify-between items-center mt-10'>
                    {
                        (selectedHour !== null && selectedDay !== null) && (
                            <button onClick={handleSetDateToCall} className='bg-blue-950 text-white w-full p-3 rounded-md'>

                                {
                                    loading ? (
                                        <div className='flex justify-center items-center'>

                                            <ArrowPathIcon width={20} height={20} className='animate-spin' />
                                            <span className='ml-2'>Loading...</span>
                                        </div>
                                    ) : (
                                        <span>Confirm date and time</span>
                                    )
                                }

                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ChooseCalendarCall