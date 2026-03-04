'use client';
import React, { useEffect, useState } from 'react';
import { Horario } from './Horario';
import { getHorariosCall, saveHorarios } from '@/services/days.service';
import { orderHorarioDay } from './orderDays';
import toast from 'react-hot-toast';

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
            console.log({ horarios });

            setdaysSelected(horarios);
        });
    }, []);

    const handleSelectHour = (day: number, hour: string) => {

        console.log({ day, hour });

        if (daysSelected[day].includes(hour)) {
            setdaysSelected({
                ...daysSelected,
                [day]: daysSelected[day].filter((h) => h !== hour)
            });
            return;
        }

        const newHorarios = {
            ...daysSelected,
            [day]: [...daysSelected[day], hour]
        };

        console.log({ newHorarios });

        setdaysSelected(newHorarios);
    };

    const handleSaveHours = async () => {

        setLoading(true);
        const toastId = toast.loading('Guardando horarios...');
        
        try {
            // order horarios
            const horariosToSave: { [key: number]: string[] } = {
                1: daysSelected[1],
                2: daysSelected[2],
                3: daysSelected[3],
                4: daysSelected[4],
                5: daysSelected[5],
                6: daysSelected[6]
            }

            console.log({ horariosToSave });

            await saveHorarios(horariosToSave);
            toast.success('Horarios guardados correctamente.', { id: toastId });
        } catch (error) {
            console.error(error);
            toast.error('Error al guardar los horarios.', { id: toastId });
        } finally {
            setLoading(false);
        }
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
