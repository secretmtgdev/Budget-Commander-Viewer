import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardTypeSelectionState {
    cardTypes: string[];
    noOtherCardTypes: boolean;
}

const initialState: CardTypeSelectionState = {
    cardTypes: [],
    noOtherCardTypes: false
}

export const cardTypeSelectionSlice = createSlice({
    name: 'cardTypeSelection',
    initialState,
    reducers: {
        resetCardTypes: (state, action: PayloadAction<null>) => {
            state.cardTypes = [];
        },
        addCardType: (state, action: PayloadAction<string>) => {
            state.cardTypes.push(action.payload);
        },
        removeCardType: (state, action: PayloadAction<string>) => {
            const cardTypeIndex = state.cardTypes.indexOf(action.payload);
            if (cardTypeIndex >= 0) {
                state.cardTypes.splice(cardTypeIndex, 1);
            }
        },
        setNoOtherCardTypes: (state, action: PayloadAction<boolean>) => {
            state.noOtherCardTypes = action.payload;
        }
    }
});

export const { 
    resetCardTypes,
    addCardType,
    removeCardType,
    setNoOtherCardTypes
} = cardTypeSelectionSlice.actions;
export default cardTypeSelectionSlice.reducer;