import Checkbox from "expo-checkbox"
import { Text, View } from "react-native"
import { Account } from "../../../../features/accounts/types"
import Button from "../../../button/Button"

type PropsType = {
    account: Account,
    selected: boolean,
    onSelectChange: (id: string) => void,
}

const AccountItem = ({ account, selected, onSelectChange }: PropsType) => {
    const handleSelectionChange = () => {
        onSelectChange(account.id);
    };

    return <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    }}>
        <Button
            variant={'secondary'}
            width="full"
            align='left'
            onPress={() => { handleSelectionChange() }}
            style={{
                paddingRight: 0,
            }}
            containerStyle={{
                width: '100%',
                paddingRight: 12,
                justifyContent: 'space-between',
            }}
        >
            <Text>
                {account.name}
            </Text>

            <Checkbox
                value={selected}
                onValueChange={() => handleSelectionChange()}
                style={{
                    borderRadius: 6,
                }}
                color={"#512DA8"} />
        </Button>

    </View>
}

export default AccountItem