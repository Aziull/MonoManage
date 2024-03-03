import { ModalProps, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../Button";
import { useState } from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomSheet from "../../modal/BottomSheet";

type PropsType = {
    name: string,
    onPress: () => void,
    Component: () => React.JSX.Element
}

// Припустимо, у нас є функціональний компонент FilterOptions
const FilterOption = ({ name, onPress, Component }: PropsType) => {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const toggleBottomSheet = () => setIsBottomSheetVisible((prev) => !prev);
    // const toggleBottomSheet = () => setIsBottomSheetVisible(false);
    return (
        <Button onPress={toggleBottomSheet} >
            <View style={styles.container}>
                <Text > {name} </Text>
                <MaterialIcons style={styles.icon} name={'keyboard-arrow-down'} size={15} />
            </View>

            <BottomSheet style={{backgroundColor: '#EDE7F6'}} isVisible={isBottomSheetVisible} onDismiss={toggleBottomSheet}>
                <Component  />
            </BottomSheet>
        </Button>
    );
};

// Додамо стилі для компонента фільтрів
const styles = StyleSheet.create({ 
    container: {
        maxHeight: 40,
        flexDirection: 'row',
        alignItems: 'flex-end',

        paddingHorizontal: 5,
        paddingVertical: 2,
        borderWidth: 1,
        borderRadius: 15,

    },
    icon: {
        // marginTop:5,
    }
});

export default FilterOption;