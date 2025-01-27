import React from 'react';

interface HorarioProps {
    day: number;
    selectedDays: string[];
    handleSelectHour: (day: number, hour: string) => void;
}

const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export const Horario = ({ day, selectedDays, handleSelectHour }: HorarioProps) => {

    return (
        <section>
            <div className='flex justify-between items-center mt-10'>
                <h3 className='text-xl font-bold'>{days[day - 1]}</h3>
            </div>
            <div className='flex flex-wrap gap-2 mt-5 justify-between pb-5'>
                <div onClick={() => {
                    handleSelectHour(day, '08:00 am - 09:00 am');
                }} className={`${selectedDays.includes('08:00 am - 09:00 am') ? 'bg-orange-400 text-white' : 'bg-gray-200'} p-2 rounded-md cursor-pointer`}>08:00 am</div>

                <div onClick={() => {
                    handleSelectHour(day, '09:00 am - 10:00 am');
                }} className={`${selectedDays.includes('09:00 am - 10:00 am') ? 'bg-orange-400 text-white' : 'bg-gray-200'} p-2 rounded-md cursor-pointer`}>09:00 am</div>

                <div onClick={() => {
                    handleSelectHour(day, '10:00 am - 11:00 am');
                }} className={`${selectedDays.includes('10:00 am - 11:00 am') ? 'bg-orange-400 text-white' : 'bg-gray-200'} p-2 rounded-md cursor-pointer`}>10:00 am</div>

                <div onClick={() => {
                    handleSelectHour(day, '11:00 am - 12:00 am');
                }} className={`${selectedDays.includes('11:00 am - 12:00 am') ? 'bg-orange-400 text-white' : 'bg-gray-200'} p-2 rounded-md cursor-pointer`}>11:00 am</div>

                <div onClick={() => {
                    handleSelectHour(day, '12:00 am - 01:00 pm');
                }} className={`${selectedDays.includes('12:00 am - 01:00 pm') ? 'bg-orange-400 text-white' : 'bg-gray-200'} p-2 rounded-md cursor-pointer`}>12:00 pm</div>

                <div onClick={() => {
                    handleSelectHour(day, '01:00 pm - 02:00 pm');
                }} className={`${selectedDays.includes('01:00 pm - 02:00 pm') ? 'bg-orange-400 text-white' : 'bg-gray-200'} p-2 rounded-md cursor-pointer`}>01:00 pm</div>

                <div onClick={() => {
                    handleSelectHour(day, '02:00 pm - 03:00 pm');
                }} className={`${selectedDays.includes('02:00 pm - 03:00 pm') ? 'bg-orange-400 text-white' : 'bg-gray-200'} p-2 rounded-md cursor-pointer`}>02:00 pm</div>

                <div onClick={() => {
                    handleSelectHour(day, '03:00 pm - 04:00 pm');
                }} className={`${selectedDays.includes('03:00 pm - 04:00 pm') ? 'bg-orange-400 text-white' : 'bg-gray-200'} p-2 rounded-md cursor-pointer`}>03:00 pm</div>

                <div onClick={() => {
                    handleSelectHour(day, '04:00 pm - 05:00 pm');
                }} className={`${selectedDays.includes('04:00 pm - 05:00 pm') ? 'bg-orange-400 text-white' : 'bg-gray-200'} p-2 rounded-md cursor-pointer`}>04:00 pm</div>

                <div onClick={() => {
                    handleSelectHour(day, '05:00 pm - 06:00 pm');
                }} className={`${selectedDays.includes('05:00 pm - 06:00 pm') ? 'bg-orange-400 text-white' : 'bg-gray-200'} p-2 rounded-md cursor-pointer`}>05:00 pm</div>
            </div>
            <hr />
        </section>
    );
}
