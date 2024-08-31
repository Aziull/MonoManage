import { StyleSheet } from "react-native";
import { memo, useState } from "react";
import BottomSheet from "../../modal/BottomSheet";
import Button from "../button/Button";
import { colors } from "../../theme";
import { Filter } from "./FilterOptions";

type PropsType = Filter;

const FilterOption = memo(({ Component, filterProps, filterLabel, isDefaultLabel }: PropsType) => {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const toggleBottomSheet = () => setIsBottomSheetVisible((prev) => !prev);

    return (
        <>
            <Button
                shape='roundedFull'
                size={'sm'}
                variant={'ghost'}
                onPress={toggleBottomSheet}
                style={isDefaultLabel ? styles.button : [styles.button, {borderColor: colors.purple[900]}]}
                textStyle={styles.text}
                icon={{
                    name: "chevron-down", size: 16,
                    color: colors.purple[800],
                    containerStyle: {
                        marginRight: 0
                    }
                }}
                containerStyle={{
                    flexDirection: 'row-reverse',
                }}
            >
                {filterLabel}
            </Button>
            <BottomSheet isVisible={isBottomSheetVisible} onDismiss={toggleBottomSheet}>
                <Component filter={filterProps} close={toggleBottomSheet} />
            </BottomSheet>
        </>

    );
});

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: colors.purple[300],
        paddingHorizontal: 8,
    },
    text: {
        fontWeight: 'normal',
        color: colors.purple[800],
        fontSize: 16,
    },
    icon: {
        marginLeft: 8, // Додано відступ зліва для іконки
    }
});

export default FilterOption;