import { Text, View } from "react-native"
import Button from "../../../Button"
import Checkbox from "expo-checkbox"
import { Account } from "../../../../features/accounts/types"
import { useEffect, useState } from "react"

type PropsType = {
    account: Account,
    selected: boolean,
    onSelectChange: (id: string) => void,
}

const AccountItem = ({ account, selected, onSelectChange }: PropsType) => {
    const handleSelectionChange = () => {
        onSelectChange(account.id);
    };

    return <Button
        onPress={() => { handleSelectionChange() }}
        containerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 15,
        }}>
            <View style={{
                backgroundColor: "#512DA8",
                borderRadius: 20,
                width: 40,
                height: 40,
            }} />

            <Text
                style={{
                    fontSize: 16,
                    color: '#673AB7',
                }}
            >
                {account.name}
            </Text>
        </View>
        <Checkbox
            value={selected}
            onValueChange={() => handleSelectionChange()}
            style={{
                borderRadius: 6,
            }}
            color={"#512DA8"} />

    </Button>
}

export default AccountItem