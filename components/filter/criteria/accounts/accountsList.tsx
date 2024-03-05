import Checkbox from "expo-checkbox";
import { Pressable, Text, ViewStyle } from "react-native";
import { View } from "react-native";
import { Account } from "../../../../features/accounts/types";
import Button from "../../../Button";
import { useEffect, useRef, useState } from "react";
import AccountItem from "./accountItem";

type PropsType = {
    title: string,
    accounts: Account[],
    selectedIds: string[],
    update: (values: string[]) => void,
    containerStyle?: ViewStyle,

}

const AccountsList = ({ accounts, title, containerStyle, update, selectedIds }: PropsType) => {

    const onItemSelectChange = (id: string) => {
        if (selectedIds.includes(id)) {
            return update(selectedIds.filter(item => item !== id));
        } else {
            return update([...selectedIds, id]);
        }
    }

    const handleSelectAll = (value: boolean) => {
        update(value ? accounts.map(({ id }) => id) : [])
    }


    return <View
        style={[
            {
                backgroundColor: '#EDE7F6',
                padding: 10,
                borderRadius: 10,
                marginBottom: 10,

                elevation: 2,
                shadowOpacity: 0.1,
                shadowRadius: 3,
                shadowOffset: { height: 2, width: 0 },
            },
            containerStyle,

        ]}>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
        }} >
            <Text style={{
                fontSize: 16,
                fontWeight: '500',
                color: '#512DA8',
            }}>
                {title}
            </Text>
            <Checkbox
                value={selectedIds.length === accounts.length}
                onValueChange={handleSelectAll}
                style={{
                    borderRadius: 6,
                    alignContent: 'stretch',
                }}
                color={"#512DA8"} />
        </View>
        <View style={{
            rowGap: 10,
        }}>
            {accounts.map(account =>
                <AccountItem
                    onSelectChange={onItemSelectChange}
                    account={account}
                    selected={selectedIds.includes(account.id)}
                    key={account.id}
                />
            )}
        </View>
    </View>
}

export default AccountsList;