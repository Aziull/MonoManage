import { Animated, ScrollView, StyleSheet } from "react-native";
import FilterOption from "./filterOption";
import Timeframe from "./criteria/Timeframe";
import { useEffect, useRef } from "react";
import { useKeyboardVisible } from "../../hook/useKeyboardVisible";
import Accounts from "./criteria/accounts/Accounts";


const filters = [
    { name: "За періодом", onPress: () => { }, Component: Timeframe },
    { name: "За рахунками", onPress: () => { }, Component: Accounts },
    // { name: "За категоріями", onPress: () => { }, Component: Timeframe, apply: () => { } },
]

const FilterOptions = ({ visible }: { visible: boolean }) => {
    const heightAnim = useRef(new Animated.Value(0)).current;

    const isKeyboard = useKeyboardVisible();
    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [visible, heightAnim]);

    const interpolatedHeight = heightAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', !isKeyboard ? '7%' : '12%'],
    });
    return (
        <Animated.ScrollView keyboardShouldPersistTaps="always" horizontal contentContainerStyle={[styles.filterContainer]} style={[{ height: interpolatedHeight }]}>
            {filters.map((filter, index) => (
                <FilterOption key={index} name={filter.name} onPress={filter.onPress} Component={filter.Component} />
            ))}
        </Animated.ScrollView>
    );
};

// Додамо стилі для компонента фільтрів
const styles = StyleSheet.create({
    filterContainer: {
        padding: 5,
        gap: 5,
        height: 40,
    },
});

export default FilterOptions;