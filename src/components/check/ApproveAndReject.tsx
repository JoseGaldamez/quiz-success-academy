import React from 'react'

export const ApproveAndReject = ({ updateCheckAnwer }: { updateCheckAnwer: (checked: boolean) => void }) => {
    return (
        <div className='mt-14 gap-5'>
            <button onClick={() => {
                updateCheckAnwer(true);
            }} className='text-green-600'>
                Approve
            </button>
            <button onClick={() => {
                updateCheckAnwer(false);
            }} className='text-red-600 mx-5'>
                Reject
            </button>
        </div>
    )
}
