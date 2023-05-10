import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cardSlice from "./slices/cardSlice";
import spendingSlice from "./slices/spendingSlice";
import categorySlice from "./slices/categorySlice";
import userSlice from "./slices/userSlice";
import accountSlice from "./slices/accountSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cards: cardSlice,
    spending: spendingSlice,
    category: categorySlice,
    user: userSlice,
    accounts: accountSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
