import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColorSelectionState {
    value: string[];
}

const initialState: ColorSelectionState = {
    value: []
}

export const colorSelectionSlice = createSlice({
    name: 'colorSelection',
    initialState,
    reducers: {
        addColor: (state, action: PayloadAction<string>) => {
            state.value.push(action.payload)
        },
        removeColor: (state, action: PayloadAction<string>) => {
            const index = state.value.indexOf(action.payload);
            if (index !== -1) {
                state.value.splice(index, 1);
            }
        }
    }
});

export const { addColor, removeColor } = colorSelectionSlice.actions;
export default colorSelectionSlice.reducer;