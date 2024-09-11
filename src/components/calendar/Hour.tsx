import { DayModel } from '@/models/day.model';
import { getDay, registerDayEndHour } from '@/services/days.service';
import React, { useEffect, useState } from 'react'

export const Hour = ({ selectedHour, hour, selectedDay, setSelectedHour }: { selectedHour: string | null, hour: string, selectedDay: DayModel, setSelectedHour: (hour: string) => void }) => {

    const [disable, setDisable] = useState<boolean>(false);

    useEffect(() => {
        getHourInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getHourInfo = async () => {

        if (selectedDay == null) return;

        const dayDate = selectedDay.month + selectedDay.date;
        const reducedHour = hour.replaceAll(':', '').replaceAll(' ', '');

        const dataOfThisHour = await getDay(dayDate, reducedHour);

        if (dataOfThisHour == null) return;

        const manyKeys = Object.keys(dataOfThisHour);
        if (manyKeys.length >= 4) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }

    return (
        <div onClick={() => {
            if (disable) return;
            setSelectedHour(hour);

        }} key={`${selectedDay.fullDate}-${hour}`}>

            {
                disable ? (
                    <span className={`bg-gray-300 text-gray-500  text-center p-5 mt-5 border border-slate-300 rounded-md cursor-pointer inline-block text-sm`}>
                        {hour}
                    </span>
                ) :
                    <span className={`${selectedHour === hour ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-900"}  text-center p-5 mt-5 border border-slate-300 rounded-md cursor-pointer inline-block text-sm`}>
                        {hour}
                    </span>

            }

        </div >
    )
}
