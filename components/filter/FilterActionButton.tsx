import { StyleSheet } from "react-native";
import Button from "../Button"
import { Text } from "react-native";

type PropsType = {
    onPress: () => void,
    title: string
}

const FilterActionButton: React.FC<PropsType> = ({ onPress, title }) => {
    return (
        <Button style={[styles.filters]} onPress={onPress}>
            <Text style={{
                fontSize: 15,
                color: '#512DA8'
            }}>
                {title}
            </Text>
        </Button>
    )
}

const styles = StyleSheet.create({
    filters: {
        flex: 1,
        backgroundColor: '#EDE7F5',

        paddingVertical: 3,
        paddingHorizontal: 10,

        borderWidth: 1,
        borderColor: "rgba(104, 58, 183, 0.4)",
        borderRadius: 8, 
        alignItems: 'center',
        justifyContent: 'center', 

        marginRight: 5,

        elevation: 2,
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { height: 2, width: 0 },

    },
    text: {
        fontSize: 16,
        fontWeight: '600', // Збільшуємо вагу шрифту для кращої видимості
        color: '#512DA8', // Використовуємо основний колір для тексту
    }
});

export default FilterActionButton;