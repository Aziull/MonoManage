import { Text, View } from "react-native";
import Button from "../../components/Button";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Account } from "../../features/accounts/types";
import { useEffect } from "react";
type Props = {
    account: Account | null | undefined;
    onSelectAccount: (account?: Account) => void;
};

const WalletSelector = ({ account, onSelectAccount }: Props) => {
    const { accounts } = useSelector((state: RootState) => state.accounts)

    useEffect(() => {
        if (!account) {
            onSelectAccount(accounts.find(acc => acc.type === 'cash'))
        }
    }, [])

    return (
        <Button containerStyle={{
            flexDirection: 'row',
            columnGap: 10
        }}>
            <View style={{
                backgroundColor: "#512DA8",
                flexDirection: 'row',
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: 1,
                borderRadius: 20
            }}>
                <MaterialIcons name='account-balance-wallet' color={'white'} size={25} />

            </View>
            <View>
                <Text style={{ color: '#8307f7', fontSize: 13 }}>
                    Рахунок
                </Text>
                <Text style={{ color: "#512DA8", fontSize: 15 }}>
                    {account?.name}
                </Text>
            </View>
        </Button>
    )
}
export default WalletSelector;