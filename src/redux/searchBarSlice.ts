import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface searchQueryState {
    query: string;
}

const initialState: searchQueryState = {
    query: ''
}

export const searchQuerySlice = createSlice({
    name: 'searchQuery',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        }
    }
});

export const { setQuery } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;