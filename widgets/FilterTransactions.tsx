import { View } from "react-native"
import Search from "../components/transactionSearch/search"
import FilterOptions from "../components/filter/FilterOptions";
import { useKeyboardVisible } from "../hook/useKeyboardVisible";



const FilterTransactions = () => {

    return (
        <View>
            <FilterOptions />
            <Search />
        </View>

    )
}
export default FilterTransactions