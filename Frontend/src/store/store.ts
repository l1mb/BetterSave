import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cardSlice from "./slices/cardSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cards: cardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
