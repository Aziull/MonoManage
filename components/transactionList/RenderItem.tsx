import React, { memo } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Transaction } from '../../features/transaction/types';
import Helper from '../../helper';
import ExpenceCircle from '../../assets/icons/expence-circle';
import IncomeCircle from '../../assets/icons/income-circle';

type PropsType = {
    transaction: Transaction,
    action: "list" | "delete",
    actionFunc: (item: Transaction) => void,
}


const RenderItem = memo(({ transaction, action, actionFunc }: PropsType) => {

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#ece8ff' : 'transparent'
                },
                styles.transactionItem
            ]}
            onPress={() => {
                //TODO: open edit page
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                {transaction.amount < 0 && <ExpenceCircle backgroundColor='#c2b1ff' width={50} height={50} />}
                {transaction.amount > 0 && <IncomeCircle backgroundColor='#9dd89f' width={50} height={50} />}

                <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTitle}>{transaction.description}</Text>
                    <Text style={[styles.transactionAmount, transaction.amount > 0 ? styles.positiveAmount : styles.negativeAmount]}>{transaction.amount / 100}</Text>
                </View>
                <View style={styles.actions}>
                    <Pressable onPress={(e) => {
                        e.stopPropagation();
                        actionFunc(transaction);
                    }}>
                        <MaterialIcons name={action} size={25} color="#c2b1ff" />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
})

const styles = StyleSheet.create({
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        paddingHorizontal: 16,
    },
    icon: {
        marginRight: 10,
    },
    transactionDetails: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: 16,
        color: '#6a1ee3',
    },
    transactionAmount: {
        fontWeight: '500',
        fontSize: 16,
    },
    positiveAmount: {
        color: '#4CAF50', // світло-зелений для позитивних сум
    },
    negativeAmount: {
        color: '#6a1ee3', // фіолетовий для негативних сум
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default RenderItem