import { Text, View } from "react-native"
import Checkbox from "expo-checkbox"
import { Account } from "../../../../features/accounts/types"
import { useEffect, useState } from "react"
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
        >
            {account.name}

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