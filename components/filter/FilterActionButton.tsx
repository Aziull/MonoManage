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
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#512DA8",

        backgroundColor: "#522da8e",

        paddingVertical: 3,
        paddingHorizontal: 10,
    }
});

export default FilterActionButton;