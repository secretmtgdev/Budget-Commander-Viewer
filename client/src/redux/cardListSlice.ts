import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScryfallLib } from "../utils/Types";

interface CardListState {
    cards: ScryfallLib.ICard[],
    nextCardListUrl: string;
}

const initialState: CardListState = {
    cards: [],
    nextCardListUrl: ''
}

export const cardListSlice = createSlice({
    name: 'cardList',
    initialState,
    reducers: {
        setCardList: (state, action: PayloadAction<ScryfallLib.ICard[]>) => {
            state.cards = action.payload;            
        },
        setNextCardListUrl: (state, action: PayloadAction<string>) => {
            state.nextCardListUrl = action.payload;
        }
    }
});

export const { setCardList, setNextCardListUrl } = cardListSlice.actions;
export default cardListSlice.reducer;