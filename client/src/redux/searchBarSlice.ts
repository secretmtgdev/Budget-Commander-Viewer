import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface searchQueryState {
    name: string;
    text: string;
    alias: string;
}

const initialState: searchQueryState = {
    name: '',
    text: '',
    alias: ''
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
        },
        setAlias: (state, action: PayloadAction<string>) => {
            state.alias = action.payload;
        }
    }
});

export const { setAlias, setName, setText } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;