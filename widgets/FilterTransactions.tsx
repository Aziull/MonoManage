import { StyleSheet, View } from "react-native"
import Search from "../components/transactionSearch/search"
import { useState } from "react";
import FilterActionButton from "../components/filter/FilterActionButton";
import FilterOptions from "../components/filter/FilterOptions";
import Button from "../components/button/Button";



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
                <Button
                    style={[styles.filters]}
                    variant={'outline'}
                    size={'sm'}
                    color="#EDE7F5"
                    icon={{
                        name: showFilters ? 'arrow-down' : 'arrow-up',
                        size: 15,
                        color: '#512DA8',
                        containerStyle: {
                            marginRight: 0
                        }

                    }}
                    onPress={handleActionButtonPress}
                    textStyle={styles.text}
                >
                    фільтри
                </Button>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    filters: {
        flex: 1,
        borderColor: "rgba(104, 58, 183, 0.4)",
        marginRight: 5,
    },
    text: {
        fontSize: 15,
        color: '#512DA8',
    }
});


export default FilterTransactions