import { createAsyncThunk } from "@reduxjs/toolkit";
import { Card } from "../../types/User/Cards/card";
import useJwtToken from "../../hooks/useJwtToken";
import { getCards } from "../../pages/api/cardsApi";

type ThunkParam = {
  setError: (err: string) => void;
};

const getCardsThunk = createAsyncThunk(
  "cards/my",
  async (params: ThunkParam): Promise<Card[]> => {
    const { decodeToken } = useJwtToken();
    const token = decodeToken();

    if (token == null || token?.id) {
      params.setError("Unable to authorize");
    }

    let response = new Response();
    if (token !== null) {
      response = await getCards(token.id);
    }
    const result = await response.json();

    if (response.status !== 200) {
      params.setError(result.errorMessage);
      return [];
    }

    return result;
  }
);

export default getCardsThunk;
