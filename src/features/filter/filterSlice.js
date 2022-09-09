import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filterText: '',
    filterType: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterSelected: (state, action) => {
            state.filterText = action.payload;
            state.filterType = action.payload;
        },
        filterRemoved: (state, action) => {
            state.filterText = '';
            state.filterType = '';
        },
    },
});
export default createSlice.reducer;
export const { filterRemoved, filterSelected } = filterSlice.actions;
