import { Animated, ScrollView, StyleSheet } from "react-native";
import FilterOption from "./filterOption";
import Timeframe from "./criteria/Timeframe";
import { useEffect, useRef } from "react";


const filters = [
    {
        name: "За категоріями",
        onPress: () => { },
        component: <Timeframe />
    },
    {
        name: "За акаунтами",
        onPress: () => { },
        component: <Timeframe />
    },
    {
        name: "За датою",
        onPress: () => { },
        component: <Timeframe />
    }
]

const FilterOptions = ({ visible }: { visible: boolean }) => {
    // Створення анімованого значення для контролю висоти
    const heightAnim = useRef(new Animated.Value(0)).current; // Початкове значення 0

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: false, 
        }).start();
    }, [visible, heightAnim]);

    const interpolatedHeight = heightAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '7%'], // Зміна висоти від 0% до 100%
    });

    return (
        <Animated.ScrollView horizontal contentContainerStyle={[styles.filterContainer]} style={[{ height: interpolatedHeight }]}>
                {filters.map((filter, index) => (
                    <FilterOption key={index} name={filter.name} onPress={filter.onPress} component={filter.component} />
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