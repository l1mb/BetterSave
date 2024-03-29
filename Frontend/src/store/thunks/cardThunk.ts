import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCards, createCard, deleteCard, updateCard } from "@/api/cardsApi";
import { StatusCodes } from "@/api/codes";
import { Card } from "../../types/User/Cards/card";
import useJwtToken from "../../hooks/useJwtToken";

type ThunkParam = {
  setError: (err: string) => void;
  value?: Partial<Card>;
};

const getCardsThunk = createAsyncThunk("cards/my", async (params: ThunkParam): Promise<Card[]> => {
  const { getToken } = useJwtToken();
  const token = getToken();

  if (token == null) {
    params.setError("Unable to authorize");
  }

  let response = new Response();
  if (token !== null) {
    response = await getCards(token);
  }
  const result = await response.json();

  if (response.status !== 200) {
    params.setError(result.errorMessage);
    return [];
  }

  return result;
});

export const createCardThunk = createAsyncThunk("cards/create", async (params: ThunkParam): Promise<Card | null> => {
  const { getToken } = useJwtToken();
  const token = getToken();

  if (token == null) {
    params.setError("Unable to authorize");
  }

  let response = new Response();
  if (token !== null && params.value) {
    response = await createCard(params.value);
  }
  const result = await response.json();

  if (response.status !== 201) {
    params.setError(result.errorMessage);
    return null;
  }

  return result;
});

export const deleteCardThunk = createAsyncThunk("cards/delete", async (params: ThunkParam): Promise<string> => {
  const { getToken } = useJwtToken();
  const token = getToken();
  if (token == null || !params.value?.id) {
    params.setError("Unable to authorize");
  }

  let response = new Response();
  if (token !== null && params.value && params.value.id) {
    response = await deleteCard(params?.value?.id);
  }
  if (response.status !== StatusCodes.NoContent) {
    const result = await response.json();
    params.setError(result.errorMessage);
    return "";
  }

  return params.value?.id as string;
});

export const updateCardThunk = createAsyncThunk("cards/update", async (params: ThunkParam): Promise<Card | null> => {
  const { getToken } = useJwtToken();
  const token = getToken();
  if (token == null || !params.value?.id) {
    params.setError("Unable to authorize");
  }

  let response = new Response();

  if (token !== null && params.value && params.value.id) {
    response = await updateCard({
      id: params?.value?.id,
      balance: params?.value?.balance,
    });
  }
  const result = await response.json();

  if (response.status !== StatusCodes.Ok) {
    params.setError(result.errorMessage);

    return null;
  }

  return result;
});

export default getCardsThunk;
