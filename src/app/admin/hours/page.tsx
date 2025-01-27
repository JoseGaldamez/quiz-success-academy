import { Horarios } from '@/components/hours/Horarios';
import React from 'react';

const HourPage = () => {
    return (
        <div>
            <div className='max-w-5xl mx-auto py-10'>
                <h2 className='pb-3 font-bold text-2xl text-blue-950'>Horario de llamadas</h2>
                <hr />
                <Horarios />

            </div>
        </div>
    );
}

export default HourPage;
