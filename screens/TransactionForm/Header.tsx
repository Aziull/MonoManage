import { View } from "react-native"
import Button from "../../components/Button"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
    onExit: () => void,
    children?: React.ReactNode,
}

const Header = ({ onExit, children }: Props) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 40,
            paddingLeft: 16,
            paddingBottom: 15,
            marginHorizontal: -16,
            borderBottomWidth: 1,
            borderColor: 'rgba(82, 45, 168, 0.5)',
        }}>
            <Button
                onPress={onExit}>
                <MaterialIcons
                    name="close"
                    size={30}
                    color={'#512DA8'}
                />
            </Button>
            <View style={{
                flex: 1,
            }}>
                {children}
            </View>

        </View>
    )
}

export default Header