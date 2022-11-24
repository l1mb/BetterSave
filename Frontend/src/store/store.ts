import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cardSlice from "./slices/cardSlice";
import spendingSlice from "./slices/spendingSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cards: cardSlice,
    spending: spendingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
