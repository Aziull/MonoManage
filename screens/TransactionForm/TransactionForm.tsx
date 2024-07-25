import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import TransactionTypeSwitcher from '../../components/TransactionTypeSwitcher';
import Layout from '../../components/Layout';
import CategorySelector from '../../components/CategorySelector';
import dayjs, { Dayjs } from 'dayjs';
import { TransactionFormProps, TransactionType } from '../../navigation/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addTransactionAsync } from '../../features/transaction/thunks';

import Helper from '../../helper';
import Header from './Header';
import WalletSelector from './WalletSelector';
import { Account } from '../../features/accounts/types';
import SingleDateInput from '../../components/dateInput/SingleDateInput';
import ActionButtons from './ActionButtons';

const TransactionForm: React.FC<TransactionFormProps> = ({ navigation, route }) => {

    const [type, setType] = useState<TransactionType>(route.params.type);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const [account, setAccount] = useState<Account | null | undefined>(null)
    const [date, setDate] = useState<Dayjs>(dayjs());

    const dispatch = useDispatch<AppDispatch>();

    const handleExit = () => {
        Alert.alert(
            "Підтвердження",
            "Ви впевнені, що хочете вийти?",
            [
                {
                    text: "Скасувати",
                    style: "cancel"
                },
                { text: "Вийти", onPress: () => navigation.goBack() }
            ],
            { cancelable: false }
        );
    };
    const handleSave = async () => {
        if (!account) return Alert.alert('no account')
        const { transaction, error } = Helper.Tranasctions.createTransaction(
            type,
            amount,
            description,
            date,
            account?.id
        )
        if (error) return Alert.alert(error);

        dispatch(addTransactionAsync(transaction));
        navigation.goBack()
    }



    return (
        <Layout style={styles.container}>
            <Header onExit={handleExit}>
                <TransactionTypeSwitcher selectedType={type} onTypeChange={(newType) => setType(newType)} />
            </Header>
            <View style={[styles.formContainer]}>
                <TextInput
                    placeholder="₴0.00"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                    style={styles.input}
                    placeholderTextColor={'rgba(82, 45, 168, 0.5)'}

                />
                <TextInput
                    placeholder="Назва транзакції"
                    value={description}
                    onChangeText={setDescription}
                    style={[styles.description]}
                    placeholderTextColor={'rgba(82, 45, 168, 0.5)'}
                />
                <SingleDateInput date={date} setDate={(date) => { setDate(date) }} />
                <View style={[
                    {
                        marginHorizontal: -16,
                    },
                    styles.separator,
                ]} />
                <WalletSelector onSelectAccount={(account) => setAccount(account)} account={account} />
                <View style={styles.separator} />
                <CategorySelector
                    value={category}
                    type={type}
                    onSelectCategory={(selectedCategory) => setCategory(selectedCategory)}
                />
                <TransactionTypeSwitcher style={{ alignSelf: 'center' }} selectedType={type} onTypeChange={(newType) => setType(newType)} />
            </View>

            <ActionButtons type={type} handleSave={handleSave} />
        </Layout >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 50,
        justifyContent: 'flex-start'
    },
    formContainer: {
        flex: 1,
        rowGap: 10,
    },
    input: {
        padding: 10,
        color: '#512DA8', // Фіолетовий колір тексту
        fontSize: 30,
        fontWeight: "bold"
    },
    description: {
        color: '#512DA8', // Фіолетовий колір тексту
        fontSize: 24,
        borderBottomWidth: 1,
        borderColor: 'rgba(82, 45, 168, 0.5)',
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: 'rgba(82, 45, 168, 0.5)',
    },
});


export default TransactionForm;
