import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import DateUtils from '../../utils/timeUtils';
import { selectBankAccounts } from '../accounts/slice';
import { createCashAccount, getAccounts } from '../accounts/thunks';
import { convertToDate } from './lib';
import { DateRange, FiltersState, RangeNames } from './types';

const initialTimeframe: DateRange = { title: 'Весь час' };
const initialState: FiltersState = {
    timeframe: initialTimeframe,
    accountsId: undefined,
    description: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setDateRange: {
            reducer: (state, action: PayloadAction<DateRange>) => {
                state.timeframe = action.payload;
            },
            prepare: (timeframe: { title: RangeNames, start?: number, end?: number }) => {
                if (!timeframe.start && !timeframe.end) return { payload: initialTimeframe };
                const { start, end } = timeframe;
                const adjustedStart = start ?? end;
                const adjustedEnd = end ?? start;

                return {
                    payload: {
                        title: timeframe.title,
                        start: DateUtils.getStartOfUnixDay(adjustedStart),
                        end: DateUtils.getEndOfUnixDay(adjustedEnd),
                    },
                };
            }
        },
        setAccountsId(state, action: PayloadAction<string[]>) {
            state.accountsId = action.payload;
        },
        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload;
        },
        resetFilters(state) {
            state.timeframe = initialState.timeframe;
            state.accountsId = initialState.accountsId;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAccounts.fulfilled, (state, action) => {
                state.accountsId = action.payload.map(({ id }) => id);
            })
            .addCase(createCashAccount.fulfilled, (state, action) => {
                state.accountsId?.push(action.payload.id)
            })
    }
});
const selectTimeframe = (state: RootState) => state.filters.timeframe;
export const selectTimeframeDate = createSelector([selectTimeframe], (timeframe) => {
    return {
        title: timeframe.title,
        start: convertToDate(timeframe.start),
        end: convertToDate(timeframe.end),
    }
})

const selectIds = (state: RootState) => state.filters.accountsId;
export const selectActiveBankIds = createSelector([selectBankAccounts, selectIds], (banks, selectIds) => {
    return selectIds?.filter(id => banks.some(bank => bank.id === id));
})

export const { setDateRange, setAccountsId, setDescription, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;