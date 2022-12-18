import { createAsyncThunk } from "@reduxjs/toolkit";
import useJwtToken from "../../hooks/useJwtToken";
import {
  createSpending,
  deleteSpending,
  getSpendings,
} from "../../pages/api/spendings";
import { createSpendingRequest } from "../../types/User/Spending/createSpendingRequest";
import { SpendingReportDto } from "../../types/User/Spending/spending";

type ThunkParam = {
  setError?: (err: string) => void;
  beginDate?: string;
  orderBy?: string;
  cardId?: string;
  body?: createSpendingRequest;
};

const getSpendingThunk = createAsyncThunk(
  "spendings/get",
  async (params: ThunkParam): Promise<SpendingReportDto[]> => {
    const { getToken } = useJwtToken();
    const token = getToken();

    if (token == null) {
      params.setError("Unable to authorize");
    }

    let response = new Response();

    if (token !== null && params.beginDate && params.cardId) {
      response = await getSpendings(
        token,
        params.beginDate,
        params.cardId,
        params.orderBy
      );
    }
    const result = await response.json();

    if (response.status !== 200) {
      params.setError(result.errorMessage);
      return [];
    }

    return result;
  }
);

export const createSpendingThunk = createAsyncThunk(
  "spendings/create",
  async (params: ThunkParam): Promise<SpendingReportDto> => {
    const { getToken } = useJwtToken();
    const token = getToken();

    if (token == null) {
      params.setError("Unable to authorize");
    }

    let response = new Response();

    if (token !== null && params.body) {
      response = await createSpending(params.body);
    }
    const result = await response.json();

    if (response.status !== 200) {
      params.setError(result.errorMessage);
      return;
    }

    return result;
  }
);

export const deleteSpendingThunk = createAsyncThunk(
  "spendings/delete",
  async (id: string): Promise<string> => {
    const response = await deleteSpending(id);

    if (response.status !== 204) {
      console.log("pasasi");
    }
    return id;
  }
);

export default getSpendingThunk;