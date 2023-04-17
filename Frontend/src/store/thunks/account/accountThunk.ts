import { createAsyncThunk } from "@reduxjs/toolkit";
import useJwtToken from "@/hooks/useJwtToken";
import { AccountModel, CreateAccountUIModel, UpdateAccountModel } from "@/types/models";
import { toast } from "react-toastify";
import { createAccount, deleteAccount, getAccountsByUserId, updateAccount } from "@/api/account/accountApi";
import ErrorDto from "@/types/auth/errorDto";

const getAccountsThunk = createAsyncThunk("account/get", async (): Promise<AccountModel[]> => {
  const { getToken, decodeToken } = useJwtToken();
  const token = getToken();
  const userId = decodeToken()?.UserId;

  if (token == null) {
    toast.error("Токен не валиден");
  }

  let response = new Response();
  if (token !== null) {
    response = await getAccountsByUserId(userId ?? "");
  }
  const result = await response.json();

  if (response.status !== 200) {
    toast.error((result as ErrorDto).errorMessage);
    return [];
  }

  return result;
});

export const createAccountThunk = createAsyncThunk(
  "accounts/create",
  async (param: CreateAccountUIModel): Promise<AccountModel | null> => {
    const { getToken, decodeToken, getUserId } = useJwtToken();
    const userId = getUserId();

    let response = new Response();
    if (userId !== "") {
      response = await createAccount({ ...param, userId });
    }
    const result = await response.json();

    if (response.status !== 201) {
      toast.error((result as ErrorDto).errorMessage);
      return null;
    }

    toast.success(`Счет ${param.name} был успешно создан`);
    return result;
  }
);

export const deleteAccountThunk = createAsyncThunk(
  "accounts/delete",
  async (accountId: string): Promise<string | null> => {
    let response = new Response();

    response = await deleteAccount(accountId);

    if (response.status !== 204) {
      const result = await response.json();
      toast.error((result as ErrorDto).errorMessage);
      return null;
    }

    toast.success(`Счет был удален`);
    return accountId;
  }
);

export const updateAccountThunk = createAsyncThunk(
  "accounts/update",
  async (model: UpdateAccountModel): Promise<AccountModel | null> => {
    let response = new Response();

    response = await updateAccount(model);
    const result = await response.json();

    if (response.status !== 200) {
      toast.error((result as ErrorDto).errorMessage);
      return null;
    }

    toast.success(`Счет был обновлен`);
    return result;
  }
);

export default getAccountsThunk;
