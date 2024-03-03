import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateRange, FiltersState } from './types';
import dayjs, { Dayjs } from 'dayjs';

const today = new Date();
const initialState: FiltersState = {
    dateRange: { start: new Date(today.getFullYear(), today.getMonth(), 1).getTime(), end: today.getTime() },
    accountIds: [],
    description: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setDateRange(state, action: PayloadAction<DateRange>) {
            state.dateRange = action.payload;
        },
        setAccountId(state, action: PayloadAction<string[]>) {
            state.accountIds.push(...action.payload);
        },
        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload;
        },
    },
});

export const { setDateRange, setAccountId, setDescription } = filtersSlice.actions;

export default filtersSlice.reducer;