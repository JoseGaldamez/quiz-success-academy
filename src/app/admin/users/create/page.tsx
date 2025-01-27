import { CreateUserForm } from '@/components/userForm/CreateUserForm';
import React from 'react';

const CreateUserPage = () => {
    return (
        <div className='max-w-5xl mt-5 mx-auto py-5'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold text-blue-950'>Create new user</h1>
            </div>
            <hr />
            <CreateUserForm />
        </div>
    );
}

export default CreateUserPage;
