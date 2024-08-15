import { useSelector } from "react-redux";
import { Account } from "../../features/accounts/types";
import { ReactNode, useEffect, useState } from "react";
import Button, { ButtoPropsType } from "../../components/button/Button";
import { selectAllAccounts, selectBankAccounts, selectCashAccounts } from "../../features/accounts/slice";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
    accountId: string | null | undefined;
    onSelectAccount: (accountId?: string) => void;
};

const WalletSelector = ({ accountId, onSelectAccount }: Props) => {
    const bank = useSelector(selectBankAccounts);
    const cash = useSelector(selectCashAccounts);


    return (
        <View style={{ flex: 1 }}>
            <Header
                data={['all', "bank", 'cash']}
                render={(item, active, setActive) => <AccountButton key={item} active={active} onPress={() => setActive(item)}
                >
                    {item}
                </AccountButton>}>
                <AccountButton  >
                    Всі
                </AccountButton>
                <AccountButton  >
                    Банк
                </AccountButton>

                <AccountButton  >
                    Готівка
                </AccountButton>

            </Header>
            <Content >
                <Text>asd</Text>
            </Content>
        </View >
    )
}
const Header = ({ data, render, children }: { render: (item: 'bank' | 'cash' | 'all', active: boolean, setActive: (item: 'bank' | 'cash' | 'all') => void) => ReactNode, data: ('bank' | 'cash' | 'all')[], children: ReactNode }) => {
    const [active, setActive] = useState<'bank' | 'cash' | 'all'>('all')
    return <View style={s.header}>
        {data.map(el => (
            render(el, active === el, (item) => setActive(item))
        ))}
    </View>
}

const AccountButton = ({ children, active, ...props }: { active?: boolean, children: ReactNode } & ButtoPropsType) => {
    return <Button size="sm" numberOfLines={1} textStyle={s.textStyle} containerStyle={s.containerStyle} style={[s.accountButton, active && { backgroundColor: '#7e47ff80' }]} variant="ghost" {...props}>
        {children}
    </Button>
}


const Content = ({ children }: { children: ReactNode }) => {
    return <View style={c.contentContainer}>
        {children}
    </View>
}

const c = StyleSheet.create({
    contentContainer: {
        flex: 1,

    },

})

const s = StyleSheet.create({
    header: {
        flexDirection: 'row',
        columnGap: 4,
        padding: 1,
        borderWidth: 1,
        borderColor: '#7e47ff80',
        borderRadius: 10,
    },
    accountButton: {
        padding: 0,
        flexBasis: 100,
        flexShrink: 1,
        flexGrow: 1,
    },

    containerStyle: {
        flexGrow: 1,
    },
    iconStyle: {
        borderRadius: 999,

    },
    textStyle: {
        fontSize: 16,
    }
})
export default WalletSelector;