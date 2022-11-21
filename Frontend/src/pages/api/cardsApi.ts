import { apiGetProtected } from "./api";
import routes from "./routes";

export const getCards = (token: string) =>
  apiGetProtected(`${routes.myCards}`, token);

export const test = "";
