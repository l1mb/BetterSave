import { Card } from "../../types/User/Cards/card";
import { apiDelete, apiGetProtected, apiPost, apiPut } from "./api";
import routes from "./routes";

export const getCards = (token: string) =>
  apiGetProtected(`${routes.myCards}`, token);

export const createCard = (body: Partial<Card>) =>
  apiPost(`${routes.cardsPostfix}`, body);

export const updateCard = (body: Partial<Card>) =>
  apiPut(`${routes.cardsPostfix}`, body);

export const deleteCard = (id: string) =>
  apiDelete(`${routes.cardsPostfix}/${id}`);

export const test = "";
