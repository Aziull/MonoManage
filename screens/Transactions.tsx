import React, { useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Layout from '../components/Layout';
import Grouped from '../components/Grouped';
import { Transaction } from '../types/transaction';
import Actions from '../components/actions/Actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppDispatch, RootState } from '../store';
import { logout } from '../features/user/userSlice';
import { clearAuthToken } from '../features/authToken/slice';
import { useDispatch, useSelector } from 'react-redux';
import { addToIgnored } from '../features/transaction/slice';
import { User } from '../features/user/types';
import { BankList } from '../features/api/config';
import { addBankTransactionsAsync } from '../features/transaction/thunks';
import { fetchAndSaveBankAccounts } from '../features/user/thunks';
import Helper from '../helper';

const Transactions = () => {
    const { user }: { user: User | null } = useSelector((state: RootState) => state.auth);
    const { authToken } = useSelector((state: RootState) => state.authToken);
    const dispatch = useDispatch<AppDispatch>()
    const today = new Date();
    const from = new Date(today.getFullYear(), today.getMonth(), 1);


    useEffect(() => {
        if (!user || !authToken) return
        dispatch(fetchAndSaveBankAccounts({ bankName: BankList.monobank, requestPath: 'clientInfo' }))
        dispatch(addBankTransactionsAsync({
            bankName: BankList.monobank,
            requestPath: 'transactions',
            accountId: 0,
            from: from.getTime(),
            to: today.getTime()
        }));
    }, [user, authToken])


    const { transactions } = useSelector((state: RootState) => state.transaction)

    const stats = Helper.Tranasctions.generateStatistics(transactions)
    const remove = async (transaction: Transaction) => {
        dispatch(addToIgnored(transaction));
    }

    const handleLogout = () => {
        dispatch(logout())
        dispatch(clearAuthToken())
    }

    return (
        <Layout >
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.balanceText}>₴{stats[0].value}</Text>
                    <View style={styles.expensesContainer}>
                        <MaterialIcons name="trending-down" style={{ color: "#512DA8" }} size={22} />
                        <Text style={styles.expensesText}>₴{stats[1].value} / день</Text>
                    </View>
                </View>
                <MaterialIcons name="logout" style={{ color: "#512DA8" }} size={28} onPress={handleLogout} />
            </View>


            <View style={styles.container}>
                <Grouped transactions={transactions} actionFunc={remove} />
                <Text>search</Text>
            </View>
            <Text>settings</Text>
            <Actions />
            <StatusBar style="auto" />
        </Layout>
    )
}

const styles = StyleSheet.create({

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    balanceText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#673AB7',
    },
    expensesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    expensesText: {
        fontSize: 16,
        marginLeft: 5,
        color: '#512DA8',
    },


    white: {
        color: '#673AB7',
    },
    f20: {
        fontSize: 20,
    },
    total: {
        color: '#512DA8',
        fontSize: 30,
        textAlign: "center"
    },
    container: {

        flex: 1,
        backgroundColor: '#F5F5F5', // Світлий фон для контейнера
        margin: 10, // Відступ від країв екрану
        borderRadius: 10, // Закруглені кути
        overflow: 'hidden',
        shadowColor: '#000', // Колір тіні
        shadowOffset: { width: 0, height: 2 }, // Зміщення тіні
        shadowOpacity: 0.1, // Прозорість тіні
        shadowRadius: 4, // Радіус розмиття тіні
        elevation: 5, // Висота тіні для Android
    },
    actions: {
        zIndex: 1,
        paddingBottom: 10,
    },

    plus: {
        left: 0,
    },
    search: {
        position: "absolute",
        right: 0
    },
    separator: {
        height: 20,
    },
    silver: {
        color: "silver",
    },
    fs16: {
        fontSize: 16,
    }
});
export default Transactions