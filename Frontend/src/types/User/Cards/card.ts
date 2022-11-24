export interface Card {
  name: string;
  cardNumber: string;
  balance: number;
  currency: Currency;
  userId: string;
  id: string;
}

export const enum Currency {
  "BYN" = "BYN",
  "USD" = "USD",
  "EUR" = "EUR",
}
