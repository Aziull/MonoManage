import React, { useMemo } from 'react'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Layout from '../components/Layout';
import Grouped from '../components/transactionList/Grouped';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppDispatch } from '../store';
import { logout } from '../features/user/userSlice';
import { clearAuthToken } from '../features/authToken/slice';
import { useDispatch } from 'react-redux';
import Helper from '../helper';
import { Transaction } from '../features/transaction/types';
import FilterTransactions from '../widgets/FilterTransactions';
import { useKeyboardVisible } from '../hook/useKeyboardVisible';
import useFilter from '../hook/useFilter';
import { toggleIgnoreTransactionAsyncs } from '../features/transaction/thunks';
import { DeletedTransactionsScreenProps, TransactionsScreenProps } from '../navigation/types';
import Loader from '../components/Loader';
import { LinearGradient } from 'expo-linear-gradient';

const Transactions = ({ route }: TransactionsScreenProps | DeletedTransactionsScreenProps) => {
    const { deleted } = route.params

    const { transactions, status } = useFilter(deleted);

    const isKeyboardVisible = useKeyboardVisible()

    const dispatch = useDispatch<AppDispatch>()

    const stats = useMemo(() => (Helper.Tranasctions.generateStatistics(transactions)), [transactions]);

    const remove = (transaction: Transaction) => {
        dispatch(toggleIgnoreTransactionAsyncs(transaction));

    }

    const handleLogout = () => {
        dispatch(logout())
        dispatch(clearAuthToken())
    }
    if (status !== 'idle') {
        return <Loader text='Видалення...' />
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
                    <FilterTransactions />
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