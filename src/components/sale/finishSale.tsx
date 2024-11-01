'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export const FinishSale = () => {
    const searchParams = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState("Espere por favor...");
    const [color, setColor] = useState("text-sky-600");


    const spiToken = searchParams.get('spiToken');

    useEffect(() => {
        makePayment();
    },[]);

    async function makePayment(){
        if(spiToken == "null") {
            setPaymentStatus("No se pudo procesar el pago")
            return;
        }

        const response = await fetch('/api/payment', {
            method: 'POST',
            body: JSON.stringify({ spiToken: spiToken }),
          });
        
          if(response.status === 200) {
            const data = await response.json();
            if(!data.error){
                setPaymentStatus("Pago realizado correctamente")
                setColor("text-green-700")
            }
            else{
                setPaymentStatus(data.data.error)
                setColor("text-red-700")
            }
          }
    }
    
    return (
        <div className='text-center mt-20'>
            <h1 className={color}>{paymentStatus}</h1>
            <p className='text-slate-700'>Gracias por confiar en nosotros</p>

            <p className='mt-10 text-xl'>
                Dudas o consultas a: <strong>josegaldamez1991@gmail.com</strong>
            </p>
        </div>
    )
}
