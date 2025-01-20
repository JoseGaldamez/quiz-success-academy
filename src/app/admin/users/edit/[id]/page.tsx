import React from 'react';
import { EditUserForm } from '@/components/userForm/EditUserForm';

const EditAdmin = ({ params }: { params: { id: string } }) => {

    return (
        <div className='max-w-5xl mt-5 mx-auto p-5'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold text-blue-950'>Update user</h1>
            </div>
            <hr />

            <EditUserForm userId={params.id} />
        </div>
    );
}

export default EditAdmin;