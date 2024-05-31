import { configureStore } from "@reduxjs/toolkit";
import colorSelectionReducer from './colorSelectionSlice';
import priceSelectionSlice from "./priceSelectionSlice";
import cardListSlice from "./cardListSlice";
import searchQuerySlice from "./searchBarSlice";
import cardTypeSelectionSlice from "./cardTypeSelectionSlice";

export const store = configureStore({
   reducer: {
      colorSelection: colorSelectionReducer,
      priceSelection: priceSelectionSlice,
      cardList: cardListSlice,
      searchQuery: searchQuerySlice,
      cardTypeSelection: cardTypeSelectionSlice
   } 
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;