'use client';
import React, { useEffect, useState } from 'react';
import { Horario } from './Horario';
import { getHorariosCall, saveHorarios } from '@/services/days.service';
import { orderHorarioDay } from './orderDays';

export const Horarios = () => {

    const [daysSelected, setdaysSelected] = useState<{ [key: number]: string[] }>({
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: []
    });

    const [loading, setLoading] = useState(false);

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

        setLoading(true);
        // order horarios
        const horariosToSave: { [key: number]: string[] } = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: []
        }

        for (let index = 1; index <= 6; index++) {
            const element = daysSelected[index];
            const result = orderHorarioDay(element);
            horariosToSave[index] = result;
        }

        await saveHorarios(horariosToSave);
        setLoading(false);
    }

    return (
        <>
            <Horario day={1} selectedDays={daysSelected[1]} handleSelectHour={handleSelectHour} />
            <Horario day={2} selectedDays={daysSelected[2]} handleSelectHour={handleSelectHour} />
            <Horario day={3} selectedDays={daysSelected[3]} handleSelectHour={handleSelectHour} />
            <Horario day={4} selectedDays={daysSelected[4]} handleSelectHour={handleSelectHour} />
            <Horario day={5} selectedDays={daysSelected[5]} handleSelectHour={handleSelectHour} />
            <Horario day={6} selectedDays={daysSelected[6]} handleSelectHour={handleSelectHour} />

            <button disabled={loading} onClick={handleSaveHours} className="bg-orange-500 hover:bg-orange-600 text-white w-full py-5 text-lg font-bold mt-5 rounded-xl disabled:bg-gray-400">Guardar horarios</button>
        </>
    );
}
