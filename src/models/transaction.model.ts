export interface Transaction{
    TransactionIdentifier: string;
    TotalAmount: number;
    CurrencyCode: number;
    ThreeDSecure: boolean;
    Source: {
      CardPan: number;
      CardCvv: number;
      CardExpiration: number;
      CardholderName: string;
    };
    OrderIdentifier: string;
    BillingAddress: {
      EmailAddress: string;
      PhoneNumber: string;
    };
    AddressMatch: boolean;
    ExtendedData: {
      ThreeDSecure: {
        ChallengeWindowSize: number;
        ChallengeIndicator: string;
      };
      MerchantResponseUrl: string;
    };
  };