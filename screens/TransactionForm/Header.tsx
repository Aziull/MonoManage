import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import Button from "../../components/button/Button";

type Props = {
    onExit?: () => void,
}

const Header = ({ onExit }: Props) => {
    const navigation = useNavigation();
    const handleExit = () => {
        Alert.alert(
            "Підтвердження",
            "Ви впевнені, що хочете вийти?",
            [
                {
                    text: "Скасувати",
                    style: "cancel"
                },
                { text: "Вийти", onPress: () => navigation.goBack() }
            ],
            { cancelable: false }
        );
        if (onExit) onExit();
    };
    return (
            <Button
                variant='ghost'
                onPress={handleExit}
                size="icon"
                style={{
                    padding: 0
                }}
                icon={{
                    name: "close",
                    size: 28,
                    color: '#512DA8',
                }}
            />
    )
}

export default Header