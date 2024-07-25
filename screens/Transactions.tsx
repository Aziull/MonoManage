import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, Pressable, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Layout from '../components/Layout';
import Grouped from '../components/transactionList/Grouped';
import Actions from '../components/actions/Actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppDispatch, RootState } from '../store';
import { logout } from '../features/user/userSlice';
import { clearAuthToken } from '../features/authToken/slice';
import { useDispatch, useSelector } from 'react-redux';
import { addToIgnored } from '../features/transaction/slice';
import { User } from '../features/user/types';
import { BankList } from '../features/api/config';
import { addBankTransactionsAsync, getTransactionsAsync } from '../features/transaction/thunks';
import { fetchAndSaveBankAccounts } from '../features/user/thunks';
import Helper from '../helper';
import Search from '../components/transactionSearch/search';
import Button from '../components/Button';
import FilterOptions from '../components/filter/FilterOptions';
import { Transaction } from '../features/transaction/types';
import FilterActionButton from '../components/filter/FilterActionButton';
import FilterTransactions from '../widgets/FilterTransactions';
import { useKeyboardVisible } from '../hook/useKeyboardVisible';
import { convertToDate } from '../features/filter/lib';
import dayjs from 'dayjs';
import { applyFilters } from '../utils/filters/applyFilters';

const Transactions = () => {
    const { user }: { user: User | null } = useSelector((state: RootState) => state.auth);
    const { authToken } = useSelector((state: RootState) => state.authToken);
    const { description, dateRange, accountsId } = useSelector((state: RootState) => state.filters);
    const isKeyboardVisible = useKeyboardVisible()

    const dispatch = useDispatch<AppDispatch>()
    const today = new Date();
    const from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);

    useEffect(() => {
        if (!user || !authToken) return
        accountsId.forEach(id => {
            dispatch(addBankTransactionsAsync({
                bankName: BankList.monobank,
                requestPath: 'transactions',
                accountId: id,
                from: from.getTime(),
                to: today.getTime()
            }));
        })
    }, [user, authToken, accountsId])

    useEffect(() => {
        dispatch(getTransactionsAsync())
    }, []) 

    const { transactions } = useSelector((state: RootState) => state.transaction)

    const filtered = applyFilters(transactions, {
        description: description,
        timeframe: dateRange,
        accountsId: accountsId,
    }).sort((a,b) => b.time - a.time)

    const stats = Helper.Tranasctions.generateStatistics(filtered)
    const remove = async (transaction: Transaction) => {
        dispatch(addToIgnored(transaction));
    }

    const handleLogout = () => {
        dispatch(logout())
        dispatch(clearAuthToken())
    }
    //console.log(filtered);
    

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
                <Grouped transactions={filtered} actionFunc={remove} />
                <FilterTransactions />
            </View>

            {!isKeyboardVisible && <Actions />}


            < StatusBar style="auto" />
        </Layout>
    )
}

const styles = StyleSheet.create({

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
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
    separator: {
        height: 20,
    },
});
export default Transactions