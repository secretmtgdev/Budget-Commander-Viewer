import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceSelectionState {
    minPrice: number;
    maxPrice: number;
}

const initialState: PriceSelectionState = {
    minPrice: 0,
    maxPrice: Infinity
}

export const priceSelectionSlice = createSlice({
    name: 'priceSelection',
    initialState,
    reducers: {
        setMinPrice: (state, action: PayloadAction<number>) => {
            state.minPrice = action.payload;
        },
        setMaxPrice: (state, action: PayloadAction<number>) => {
            state.maxPrice = action.payload
        }
    }
});

export const { setMinPrice, setMaxPrice } = priceSelectionSlice.actions;
export default priceSelectionSlice.reducer;