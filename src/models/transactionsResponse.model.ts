
interface TransactionResponse {
  TransactionType: number;
  Approved: boolean;
  TransactionIdentifier: string;
  TotalAmount: number;
  CurrencyCode: string;
  IsoResponseCode: string;
  ResponseMessage: string;
  OrderIdentifier: string;
  RedirectData: string;
  SpiToken: string;
}