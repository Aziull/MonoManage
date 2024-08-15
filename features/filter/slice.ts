import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateRange, FiltersState } from './types';
import dayjs, { Dayjs } from 'dayjs';
import { getAccounts } from '../accounts/thunks';

const today = new Date();
const initialState: FiltersState = {
    timeframe: { title: "Вручну" ,  start: new Date(today.getFullYear(), today.getMonth(), 1).getTime(), end: today.getTime() },
    accountsId: [],
    description: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setDateRange(state, action: PayloadAction<DateRange>) {
            state.timeframe = action.payload;
        },
        setAccountsId(state, action: PayloadAction<string[]>) {
            state.accountsId = action.payload;
        },
        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAccounts.fulfilled, (state, action) => {
            state.accountsId = action.payload.map(({id}) => id);
        })
    }
});

export const { setDateRange, setAccountsId, setDescription } = filtersSlice.actions;

export default filtersSlice.reducer;