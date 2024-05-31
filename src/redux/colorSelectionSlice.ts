import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColorSelectionState {
    colors: string[];
    areSingle: boolean;
    areGuild: boolean;
    areShard: boolean;
    isFourColor: boolean;
}

const initialState: ColorSelectionState = {
    colors: [],
    areSingle: false,
    areGuild: false,
    areShard: false,
    isFourColor: false
}

export const colorSelectionSlice = createSlice({
    name: 'colorSelection',
    initialState,
    reducers: {
        addColor: (state, action: PayloadAction<string>) => {
            state.colors.push(action.payload)
        },
        removeColor: (state, action: PayloadAction<string>) => {
            const index = state.colors.indexOf(action.payload);
            if (index !== -1) {
                state.colors.splice(index, 1);
            }
        },
        setAreSingle: (state, action: PayloadAction<boolean>) => {
            state.areSingle = action.payload;
        },
        setIsGuild: (state, action: PayloadAction<boolean>) => {
            state.areGuild = action.payload;
        },
        setIsShard: (state, action: PayloadAction<boolean>) => {
            state.areShard = action.payload;
        },
        setIsFourColor: (state, action: PayloadAction<boolean>) => {
            state.isFourColor = action.payload;
        }
    }
});

export const { addColor, removeColor, setAreSingle, setIsGuild, setIsShard, setIsFourColor } = colorSelectionSlice.actions;
export default colorSelectionSlice.reducer;