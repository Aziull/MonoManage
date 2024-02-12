import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Alert } from 'react-native';
import TransactionTypeSwitcher from '../components/TransactionTypeSwitcher';
import Layout from '../components/Layout';
import CategorySelector from '../components/CategorySelector';
import dayjs, { Dayjs } from 'dayjs';
import DatePickerModal from '../modal/DatePickerModal';
import { Guid } from 'guid-ts';
import { useIgnoredTransactionsContext } from '../context/TransactionsContext';
import { TransactionFormProps, TransactionType } from '../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addTransactionAsync } from '../features/transaction/thunks';
import { Transaction } from '../features/transaction/types';

type TransactionFormData = {
    type: TransactionType;
    amount: number;
    category: string;
};

const colors = {
    income: '#9575CD', // Зелений для прибутків
    expense: '#F8BBD0', // Червоний для витрат
};

const TransactionForm: React.FC<TransactionFormProps> = ({ navigation, route }) => {

    const [type, setType] = useState<TransactionType>(route.params.type);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>('');



    const [date, setDate] = useState<Dayjs>(dayjs());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth)

    if (!user) {
        navigation.navigate("SignIn");
        return null;
    }

    const handleDateChange = (selectedDate: Date) => {
        setDate(dayjs(selectedDate));
    };

    const toggleDatePicker = () => {
        setDatePickerVisible(!isDatePickerVisible);
    };

    const formBackgroundColor = type === 'income' ? colors.income : colors.expense;
    const formTextColor = type === 'income' ? 'white' : 'white'; // Текст білого кольору для обох типів для кращої читабельності

    const convertByType = (type: "income" | "expense", coinValue: string | number) => {
        const numValue = Number(amount) * 100;
        return type === "income" ? numValue : -numValue;
    }

    const handleSave = async () => {
        const id = Guid.newGuid().toString();

        if (!description.trim().length || !date || (!amount.trim.length && !Number(amount.trim()))) return Alert.alert("Заповніть всі поля");

        const instance: Transaction = {
            id,
            amount: convertByType(type, amount),
            description,
            time: date.unix(),
            deleted: false,
            balance: 0,
            accountId: user.id
        }

        dispatch(addTransactionAsync(instance));
        navigation.navigate('Home', {
            screen: "Transactions"
        })
    }

    const handleCancel = () => {
        navigation.navigate('Home', {
            screen: "Transactions"
        })
    }
    return (
        <Layout style={styles.container}>
            <TransactionTypeSwitcher selectedType={type} onTypeChange={(newType) => setType(newType)} />

            <View style={[styles.formContainer, { backgroundColor: formBackgroundColor }]}>
                <TextInput
                    placeholder="Сума"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Опис транзакції"
                    value={description}
                    onChangeText={setDescription}
                    style={styles.input}
                    multiline // Дозволяє введення тексту в кілька рядків
                />

                <CategorySelector
                    value={category}
                    categories={type === 'income' ? ['Salary', 'Gifts', 'Other'] : ['Food', 'Transport', 'Other']}
                    onSelectCategory={(selectedCategory) => setCategory(selectedCategory)}
                />

                <Pressable style={styles.dateButton} onPress={toggleDatePicker}>
                    <Text style={styles.dateButtonText}>
                        {date?.format ? date.format("DD MMMM YYYY") : ""}
                    </Text>
                </Pressable>

                <DatePickerModal
                    visible={isDatePickerVisible}
                    value={date}
                    onValueChange={handleDateChange}
                    locale='uk'
                    onSubmit={toggleDatePicker}
                />

            </View>
            <Pressable style={({ pressed }) => [
                styles.actionButton,
                pressed ? styles.buttonPressed : {},
                type === 'expense' && { backgroundColor: colors.expense }
            ]}
                onPress={handleSave}>
                <Text style={styles.actionButtonText}>Створити</Text>
            </Pressable>

            <Pressable style={({ pressed }) => [
                styles.actionButton,
                pressed ? styles.buttonPressed : {},
                type === 'expense' && { backgroundColor: colors.expense },
            ]}
                onPress={handleCancel}>
                <Text style={styles.actionButtonText}>Скасувати</Text>
            </Pressable>

        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#9575CD',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#FFFFFF', // Білий фон для поля введення
        color: '#512DA8', // Фіолетовий колір тексту
        fontSize: 16,
    },
    dateButton: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#9575CD',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#FFFFFF', // Білий фон для кнопки вибору дати
        alignItems: 'center', // Вирівнювання тексту кнопки по центру
    },
    dateButtonText: {
        color: '#512DA8', // Фіолетовий колір тексту
        fontSize: 16,
    },
    actionButton: {
        marginVertical: 10,
        backgroundColor: '#9575CD', // Фіолетовий колір з вашої кольорової гами
        padding: 15,
        borderRadius: 5,
        alignItems: 'center', // Вирівнювання тексту кнопки по центру
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    actionButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonPressed: {
        opacity: 0.7, // Зменшуємо прозорість кнопки при натисканні
    },

    formContainer: {
        padding: 16,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // ... Інші стилі для контейнера форми
    },
    // Стилі для CategorySelector та DatePickerModal можна адаптувати згідно з їхніми внутрішніми стилями
});


export default TransactionForm;
