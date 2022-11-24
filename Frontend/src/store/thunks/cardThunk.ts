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
    const { getToken } = useJwtToken();
    const token = getToken();

    if (token == null) {
      params.setError("Unable to authorize");
    }

    console.log(token);
    let response = new Response();
    if (token !== null) {
      response = await getCards(token);
    }
    const result = await response.json();

    console.log("here");
    if (response.status !== 200) {
      params.setError(result.errorMessage);
      return [];
    }
    console.log("there");

    return result;
  }
);

export default getCardsThunk;
