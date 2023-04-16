import { createAsyncThunk } from "@reduxjs/toolkit";
import useJwtToken from "@/hooks/useJwtToken";
import { AccountModel } from "@/types/models";
import { toast } from "react-toastify";
import { getAccountsByUserId } from "@/api/account/accountApi";
import ErrorDto from "@/types/auth/errorDto";

const getAccountsThunk = createAsyncThunk("spendings/get", async (): Promise<AccountModel[]> => {
  const { getToken, decodeToken } = useJwtToken();
  const token = getToken();
  const userId = decodeToken()?.UserId;

  if (token == null) {
    toast.error("Токен не валиден");
  }

  let response = new Response();
  debugger;
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

export default getAccountsThunk;
