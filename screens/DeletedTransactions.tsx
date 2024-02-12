import React from 'react'
import { View, StyleSheet, Text, Button, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Layout from '../components/Layout';
import RenderItem from '../components/RenderItem';
import { Transaction } from '../types/transaction';


const DeletedTransactions = () => {

    // const totalAmount = state.ignoredTransactions.reduce((accumulator, transaction) => {
    //     return accumulator + transaction.amount;
    // }, 0);
    const totalAmount = 0;
    const ItemSeparator = () => {
        return <View style={styles.separator} />;
    };


    const remove = async (transaction: Transaction) => {
        //await removeFromIgnored(transaction);
    }
    // const sortedIgnoredTransactions: Transaction[] = [...state.ignoredTransactions].sort(
    //     (a, b) => a.time - b.time
    // );
    const sortedIgnoredTransactions = []

    return (
        <Layout>
            <Text style={styles.total}>{totalAmount / 100} ГРН</Text>
            <View style={styles.container}>
                <Text style={styles.text} >TODO: implement some functions</Text>
                <FlatList
                    style={{ flexGrow: 1 }}
                    data={sortedIgnoredTransactions}
                    ItemSeparatorComponent={ItemSeparator}
                    renderItem={({ item, index }) => (<RenderItem index={index} section={null} transaction={item} action='check' actionFunc={remove} />)}
                />
            </View>
            <StatusBar style="auto" />

        </Layout>
    )
}

const styles = StyleSheet.create({
    total: {
        color: 'white',
        fontSize: 30,
        textAlign: "center"
    },
    container: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#222222',

        paddingTop: 15,
        paddingHorizontal: 15,

        flex: 1
    },
    separator: {
        height: 20,
    },
    text: {
        color: "silver",
        fontSize: 16,
    },
});
export default DeletedTransactions