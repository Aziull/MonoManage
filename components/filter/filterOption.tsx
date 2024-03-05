import { StyleSheet, Text, View } from "react-native";
import Button from "../Button";
import { useState } from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomSheet from "../../modal/BottomSheet";

type PropsType = {
    name: string,
    onPress: () => void,
    Component: () => React.JSX.Element
}

const FilterOption = ({ name, onPress, Component }: PropsType) => {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const toggleBottomSheet = () => setIsBottomSheetVisible((prev) => !prev);
    return (
        <>
            <Button onPress={toggleBottomSheet} style={styles.button} containerStyle={styles.buttonContainer} >
                <Text style={styles.text}> {name} </Text>
                <MaterialIcons style={styles.icon} name={'keyboard-arrow-down'} size={15} />
            </Button>
            <BottomSheet style={{ backgroundColor: '#EDE7F6' }} isVisible={isBottomSheetVisible} onDismiss={toggleBottomSheet}>
                <Component />
            </BottomSheet>
        </>

    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: "rgba(104, 58, 183, 0.2)",
        borderRadius: 5,
        backgroundColor: "#EDE7F6",

        paddingHorizontal: 5, // Додаємо горизонтальний падінг
        
        justifyContent: "center", // Вирівнюємо текст та іконку по різних кінцях кнопки
        alignItems: "center",

        elevation: 3, // Легке збільшення тіні для кращого візуального ефекту
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",

    },
    text: {
        fontSize: 14,
        color: "#673AB7",
        flex: 1,
    },
    icon: {
        color: "#673AB7",
        marginLeft: 8, // Додано відступ зліва для іконки
    }
});

export default FilterOption;