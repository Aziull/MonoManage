import React, { useEffect } from 'react'
import { View, StyleSheet, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useState } from 'react';
import { RemamedContextType, RenamedType, useRenamedContext } from '../context/RenamedContext';
import RenamableDescription from './RenamableDescription';
import { Transaction } from '../types/transaction';

type PropsType = {
    transaction: Transaction,
    action: "+" | "-",
    actionFunc: (item: Transaction) => void,
    index: any
    section: any,
}


const RenderItem = ({ transaction: transaction, action, actionFunc, index, section }: PropsType) => {
    return (
        <View style={[
            styles.row,
            styles.item,
            index === 0 && styles.itemFirst,
            index === section?.data.length - 1 && styles.itemLast,
        ]} >
            <View style={styles.col1}>
                <RenamableDescription transaction={transaction} />
            </View>
            <View style={styles.col2}>
                <Text style={[styles.text, {
                    fontSize: 19,
                    color: transaction.amount > 0 ? "green" : 'white',
                }]}>{transaction.amount / 100}</Text>
            </View>
            <View style={styles.col3}>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#7E191B' : '#A45A52',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                        styles.button,
                    ]}
                    onPress={() => actionFunc(transaction)}
                >
                    <Text style={styles.buttonText}>{action}</Text>
                </Pressable>
            </View>
        </View >)
}

const styles = StyleSheet.create({
    row: {

        flex: 10,
        flexDirection: "row",

        alignItems: 'center',


        gap: 20,


    },
    col1: {
        flex: 6,
    },
    col2: {
        flex: 3,

        alignItems: 'flex-end',
    },
    col3: {
        flex: 1,
    },
    text: {
        color: "white",
        fontSize: 16,
    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 25,
        color: 'white', // кольор тексту
        fontSize: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        // Інші стилі для тексту
    },
    input: {
        color: 'white',
        fontSize: 16,
    },
    item: {
        // backgroundColor: "#2E2E2E",
        // borderBottomColor: "#000000",
        borderBottomWidth: 1,
        padding: 8,
    },
    itemFirst: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        
    },
    itemLast: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomWidth: 0,
    },
});

export default RenderItem