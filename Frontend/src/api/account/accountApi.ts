import { CreateAccountModel } from "@/types/models";
import { Card } from "../../types/User/Cards/card";
import { apiDelete, apiGet, apiPost, apiPut } from "../api";
import routes from "../routes";

export const getAccountsByUserId = (uid: string) => apiGet(`${routes.getAccounts}/${uid}`);

export const createAccount = (body: CreateAccountModel) => apiPost(`${routes.createAccount}`, body);

export const deleteAccount = (body: Partial<Card>) => apiPut(`${routes.deleteAccount}`, body);

export const updateAccount = (id: string) => apiDelete(`${routes.updateAccount}/${id}`);
