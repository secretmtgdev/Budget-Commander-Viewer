import { configureStore } from "@reduxjs/toolkit";
import colorSelectionReducer from './colorSelectionSlice';

export const store = configureStore({
   reducer: {
      colorSelection: colorSelectionReducer
   } 
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;