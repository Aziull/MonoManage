import { StyleSheet, Text, View } from "react-native";
import { useCallback, useRef, useState } from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomSheet from "../../modal/BottomSheet";
import Button from "../button/Button";
import { colors } from "../../theme";

type PropsType = {
    name: string,
    onPress: () => void,
    Component: React.FC<{ close: () => void }>;
}

const FilterOption = ({ name, Component }: PropsType) => {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const toggleBottomSheet = () => setIsBottomSheetVisible((prev) => !prev);
    return (
        <>
            <Button
                shape='roundedFull'
                size={'sm'}
                variant={'ghost'}
                onPress={toggleBottomSheet}
                style={styles.button}
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
                {name}
            </Button>
            <BottomSheet isVisible={isBottomSheetVisible} onDismiss={toggleBottomSheet}>
                <Component close={toggleBottomSheet} />
            </BottomSheet>
        </>

    );
};

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