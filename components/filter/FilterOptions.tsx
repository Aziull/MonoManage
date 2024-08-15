import { Animated, Dimensions, ScrollView, StyleSheet } from "react-native";
import FilterOption from "./filterOption";
import Timeframe from "./criteria/Timeframe";
import { ReactNode, useEffect, useRef } from "react";
import { useKeyboardVisible } from "../../hook/useKeyboardVisible";
import Accounts from "./criteria/accounts/Accounts";

type Filter = {
    name: string,
    onPress: () => void,
    Component: React.FC<{ close: () => void }>;
}

const filters: Filter[] = [
    { name: "За періодом", onPress: () => { }, Component: Timeframe },
    // { name: "За рахунками", onPress: () => { }, Component: Accounts },
    // { name: "За категоріями", onPress: () => { }, Component: Timeframe, apply: () => { } },
]

const FilterOptions = () => {

    return (
        <Animated.ScrollView keyboardShouldPersistTaps="always" horizontal contentContainerStyle={[styles.filterContainer]} >
            {
                filters.map((filter, index) => (
                    <FilterOption key={index} name={filter.name} onPress={filter.onPress} Component={filter.Component} />
                ))
            }
        </Animated.ScrollView >
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        paddingHorizontal: 8,
        gap: 5,
    },
});

export default FilterOptions;