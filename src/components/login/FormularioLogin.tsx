import React, { useState } from 'react';


interface FormularioLoginProps {
  tryLogin: (username: string, password: string) => void;
}

export const FormularioLogin = ({ tryLogin }: FormularioLoginProps) => {

  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    if (!target.email.value || !target.password.value) {
      setError(true);
      return;
    }

    tryLogin(target.email.value, target.password.value);
  };

  return (
    <div className='w-96 my-32 border border-slate-300 rounded-lg overflow-hidden'>
      <div className='bg-blue-950 p-5'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className='w-48 mx-auto' src="https://successacademyhn.com/wp-content/uploads/2023/02/logo_succress-blanco-copia.png" alt="logo" />
      </div>
      <form onSubmit={handleSubmit} >
        <div className='px-5 py-2'>
          <label className='block text-sm font-medium text-slate-900'>Correo</label>
          <input type='email' name='email' className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
        </div>
        <div className='px-5 py-2'>
          <label className='block text-sm font-medium text-slate-900'>Contraseña</label>
          <input type='password' name='password' className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
        </div>
        <div className='p-5'>
          <button type='submit' className='transition-all w-full bg-orange-500 py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Iniciar sesión
          </button>
        </div>
      </form>
      {error && <div className='text-red-500 text-center'>Revisa tus credenciales e intenta de nuevo.</div>}
    </div>
  )
}
