'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

const RedirectSale = () => {
  const searchParams = useSearchParams();
  const spiToken = searchParams.get('spiToken');

    useEffect(() => {
      window.parent.location = "/finish-sale?spiToken="+spiToken;
    }, []);
    
      return <p>Redirigiendo...</p>;
}

export default RedirectSale