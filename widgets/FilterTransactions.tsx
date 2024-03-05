import { View } from "react-native"
import Search from "../components/transactionSearch/search"
import { useState } from "react";
import FilterActionButton from "../components/filter/FilterActionButton";
import FilterOptions from "../components/filter/FilterOptions";



const FilterTransactions = () => {
    const [showFilters, setIsShowFilters] = useState(false);
    const handleActionButtonPress = () => {
        setIsShowFilters(prev => !prev)
    }

    return (
        <View>
            <FilterOptions visible={showFilters} />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Search onSearch={() => { }} onFocusChange={() => { }} />
                <FilterActionButton title={showFilters ? 'cховати фільтри' : 'показати фільтри'} onPress={handleActionButtonPress} />
            </View>
        </View>

    )
}

export default FilterTransactions