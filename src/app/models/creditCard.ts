export interface CreditCard {
    id: number | undefined;
    userid : number;
    creditcardtype: string;
    cardnumber : string;
    cvc : string;
    expirationdatemonth : string;
    expirationdateyear : string;
  }