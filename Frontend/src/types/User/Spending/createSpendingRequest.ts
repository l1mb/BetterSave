import { SpendingShopItemCategory } from "./SpendingShopItemCategory";

export type createSpendingRequest = {
  name: string;
  spendingDate: Date;
  shopPositions: Partial<SpendingShopItemCategory>[];
  shopName: string;
  userId: string;
  cardId: string;
};
