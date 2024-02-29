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

    const applyFilters = () => {
        // Тут можна додати логіку для застосування фільтрів
    };

    if (!visible) {
        return null;
    }

    return (
        <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
            {filters.map((e, index) => (
                <FilterOption key={index} name={e.name} onPress={e.onPress} component={e.component} />
            ))}
        </ScrollView>
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