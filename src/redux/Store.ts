import { configureStore } from "@reduxjs/toolkit";
import colorSelectionReducer from './colorSelectionSlice';
import priceSelectionSlice from "./priceSelectionSlice";
import cardListSlice from "./cardListSlice";

export const store = configureStore({
   reducer: {
      colorSelection: colorSelectionReducer,
      priceSelection: priceSelectionSlice,
      cardList: cardListSlice
   } 
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;