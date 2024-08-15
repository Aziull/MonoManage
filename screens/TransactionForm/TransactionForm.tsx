import React, { useCallback, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, ImageBackground, FlatList, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Icon from 'react-native-vector-icons/FontAwesome';

import TransactionTypeSwitcher from '../../components/TransactionTypeSwitcher';
import Layout from '../../components/Layout';
import WalletSelector from './WalletSelector';
import Header from './Header';
import Numpad from '../../components/numpad/Numpad';

import { TransactionFormProps, TransactionType } from '../../navigation/types';
import { AppDispatch } from '../../store';
import { addTransactionAsync } from '../../features/transaction/thunks';
import { TransactionFormValidation } from '../../lib/validation';
import { Transaction } from '../../features/transaction/types';
import z from 'zod';
import DateTimePicker from 'react-native-ui-datepicker';
import Button from '../../components/button/Button';
import HiddeOnKeyboard from '../../components/HiddeByKeyboard';
import { TabButton, TabSymbolIconButton } from '../../components/numpad/TabButton';
import { LinearGradient } from 'expo-linear-gradient';
import TransactionNamePicker, { useTransactionsNames } from '../../components/TransactionNamePicker';
import ActionButtons from './ActionButtons';
import { AnimatedActiveText, AnimatedActiveTextInput } from '../../components/ui/AnimatedActiveText';
import TransactionFields from './TransactionFields';
import ActionsTabs from './ActionsTabs';

export type ActionType = '₴' | 'description' | 'account' | 'date';
export type TabButtonType = {
    value: ActionType,
    button: string,
    icon?: {
        name: string, color: string, size: number
    }
}





const TransactionForm: React.FC<TransactionFormProps> = ({ navigation, route }) => {
    let currentDate = new Date();
    const [type, setType] = useState<TransactionType>(route.params.type);
    const transactionsNames = useTransactionsNames()
    const dispatch = useDispatch<AppDispatch>();
    const [selectedAction, setSelectedAction] = useState<ActionType>('₴');
    const descriptionRef = useRef<TextInput>(null);
    const { control, handleSubmit, getValues, formState: { isValid } } = useForm<z.infer<typeof TransactionFormValidation>>({
        resolver: zodResolver(TransactionFormValidation),
        defaultValues: {
            description: '',
            date: currentDate,
            amount: '0.00',
            accountId: 'cash',
        },
    });

    const watched = useWatch({
        control,
        name: ['date', 'amount', 'description'],
    });

    const onSubmit = async ({ amount: amountStr, description, date, accountId }: z.infer<typeof TransactionFormValidation>) => {
        if (!accountId) return Alert.alert('No account selected');
        const amount = parseFloat(amountStr);
        if (isNaN(amount)) return Alert.alert('Invalid amount, please enter a number');
        const transaction: Omit<Transaction, 'id'> = {
            amount: type === 'income' ? Math.abs(amount) * 100 : -Math.abs(amount) * 100,
            description,
            time: date.getTime() / 1000,
            accountId: accountId,
            deleted: false,
        };

        dispatch(addTransactionAsync(transaction));
        navigation.goBack();
    };

    if (selectedAction !== 'description' && descriptionRef.current?.isFocused) {
        descriptionRef.current?.blur();
    }

    const onDescriptionPress = useCallback(() => {
        if (selectedAction !== 'description')
            setTimeout(() => {
                setSelectedAction('description')

            }, 500)
    }, [selectedAction])

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
