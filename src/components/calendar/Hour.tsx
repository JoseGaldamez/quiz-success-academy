import { DayModel } from '@/models/day.model';
import React, { useEffect } from 'react'

export const Hour = ({ selectedHour, hour, selectedDay, setSelectedHour }: { selectedHour: string | null, hour: string, selectedDay: DayModel, setSelectedHour: (hour: string) => void }) => {


    useEffect(() => {
        console.log(`Buscando información para este día ${selectedDay.fullDate} a esta hora ${hour}`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDay])

    return (
        <div onClick={() => {
            setSelectedHour(hour);
        }} key={`${selectedDay.fullDate}-${hour}`}>
            <span className={`${selectedHour === hour ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-900"}  text-center p-5 mt-5 border border-slate-300 rounded-md cursor-pointer inline-block text-sm`}>
                {hour}
            </span>
        </div>
    )
}
