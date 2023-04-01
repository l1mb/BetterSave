/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { Card } from "../../types/User/Cards/card";
import getCardsThunk, { createCardThunk, deleteCardThunk, updateCardThunk } from "../thunks/cardThunk";

export type CardState = {
  cards: Card[];
};

const initState: CardState = {
  cards: [],
};

const cardSlice = createSlice({
  name: "cards/get",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCardsThunk.fulfilled, (state, action) => {
      state.cards = action.payload;
    });
    builder.addCase(createCardThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.cards = [...state.cards, action.payload];
      }
      return state;
    });
    builder.addCase(deleteCardThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.cards = state.cards.filter((card) => card.id !== action.payload);
      }

      return state;
    });
    builder.addCase(updateCardThunk.fulfilled, (state, action) => {
      if (action.payload && action.payload.id) {
        const item = state.cards.find((el) => el.id === action.payload?.id);
        if (item) {
          const index = state.cards.indexOf(item);
          if (index !== -1) {
            state.cards[index] = action.payload;
          }
        }
      }

      return state;
    });
  },
});

export default cardSlice.reducer;
