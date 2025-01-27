'use client';
import React, { useEffect, useState } from 'react';
import { Horario } from './Horario';
import { getHorariosCall, saveHorarios } from '@/services/days.service';

export const Horarios = () => {

    const [daysSelected, setdaysSelected] = useState<{ [key: number]: string[] }>({
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: []
    });

    useEffect(() => {
        getHorariosCall().then((horarios) => {
            setdaysSelected(horarios);
        });
    }, []);

    const handleSelectHour = (day: number, hour: string) => {

        if (daysSelected[day].includes(hour)) {
            setdaysSelected({
                ...daysSelected,
                [day]: daysSelected[day].filter((h) => h !== hour)
            });
            return;
        }

        setdaysSelected({
            ...daysSelected,
            [day]: [...daysSelected[day], hour]
        });
    };

    const handleSaveHours = async () => {
        const horarios = await saveHorarios(daysSelected);
        console.log(horarios);
    }

    return (
        <>
            <Horario day={1} selectedDays={daysSelected[1]} handleSelectHour={handleSelectHour} />
            <Horario day={2} selectedDays={daysSelected[2]} handleSelectHour={handleSelectHour} />
            <Horario day={3} selectedDays={daysSelected[3]} handleSelectHour={handleSelectHour} />
            <Horario day={4} selectedDays={daysSelected[4]} handleSelectHour={handleSelectHour} />
            <Horario day={5} selectedDays={daysSelected[5]} handleSelectHour={handleSelectHour} />
            <Horario day={6} selectedDays={daysSelected[6]} handleSelectHour={handleSelectHour} />

            <button onClick={handleSaveHours} className="bg-orange-500 hover:bg-orange-600 text-white w-full py-5 text-lg font-bold mt-5 rounded-xl">Guardar horarios</button>
        </>
    );
}
