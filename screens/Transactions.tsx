import React, { useLayoutEffect } from 'react'
import { View, StyleSheet, Text, Pressable, } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Layout from '../components/Layout';
import { useIgnoredTransactionsContext } from '../context/TransactionsContext';
import Grouped from '../components/Grouped';
import { useStats } from '../hook/useStats';
import { Transaction } from '../types/transaction';
import Actions from '../components/actions/Actions';

const Transactions = () => {
    const { state, addToIgnored } = useIgnoredTransactionsContext();
    const { stats } = useStats();
    const remove = async (transaction: Transaction) => {
        await addToIgnored(transaction);
    }

    return (
        <Layout >
            <View style={{
                paddingHorizontal: 20
            }}>
                <Text style={styles.total}>{stats[0].value} ГРН</Text>
                <Text style={[styles.white, styles.f20]}>{stats[1].title} {stats[1].value}</Text>
                <Text style={[styles.white, styles.fs16]}>{stats[3].title} {stats[3].value}</Text>
            </View>
          <Actions />
            <View style={styles.container}>
                <Grouped transactions={state.transactions} actionFunc={remove} />
            </View>
            <StatusBar style="auto" />
        </Layout>
    )
}

const styles = StyleSheet.create({
    white: {
        color: 'white',
    },
    f20: {
        fontSize: 20,
    },
    total: {
        color: 'white',
        fontSize: 30,
        textAlign: "center"
    },
    container: {
        borderRadius: 20,
        backgroundColor: '#0b1d25',

        marginHorizontal: 10,
        marginBottom: 10,

        flex: 1,
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