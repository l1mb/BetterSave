/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { Card } from "../../types/User/Cards/card";
import getCardsThunk from "../thunks/cardThunk";

export type CardState = Card;

const initState: CardState[] = [];

const cardSlice = createSlice({
  name: "cards/get",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCardsThunk.fulfilled, (state, action) => [
      ...action.payload,
    ]);
  },
});

export default cardSlice.reducer;
