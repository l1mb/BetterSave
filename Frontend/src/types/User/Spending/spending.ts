import { ShopDto } from "./shop";
import { SpendingShopItemCategory } from "./SpendingShopItemCategory";

export interface SpendingReportDto {
  name: string;
  coast: number;
  date: string;
  shopItems: SpendingShopItemCategory[];
  shop: ShopDto;
}
