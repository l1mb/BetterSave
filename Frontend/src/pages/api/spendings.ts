import { createSpendingRequest } from "../../types/User/Spending/createSpendingRequest";
import { apiDelete, apiGetProtected, apiPost } from "./api";
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

export const createSpending = (body: createSpendingRequest) =>
  apiPost(`${routes.spendings}`, body);

export const deleteSpending = (id: string) =>
  apiDelete(`${routes.spendings}/${id}`);

export const test = "";
