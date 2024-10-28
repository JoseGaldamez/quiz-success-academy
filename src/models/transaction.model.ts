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
      FirstName: string;
      LastName: string;
      Line1: string;
      City: string;
      State: string;
      PostalCode: string;
      CountryCode: string;
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