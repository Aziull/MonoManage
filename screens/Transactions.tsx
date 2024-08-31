import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useMemo } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import FilterOptions from '../components/filter/FilterOptions';
import Layout from '../components/Layout';
import Grouped from '../components/transactionList/Grouped';
import Search from "../components/transactionSearch/search";
import { clearAuthToken } from '../features/authToken/slice';
import { toggleIgnoreTransactionAsyncs } from '../features/transaction/thunks';
import { Transaction } from '../features/transaction/types';
import { logout } from '../features/user/userSlice';
import useFilter from '../hook/useFilter';
import { useKeyboardVisible } from '../hook/useKeyboardVisible';
import { statisticsService } from '../lib/services/statistics/StatisticsService';
import { DeletedTransactionsScreenProps, TransactionsScreenProps } from '../navigation/types';
import { AppDispatch } from '../store';

const Transactions = ({ route }: TransactionsScreenProps | DeletedTransactionsScreenProps) => {
    const { deleted } = route.params
    const { transactions } = useFilter(deleted);

    const isKeyboardVisible = useKeyboardVisible()

    const dispatch = useDispatch<AppDispatch>()

    const stats = useMemo(() => {
        return statisticsService.generateStatistics(transactions)
    }, [transactions]);

    const remove = useCallback((transaction: Transaction) => {
        dispatch(toggleIgnoreTransactionAsyncs(transaction));

    }, [])

    const handleLogout = () => {
        dispatch(logout())
        dispatch(clearAuthToken())
    }

    return (
        <Layout style={{ paddingBottom: !isKeyboardVisible ? 88 : 0, paddingTop: 0, }}>
            <ImageBackground source={require('../assets/card-bg.jpg')} resizeMode='stretch' style={styles.imageBg}>
                <View style={styles.headerContainer}>
                    <View style={styles.smallStats}>
                        <Text style={styles.balanceText}>₴{stats[0].value}</Text>
                        <View style={styles.expensesContainer}>
                            <MaterialIcons name="trending-down" style={{ color: 'white' }} size={22} />
                            <Text style={styles.expensesText}>₴{stats[1].value} / день</Text>
                        </View>
                    </View>
                    <MaterialIcons name="logout" style={{ color: "#512DA8" }} size={28} onPress={handleLogout} />
                </View>

            </ImageBackground>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Grouped transactions={transactions} actionFunc={remove} />
                    <View>
                        <FilterOptions />
                        <Search />
                    </View>
                </View>
            </View>
            < StatusBar style="auto" />

        </Layout>
    )
}

const styles = StyleSheet.create({
    imageBg: {
        paddingTop: 50, paddingBottom: 16, overflow: 'visible'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        height: 150,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        overflow: 'hidden'
    },
    smallStats: {
        marginHorizontal: 8,
        backgroundColor: '#00000060',
        borderRadius: 20,
        padding: 20,
        rowGap: 10,
    },
    balanceText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    expensesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    expensesText: {
        fontSize: 16,
        marginLeft: 5,
        color: 'white',
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    separator: {
        height: 20,
    },
});
export default Transactions