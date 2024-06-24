import { MenuBar } from '@/common/MenuBar'
import Link from 'next/link'
import React from 'react'

const FinishPage = () => {
    return (
        <div>
            <MenuBar showRequestAccessButton={false} />
            <div className='max-w-3xl mx-auto p-10'>
                <div>
                    <h3 className='text-orange-500 text-2xl font-bold border-b-2 border-slate-200 mb-10 pb-5'>
                        A great job! You have finished the online test.
                    </h3>
                </div>
                <div>
                    <p className='text-lg'>
                        Thank you for your time and effort. We will contact you on the date and hour you have chosen to continue the process with the speaking part of this test. <strong>Please be ready and on time for the call.</strong>
                    </p>
                </div>
                <div className='mt-14'>
                    <Link className='mt-24 bg-orange-600 text-white py-3 px-10 rounded' href='/'>
                        Go to home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FinishPage