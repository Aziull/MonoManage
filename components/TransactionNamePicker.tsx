import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { transactionRepository } from '../db';
import { TransactionsFrequency } from '../db/entities';
import Button from './button/Button';



type Props = {
    onNotFoundPress: () => void,
    onNamePress: (name: string) => void,
}

export const useTransactionsNames = () => {
    const [transactionNames, setTransactionNames] = useState<TransactionsFrequency[]>([]);

    useEffect(() => {
        const loadTransactionNames = async () => {
            const names = await transactionRepository.getAllSortedNames();
            setTransactionNames(names);
        };

        loadTransactionNames();
    }, []);

    return transactionNames
}

const TransactionNamePicker = ({ onNotFoundPress, onNamePress }: Props) => {
    const transactionNames = useTransactionsNames();

    return (
        <View style={styles.container}>
            <FlatList
            
                data={transactionNames}
                keyExtractor={(item) => item.description}
                renderItem={({ item }) => (
                    <Button onPress={() => onNamePress(item.description)} horizontal={false} variant='ghost' style={styles.itemButton} containerStyle={styles.itemContainer} >
                        <Text style={styles.itemText}>{item.description}</Text>
                        <Text style={styles.frequencyText}>Були там {item.frequency}</Text>
                    </Button>
                )}
                numColumns={2}
                ItemSeparatorComponent={() => <View style={{ borderBottomWidth: 1, borderColor: '#c2b1ff' }} />}
                columnWrapperStyle={styles.columnWrapper}

            />
            <Button onPress={onNotFoundPress} variant='secondary' shape='roundedFull' style={{ alignSelf: 'flex-end' }} color='#dbd4ff' textStyle={{ color: '#2c0b6a' }} size='sm'>
                Ввести вручну
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        flex: 1,
        rowGap: 8,
    },
    itemButton: {
        flex: 1,
        alignItems: 'flex-start',
    },
    itemContainer: {
        margin: 0,
        padding: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        alignItems: 'flex-start',
    },
    itemText: {
        fontSize: 16,
        color: '#5818bf',
    },
    frequencyText: {
        fontSize: 12,
        color: '#a385ff',
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
});

export default TransactionNamePicker;
