import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import { Transaction } from '@/models/transaction.model';

const POWERTRANZ_API_URL = process.env.POWERTRANZ_API_URL || "https://staging.ptranz.com/api/spi/sale"; // Endpoint de venta
const POWERTRANZ_ID = process.env.POWERTRANZ_ID || "77700358";
const POWERTRANZ_PASSWORD = process.env.POWERTRANZ_PASSWORD || "BHjvFjogBJcN63Diq5iRyGJwVfPcB60tPJxdBKVmt17SF8geIIdvj7";

// Función para realizar una venta (SALE)
export const createSale = async (saleData: Transaction) => {
  const transactionIdentifier = uuidv4();
  console.log(POWERTRANZ_API_URL)
  try {
    const response = await axios.post(
      POWERTRANZ_API_URL,
      {
        TransactionIdentifier: transactionIdentifier,
        TotalAmount: saleData.TotalAmount,
        CurrencyCode: saleData.CurrencyCode,
        ThreeDSecure: saleData.ThreeDSecure,
        Source: saleData.Source,
        OrderIdentifier: `ORDER_${transactionIdentifier}`,
        BillingAddress: saleData.BillingAddress,
        AddressMatch: saleData.AddressMatch,
        ExtendedData: saleData.ExtendedData
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Powertranz-PowertranzId': POWERTRANZ_ID,
          'Powertranz-PowertranzPassword': POWERTRANZ_PASSWORD
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating sale:', error);
    throw error;
  }
};
