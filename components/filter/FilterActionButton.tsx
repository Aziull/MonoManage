import { StyleSheet } from "react-native";
import Button from "../Button"
import { Text } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
type PropsType = {
    onPress: () => void,
    title: string,
    iconName: string
}

const FilterActionButton: React.FC<PropsType> = ({ onPress, title, iconName }) => {
    return (
        <Button containerStyle={styles.container} style={[styles.filters]} onPress={onPress}>
            <MaterialIcons style={styles.icon} name={iconName} size={15} />
            <Text numberOfLines={1} style={styles.text}>
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

        marginRight: 5,

        elevation: 2,
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { height: 2, width: 0 },
        position: 'relative',
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: '#512DA8',
        position: 'absolute',
        left: 0,
    },
    text: {
        fontSize: 15,
        color: '#512DA8', // Використовуємо основний колір для тексту
    }
});

export default FilterActionButton;