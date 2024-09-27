import { configureStore } from "@reduxjs/toolkit";
import groceriesReducer from "./features/groceriesSlice";

export const store = configureStore({
  reducer: {
    groceries: groceriesReducer,
  },
});
