import { CreateAccountModel, UpdateAccountModel } from "@/types/models";
import { apiDelete, apiGet, apiPost, apiPut } from "../api";
import routes from "../routes";

export const getAccountsByUserId = (uid: string) => apiGet(`${routes.getAccounts}/${uid}`);

export const createAccount = (body: CreateAccountModel) => apiPost(`${routes.createAccount}`, body);

export const updateAccount = (body: UpdateAccountModel) => apiPut(`${routes.updateAccount}`, body);

export const deleteAccount = (uid: string) => apiDelete(`${routes.deleteAccount}/${uid}`);
