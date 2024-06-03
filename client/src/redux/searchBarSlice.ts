import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface searchQueryState {
    name: string;
    text: string;
}

const initialState: searchQueryState = {
    name: '',
    text: ''
}

export const searchQuerySlice = createSlice({
    name: 'searchQuery',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        }
    }
});

export const { setName, setText } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;