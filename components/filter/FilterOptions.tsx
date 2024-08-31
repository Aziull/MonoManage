import React, { useMemo } from "react";
import { Animated, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectAllAccounts } from "../../features/accounts/slice";
import { resetFilters } from "../../features/filter/slice";
import { AccountsIds, DateRange, FiltersState } from "../../features/filter/types";
import { AppDispatch, RootState } from "../../store";
import Button from "../button/Button";
import { DEFAULT_VALUES } from "./constants";
import Timeframe from "./criteria/Timeframe";
import Accounts from "./criteria/accounts/Accounts";
import FilterOption from "./filterOption";

export type ComponentProps = {
    filter: Partial<FiltersState>;
    close: () => void;
};
export type FilterProps = Partial<FiltersState>;
export type Filter = {
    Component: React.FC<ComponentProps>;
    filterProps: Partial<FiltersState>;
    filterLabel: string;
    isDefaultLabel: boolean;
};



const getTimeframeLabel = (timeframe: DateRange): string => {
    const formatDate = (date: number) => new Date(date).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'short',
        year: "numeric"
    });

    if (timeframe.title === 'Вручну') {
        return `${formatDate(timeframe.start!)} - ${formatDate(timeframe.end!)}`;
    }

    return timeframe.title;
};

const getAccountsLabel = (accountsId: AccountsIds, accounts: ReturnType<typeof selectAllAccounts>): string => {
    if (!accountsId || accounts.length === accountsId.length) return DEFAULT_VALUES.Accounts;
    if (accountsId.length === 1) return accounts.find(acc => acc.id === accountsId[0])?.name || DEFAULT_VALUES.Accounts;
    return `${accountsId.length} рахунки`;
};

const FilterOptions = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { timeframe, accountsId } = useSelector((state: RootState) => state.filters);
    const accounts = useSelector(selectAllAccounts);

    const filters: Filter[] = useMemo(() => {
        const timeframeLabel = getTimeframeLabel(timeframe);
        const accountsLabel = getAccountsLabel(accountsId, accounts);

        return [
            { Component: Timeframe, filterProps: { timeframe }, filterLabel: timeframeLabel, isDefaultLabel: timeframeLabel === DEFAULT_VALUES.Timeframe },
            { Component: Accounts, filterProps: { accountsId }, filterLabel: accountsLabel, isDefaultLabel: accountsLabel === DEFAULT_VALUES.Accounts },
            // TODO: додати за категоріями
        ];
    }, [timeframe, accountsId, accounts]);

    const hasDifferentFilters = useMemo(() => {
        return filters.some(({ Component, filterLabel }) => {
            if (Component === Timeframe) return filterLabel !== DEFAULT_VALUES.Timeframe;
            if (Component === Accounts) return filterLabel !== DEFAULT_VALUES.Accounts;
            return false;
        });
    }, [filters]);

    return (
        <Animated.ScrollView
            keyboardShouldPersistTaps="always"
            horizontal
            contentContainerStyle={styles.filterContainer}
        >
            {hasDifferentFilters && (
                <Button
                    shape='roundedFull'
                    size='sm'
                    variant='ghost'
                    onPress={() => dispatch(resetFilters())}
                >
                    Скинути
                </Button>
            )}
            {filters.map((filter, index) => (
                <FilterOption
                    key={index}
                    {...filter}
                />
            ))}
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        paddingHorizontal: 8,
        gap: 5,
    },
});

export default FilterOptions;
