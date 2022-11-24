import { createAsyncThunk } from "@reduxjs/toolkit";
import useJwtToken from "../../hooks/useJwtToken";
import { getSpendings } from "../../pages/api/spendings";
import { SpendingReportDto } from "../../types/User/Spending/spending";

type ThunkParam = {
  setError: (err: string) => void;
  beginDate: string;
  orderBy?: string;
  cardId: string;
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

    if (token !== null) {
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

export default getSpendingThunk;
