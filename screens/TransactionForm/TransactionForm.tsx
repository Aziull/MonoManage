import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import TransactionTypeSwitcher from '../../components/TransactionTypeSwitcher';
import Header from './Header';

import { LinearGradient } from 'expo-linear-gradient';
import z from 'zod';
import HiddeOnKeyboard from '../../components/HiddeByKeyboard';
import { selectAccountById } from '../../features/accounts/slice';
import { addTransactionAsync, updateTransaction } from '../../features/transaction/thunks';
import { Transaction } from '../../features/transaction/types';
import { TransactionFormValidation } from '../../lib/validation';
import { TransactionFormProps, TransactionType } from '../../navigation/types';
import { AppDispatch, RootState } from '../../store';
import CurrencyUtils from '../../utils/currencyUtils';
import ActionButtons from './ActionButtons';
import ActionsTabs from './ActionsTabs';
import TransactionFields from './TransactionFields';

export type ActionType = '₴' | 'description' | 'account' | 'date';
export type TabButtonType = {
    value: ActionType,
    button: string,
    icon?: {
        name: string, color: string, size: number
    }
}


// Утилітарна функція для обчислення суми з урахуванням типу транзакції
const calculateAmount = (type: TransactionType, amount: number): number => {
    return type === 'income' ? CurrencyUtils.toMinorUnits(Math.abs(amount)) : CurrencyUtils.toMinorUnits(-Math.abs(amount));
};



const TransactionForm: React.FC<TransactionFormProps> = ({ navigation, route }) => {
    let currentDate = new Date();
    const { transaction } = route.params;
    const account = useSelector((state: RootState) => selectAccountById(state, transaction?.accountId || ''))
    const [type, setType] = useState<TransactionType>(route.params.type);
    const dispatch = useDispatch<AppDispatch>();
    const editable = !account || account?.type === 'cash';

    const [selectedAction, setSelectedAction] = useState<ActionType>(editable ? '₴' : 'description');
    const descriptionRef = useRef<TextInput>(null);

    const { control, handleSubmit, getValues, formState: { isValid } } = useForm<z.infer<typeof TransactionFormValidation>>({
        resolver: zodResolver(TransactionFormValidation),
        defaultValues: {
            description: transaction?.description || '',
            date: transaction ? new Date(transaction.time * 1000) : currentDate,
            amount: transaction ? `${transaction.amount / 1000}` : '0.00',
            accountId: account?.id || 'cash',
        },
    });

    const watched = useWatch({
        control,
        name: ['date', 'amount', 'description'],
    });

    const onSubmit = async ({
        amount: amountStr,
        description,
        date,
        accountId,
    }: z.infer<typeof TransactionFormValidation>) => {

        if (!accountId) {
            Alert.alert('No account selected');
            return;
        }

        const amountParsed = CurrencyUtils.parseCurrency(amountStr);
        if (amountParsed === null) {
            Alert.alert('Invalid amount, please enter a number');
            return;
        }

        const amount = calculateAmount(type, amountParsed);
        const time = date.getTime() / 1000;

        const updatedTransaction = {
            description,
            ...(account?.type === 'cash' && { amount, time }), // Додаємо `amount` та `time` тільки якщо тип рахунку `cash`
        };
        

        if (transaction) {
            dispatch(updateTransaction({ id: transaction.id, transaction: updatedTransaction }));
        } else {
            const newTransaction: Omit<Transaction, 'id'> = {
                amount,
                description,
                time,
                accountId,
                deleted: false,
            };
            dispatch(addTransactionAsync(newTransaction));
        }

        navigation.goBack();
    };

    if (selectedAction !== 'description' && descriptionRef.current?.isFocused) {
        descriptionRef.current?.blur();
    }

    const onNotFoundPress = () => {
        if (descriptionRef.current?.isFocused) { descriptionRef.current?.blur(); }
        descriptionRef.current?.focus();
    }
    return (
        <Layout style={styles.container}>
            <View style={styles.formContainer}>
                <ImageBackground source={require('../../assets/card-bg.jpg')} resizeMode="cover" style={styles.data}>
                    <PageHeader type={type} setType={(type) => setType(type)} />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}>
                        <TransactionFields
                            ref={descriptionRef}
                            transaction={transaction}
                            control={control}
                            date={watched[0]}
                            amount={watched[1]}
                            desctription={watched[2]}
                            selectedAction={selectedAction}
                            setSelectedAction={setSelectedAction}
                        />
                    </KeyboardAvoidingView>
                </ImageBackground>
                <HiddeOnKeyboard>
                    <ActionButtons disabled={!isValid} style={{ alignSelf: 'flex-end', direction: 'rtl', flexWrap: 'nowrap', marginHorizontal: 24, }} shape='roundedFull' type={type} handleSave={handleSubmit(onSubmit)} />
                </HiddeOnKeyboard>
                <HiddeOnKeyboard>
                    <ActionsTabs
                        onNotFoundPress={onNotFoundPress}
                        editable={editable}
                        selectedAction={selectedAction}
                        changeTab={(tab) => { setSelectedAction(tab) }}
                        control={control}
                        getValues={getValues}
                        currentDate={currentDate}
                    />
                </HiddeOnKeyboard>
            </View>
            <LinearGradient
                colors={['transparent', '#c2b1ff']}
                style={styles.background}
            />
        </Layout >
    );
};

const PageHeader = ({ type, setType }: { type: TransactionType, setType: (newType: TransactionType) => void }) => {
    return (
        <>
            <View style={styles.header}>
                <Header />
                <TransactionTypeSwitcher
                    style={styles.typeSwitcher}
                    selectedType={type}
                    onTypeChange={setType}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
    },
    formContainer: {
        flex: 1,
        rowGap: 8,
        paddingBottom: 16,
    },
    data: {
        paddingTop: 50,
        flex: 4,

    },
    dataContiner: {
        backgroundColor: '#00000080',
        marginVertical: 'auto',
        marginHorizontal: 8,
        borderRadius: 20,
        overflow: 'hidden',
        padding: 20,
        rowGap: 10,

    },
    input: {
        padding: 10,
        color: '#512DA8',
        fontSize: 30,
        fontWeight: 'bold',
    },
    description: {
        flexGrow: 1,
        paddingLeft: 22,
        color: 'white',
        fontSize: 18,
        borderBottomWidth: 1,
        borderColor: 'white',
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
    separator: {
        borderBottomWidth: 1,
        borderColor: 'rgba(82, 45, 168, 0.5)',
    },
    actionsContainer: {
        flex: 6,
        rowGap: 8,
        overflow: 'hidden',
    },
    actionsViews: {
        flexGrow: 1,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f2ff',
        paddingHorizontal: 24,
        overflow: 'hidden',
        borderRadius: 40,
        marginHorizontal: 8,
    },
    tabController: {
        marginHorizontal: 8,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        borderRadius: 9999,
        backgroundColor: "#f5f2ff",
        overflow: 'hidden',
        paddingHorizontal: 24,
        justifyContent: 'space-around'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        height: 500,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    typeSwitcher: {
        alignSelf: 'center',
    },
});

export default TransactionForm;
