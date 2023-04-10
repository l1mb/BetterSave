import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cardSlice from "./slices/cardSlice";
import spendingSlice from "./slices/spendingSlice";
import categorySlice from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cards: cardSlice,
    spending: spendingSlice,
    category: categorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
