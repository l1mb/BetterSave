import { Currency } from "../Cards/card";

export interface SpendingShopItemCategory {
  name: string;
  price: number;
  currency: Currency;
  categoryName: string;
}
