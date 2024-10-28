import { createSale } from '@/app/api/ptranz/createSale';
import { Transaction } from '@/models/transaction.model';
import { useState } from 'react';

const SaleComponent = ({ amount }: { amount: number | null }) => {

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    // Aquí puedes manejar el envío de los datos (e.g., enviarlos a una API)
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
        FirstName: '',
        LastName: '',
        Line1: formData.AddressLine1,
        City: formData.City,
        State: formData.State,
        PostalCode: formData.PostalCode,
        CountryCode: '340',
        EmailAddress: formData.EmailAddress,
        PhoneNumber: formData.PhoneNumber
      },
      AddressMatch: true,
      ExtendedData: {
        ThreeDSecure: {
          ChallengeWindowSize: 4,
          ChallengeIndicator: '01'
        },
        MerchantResponseUrl: 'https://successacademyhn.com/'
      },
      OrderIdentifier: ''
    };

    try {
      console.log(saleData);
      const result = await createSale(saleData);
      setTransaction(result);
    } catch (error) {
      console.error('Error processing sale:', error);
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
            <label className='block text-sm font-medium text-slate-900'>Expiración (MMYY):</label>
            <input className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type="number" name="CardExpiration" value={formData.CardExpiration} onChange={handleChange} required />
        </div>
      </div>

      <div className='px-5 py-2'>
          <label className='block text-sm font-medium text-slate-900'>Nombre del titular</label>
          <input className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type="text" name="CardholderName" value={formData.CardholderName} onChange={handleChange} required />
      </div>

      <div className='px-5 py-2'>
          <label className='block text-sm font-medium text-slate-900'>Dirección</label>
          <input className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type="text" name="AddressLine1" value={formData.AddressLine1} onChange={handleChange} required />
      </div>

      <div className="flex">

        <div className='px-5 py-2'>
            <label className='block text-sm font-medium text-slate-900'>Cuidad</label>
            <input className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type="text" name="City" value={formData.City} onChange={handleChange} required />
        </div>

        <div className='px-5 py-2'>
            <label className='block text-sm font-medium text-slate-900'>Departamento</label>
            <input className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type="text" name="State" value={formData.State} onChange={handleChange} required />
        </div>

        <div className='px-5 py-2'>
            <label className='block text-sm font-medium text-slate-900'>Postal Code</label>
            <input className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type="number" name="PostalCode" value={formData.PostalCode} onChange={handleChange} required />
        </div>

      </div>

      <div className='px-5 py-2'>
          <label className='block text-sm font-medium text-slate-900'>Correo electrónico</label>
          <input className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type="email" name="EmailAddress" value={formData.EmailAddress} onChange={handleChange} required />
      </div>


      <div className='px-5 py-2'>
          <label className='block text-sm font-medium text-slate-900'>Número de teléfono</label>
          <input className='mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type="tel" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} required />
      </div>

      <button onClick={() => handleCreateSale()} className='px-16 py-3 bg-slate-600 block mt-8 w-72 mx-auto text-white font-bold rounded-lg' type="submit">Submit</button>
    </form>
    { transaction.IsoResponseCode === "SP4" && <iframe srcDoc={transaction.RedirectData}></iframe> }
    </div>
  );
};

export default SaleComponent;
