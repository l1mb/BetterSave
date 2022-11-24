import { apiGetProtected } from "./api";
import routes from "./routes";

export const getSpendings = (
  token: string,
  beginDate: string,
  cardId: string,
  orderBy?: string
) =>
  apiGetProtected(
    `${routes.spendings}?beginDate=${beginDate}&orderBy=${
      orderBy || "date"
    }&cardId=${cardId}`,
    token
  );

export const test = "";
