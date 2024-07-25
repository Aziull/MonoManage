import { Text } from "react-native"
import Button from "../../components/Button"
import { useKeyboardVisible } from "../../hook/useKeyboardVisible"
import { StyleSheet } from "react-native"
import { colors } from "./constants"

type Props = {
    type: 'expense' | 'income',
    handleSave: () => void,
}

const ActionButtons = ({ type, handleSave }: Props) => {
    const isKeyboardVisable = useKeyboardVisible()

    return (<>
        {
            !isKeyboardVisable && (<Button style={({ pressed }) => [
                styles.actionButton,
                 { backgroundColor: type === 'expense' ? colors.expense : colors.income}
            ]}
                onPress={handleSave}>
                <Text style={styles.actionButtonText}>Зберегти</Text>
            </Button>
            )
        }
    </>)
}

const styles = StyleSheet.create({
    actionButton: {
        marginVertical: 10,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    actionButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default ActionButtons;
