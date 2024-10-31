import {v4 as uuidv4} from 'uuid';
import { useState } from 'react';
import { Transaction } from '@/models/transaction.model';

enum ProcessStatus {
  INIT,
  PROCESSING,
  FINISH,
}

const SaleForm = ({ amount }: { amount: number | null }) => {

  const [transaction, setTransaction] = useState<TransactionResponse>({
    TransactionType: 0,
    Approved: false,
    TransactionIdentifier: '',
    TotalAmount: 0,
    CurrencyCode: '',
    IsoResponseCode: '',
    ResponseMessage: '',
    OrderIdentifier: '',
    RedirectData: '',
    SpiToken: '',
  });

  const [formData, setFormData] = useState({
    CardPan: 0,
    CardCvv: 0,
    CardExpiration: 0,
    CardholderName: '',
    AddressLine1: '',
    City: '',
    State: '',
    PostalCode: '',
    EmailAddress: '',
    PhoneNumber: ''
  });

  const [processingState, setProcessing] = useState<ProcessStatus>(ProcessStatus.INIT)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateSale();
  };

  const handleCreateSale = async () => {
    
    const saleData: Transaction = {
      TransactionIdentifier: '',
      TotalAmount: amount || 0,
      CurrencyCode: 340, // Lempiras
      ThreeDSecure: true,
      Source: {
        CardPan: formData.CardPan,
        CardCvv: formData.CardCvv,
        CardExpiration: formData.CardExpiration,
        CardholderName: formData.CardholderName,
      },
      BillingAddress: {
        EmailAddress: formData.EmailAddress,
        PhoneNumber: formData.PhoneNumber
      },
      AddressMatch: true,
      ExtendedData: {
        ThreeDSecure: {
          ChallengeWindowSize: 4,
          ChallengeIndicator: '01'
        },
        MerchantResponseUrl: `${window.location.origin}/api/finish-sale/`
        
      },
      OrderIdentifier: ''
    };

    try {
      setProcessing(ProcessStatus.PROCESSING);

      const transactionIdentifier = uuidv4();

      const response = await fetch('/api/sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TransactionIdentifier: transactionIdentifier,
          TotalAmount: saleData.TotalAmount,
          CurrencyCode: saleData.CurrencyCode,
          ThreeDSecure: saleData.ThreeDSecure,
          Source: saleData.Source,
          OrderIdentifier: `ORDER_${transactionIdentifier}`,
          BillingAddress: saleData.BillingAddress,
          AddressMatch: saleData.AddressMatch,
          ExtendedData: saleData.ExtendedData,
        }),
      });
      if(response.status === 200) {
        const data = await response.json();
        if(!data.error){
          setTransaction(data.data);
          setProcessing(ProcessStatus.FINISH);
        }
      }
    } catch (error) {
      console.error('Error processing sale:', error);
      setProcessing(ProcessStatus.FINISH);
    }
  };

  return (
    <div className='mt-5 flex justify-between'>
    <form onSubmit={handleSubmit} className='w-full pr-10'>
      <div className='px-5 py-2'>
          <label className='block text-sm font-medium text-slate-900'><strong>Total: L {amount}</strong></label>
      </div>

      <div className='px-5 py-2'>
          <label className='block text-sm font-medium text-slate-900'>Número de tarjeta</label>
          <input className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type="number" name="CardPan" value={formData.CardPan} onChange={handleChange} required />
      </div>

      <div className="flex">
        <div className='w-1/2 px-5 py-2'>
            <label className='block text-sm font-medium text-slate-900'>CVV</label>
            <input className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type="number" name="CardCvv" value={formData.CardCvv} onChange={handleChange} required />
        </div>

        <div className='w-1/2 px-5 py-2'>
            <label className='block text-sm font-medium text-slate-900'>Expiración (YYMM):</label>
            <input className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type="number" name="CardExpiration" value={formData.CardExpiration} onChange={handleChange} required />
        </div>
      </div>

      <div className='px-5 py-2'>
          <label className='block text-sm font-medium text-slate-900'>Nombre del titular</label>
          <input className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type="text" name="CardholderName" value={formData.CardholderName} onChange={handleChange} required />
      </div>

      <div className='px-5 py-2'>
          <label className='block text-sm font-medium text-slate-900'>Correo electrónico</label>
          <input className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type="email" name="EmailAddress" value={formData.EmailAddress} onChange={handleChange} required />
      </div>


      <div className='px-5 py-2'>
          <label className='block text-sm font-medium text-slate-900'>Número de teléfono</label>
          <input className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type="tel" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} required />
      </div>

      { processingState !== ProcessStatus.PROCESSING && <button className='px-16 py-3 bg-slate-600 block mt-8 w-72 mx-auto text-white font-bold rounded-lg' type="submit">Pagar</button>}
    </form>
    { (transaction.IsoResponseCode === "SP4" && processingState === ProcessStatus.FINISH) && <iframe width="100%" srcDoc={transaction.RedirectData}></iframe> }
    { (transaction.IsoResponseCode !== "SP4" && processingState === ProcessStatus.FINISH) && <h4 className='text-orange-700'>Erro en el procesamiento del pago - verifique la información del pago e intente nuevamente</h4>}
 
    </div>
  );
};

export default SaleForm;
