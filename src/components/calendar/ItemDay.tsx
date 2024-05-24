import { DayModel } from '@/models/day.model'
import React from 'react'

interface IItemDayProps {
    day: DayModel;
    isSelected: boolean;
    selectDate: (day: DayModel) => void;
}

export const ItemDay = ({ day, isSelected, selectDate }: IItemDayProps) => {
    return (
        <span onClick={() => {
            selectDate(day);
        }} className={`${isSelected ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-900"} text-center p-5 mt-5 border border-slate-300 rounded-md cursor-pointer`}>
            <h4>{day.day}</h4>
            <span>
                {day.date} {day.month}
            </span>
        </span>
    )
}
