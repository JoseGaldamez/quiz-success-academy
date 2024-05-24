'use client';
import React, { useState } from 'react'

import { MenuBar } from '@/common/MenuBar';

const ChooseCalendarCall = () => {

    const [value, onChange] = useState(new Date());

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

            </div>
        </div>
    )
}

export default ChooseCalendarCall