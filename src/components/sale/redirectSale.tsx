'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

const RedirectSale = () => {
  const searchParams = useSearchParams();
  const spiToken = searchParams.get('spiToken');

  useEffect(() => {
    window.parent.location = "/finish-sale/" + spiToken;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex justify-center items-center mt-10'>
      <p>Por favor espere...</p>
    </div>
  );
}

export default RedirectSale