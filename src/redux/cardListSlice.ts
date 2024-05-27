import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScryfallLib } from "../utils/Types";

interface CardListState {
    cards: ScryfallLib.ICard[]
}

const initialState: CardListState = {
    cards: []
}

export const cardListSlice = createSlice({
    name: 'priceSelection',
    initialState,
    reducers: {
        setCardList: (state, action: PayloadAction<ScryfallLib.ICard[]>) => {
            state.cards = action.payload;            
        }
    }
});

export const { setCardList } = cardListSlice.actions;
export default cardListSlice.reducer;