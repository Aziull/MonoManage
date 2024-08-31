import React, { forwardRef, useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/button/Button';
import HiddeOnKeyboard from '../../components/HiddeByKeyboard';
import { useTransactionsNames } from '../../components/TransactionNamePicker';
import { AnimatedActiveText, AnimatedActiveTextInput } from '../../components/ui/AnimatedActiveText';
import { Transaction } from '../../features/transaction/types';
import { ActionType } from './TransactionForm';

interface TransactionFieldsProps {
    control: any;
    date: Date;
    desctription: string
    selectedAction: ActionType;
    amount: string;
    setSelectedAction: (action: ActionType) => void;
    transaction: Transaction | undefined;
}

const TransactionFields = forwardRef<TextInput, TransactionFieldsProps>(({ transaction, control, date, amount, desctription, selectedAction, setSelectedAction }, descriptionRef) => {
    const transactionsNames = useTransactionsNames();
    const filteredNames = transactionsNames.filter(t => t.description.includes(desctription));

    const onDescriptionPress = useCallback(() => {
        if (selectedAction !== 'description')
            setTimeout(() => {
                setSelectedAction('description')
            }, 500)
    }, [selectedAction]);

    return (
        <View style={styles.dataContainer}>
            <HiddeOnKeyboard>
                <Button
                    width='full'
                    variant='ghost'
                    onPress={() => setSelectedAction('date')}
                    icon={{ name: 'calendar', size: 18, color: 'white' }}
                    containerStyle={styles.buttonContainer}
                    style={styles.button}
                >
                    <AnimatedActiveText isSelected={selectedAction === 'date'} color={'white'}>
                        {new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)}
                    </AnimatedActiveText>
                </Button>
            </HiddeOnKeyboard>

            <HiddeOnKeyboard>
                <Button
                    variant='ghost'
                    width='full'
                    onPress={() => setSelectedAction('₴')}
                    containerStyle={styles.buttonContainer}
                    style={styles.button}
                >
                    <Text style={styles.symbol}>₴</Text>
                    <AnimatedActiveText color={amount === '0.00' ? '#eee' : 'white'} isSelected={selectedAction === '₴'}>
                        {`${amount}`}
                    </AnimatedActiveText>
                </Button>
            </HiddeOnKeyboard>

            <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.inputRowContainer}>
                        <View style={styles.inputRow}>
                            <Icon name="edit" size={18} color="white" style={styles.inputIcon} />
                            <AnimatedActiveTextInput
                                isSelected={selectedAction === 'description'}
                                ref={descriptionRef}
                                placeholder="Назва транзакції"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                style={styles.description}
                                placeholderTextColor="white"
                                onPress={onDescriptionPress}
                            />
                            {value && (
                                <Button
                                    style={styles.clearButton}
                                    size='icon'
                                    variant='ghost'
                                    icon={{ name: 'close', color: '#eee', size: 20 }}
                                    onPress={() => onChange('')}
                                />
                            )}
                            {(!value && transaction) && (
                                <Button
                                    style={styles.clearButton}
                                    size='icon'
                                    variant='ghost'
                                    icon={{ name: 'undo', color: '#eee', size: 20 }}
                                    onPress={() => onChange(transaction.description)}
                                />
                            )}
                        </View>

                        <HiddeOnKeyboard invert={true}>
                            <FlatList
                                keyboardShouldPersistTaps='always'
                                data={filteredNames}
                                keyExtractor={(item) => item.description + item.frequency}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                                renderItem={({ item }) => (
                                    <Pressable onPress={() => onChange(item.description)} style={styles.suggestion}>
                                        <Text style={styles.suggestionText}>{item.description}</Text>
                                    </Pressable>
                                )}
                            />
                        </HiddeOnKeyboard>
                    </View>
                )}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    dataContainer: {
        marginVertical: 'auto',
        marginHorizontal: 8,
        backgroundColor: '#00000080',
        borderRadius: 20,
        padding: 20,
        rowGap: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingLeft: 0,
    },
    button: {
        paddingLeft: 0,
        paddingVertical: 0,
        alignItems: 'flex-start',
    },
    symbol: {
        fontWeight: 'bold',
        marginRight: 10,
        fontSize: 20,
        color: 'white',
    },
    inputRowContainer: {
        flexDirection: 'column',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
    },
    description: {
        flexGrow: 1,
        paddingLeft: 22,
        color: 'white',
        fontSize: 18,
        borderBottomWidth: 1,
        borderColor: 'white',
    },
    clearButton: {
        padding: 0,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: '#ffffff80',
    },
    suggestion: {
        paddingLeft: 22,
        paddingVertical: 8,
    },
    suggestionText: {
        color: '#ffffff90',
        fontSize: 16,
    },
});

export default TransactionFields;
