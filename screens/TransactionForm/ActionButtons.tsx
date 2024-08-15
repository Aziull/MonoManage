import { Text } from "react-native"
import { useKeyboardVisible } from "../../hook/useKeyboardVisible"
import { StyleSheet } from "react-native"
import { colors } from "./constants"
import Button, { ButtoPropsType } from "../../components/button/Button"

type Props = {
    type: 'expense' | 'income',
    handleSave: () => void,
} & ButtoPropsType

const ActionButtons = ({ type, handleSave, style, ...props }: Props) => {
    const isKeyboardVisable = useKeyboardVisible()

    return (<>
        <Button
            size="sm"
            style={[
                style,
            ]}
            onPress={handleSave}
             {...props}
             >
            Зберегти
        </Button>
    </>)
}

export default ActionButtons;
