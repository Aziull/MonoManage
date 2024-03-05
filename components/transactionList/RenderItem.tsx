import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useActionSheet } from '../../hook/useActionSheet';
import { Transaction } from '../../features/transaction/types';
import Helper from '../../helper';

type PropsType = {
    transaction: Transaction,
    action: "check" | "delete",
    actionFunc: (item: Transaction) => void,
    index: any
    section: any,
}


const RenderItem = ({ transaction, action, actionFunc, index, section }: PropsType) => {
    const { showActionSheet } = useActionSheet();
    let categoryIconName

    if (transaction.mcc) {
        // console.log('mcc ', transaction.description, transaction.mcc, transaction.originalMcc);
        categoryIconName = Helper.Category.getCategryIconByMcc(transaction.mcc)
    }
    // console.log('categoryIconName', categoryIconName);
    

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : 'transparent'
                },
                styles.transactionItem
            ]}
            onPress={() => { showActionSheet(transaction) }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name={categoryIconName || 'circle'} size={26} color="#9575CD" style={styles.icon} />
                <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTitle}>{transaction.description}</Text>
                    <Text style={[styles.transactionAmount, transaction.amount > 0 ? styles.positiveAmount : styles.negativeAmount]}>{transaction.amount / 100}</Text>
                </View>
                <MaterialIcons name="touch-app" size={25} color="#9575CD" />
                <View style={styles.actions}>
                    <Pressable onPress={(e) => {
                        e.stopPropagation();
                        actionFunc(transaction);
                    }}>
                        <MaterialIcons name={action} size={25} color="#F44336" />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EDE7F6',
    },
    icon: {
        marginRight: 10,
    },
    transactionDetails: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: 16,
        color: '#512DA8',
    },
    transactionAmount: {
        fontSize: 16,
    },
    positiveAmount: {
        color: '#4CAF50', // світло-зелений для позитивних сум
        fontWeight: 'bold',
    },
    negativeAmount: {
        color: '#9575CD', // фіолетовий для негативних сум
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default RenderItem