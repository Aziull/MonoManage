import React, { useState, useRef } from 'react'
import { ScrollView, Platform, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Alert } from 'react-native'
import Layout from '../components/Layout';
import dayjs from 'dayjs';


import Button from '../components/Button';
import DataPickerModal from '../modal/DatePickerModal';
import { useStats } from '../hook/useStats';
import { Guid } from 'guid-ts';
import { useIgnoredTransactionsContext } from '../context/TransactionsContext';
import { Transaction } from '../types/transaction';
import { TransactionFormProps } from '../navigation/types';


const NewTransaction = ({ navigation }: TransactionFormProps) => {
    // const { create } = useIgnoredTransactionsContext();
    const { stats } = useStats();
    const [description, setDescription] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(dayjs());

    const [amount, setAmount] = useState('');

    const amountRef = useRef<TextInput>(null);
    const handleChange = (event: { nativeEvent: { text: React.SetStateAction<string>; }; }) => {
        setDescription(event.nativeEvent.text);
    };
    const handleChangeAmount = (event: { nativeEvent: { text: React.SetStateAction<string>; }; }) => {
        setAmount(event.nativeEvent.text);
    };
    const toggle = () => setIsOpen(prev => !prev);


    const createTransaction = async () => {
        const id = Guid.newGuid().toString();

        if (!description.trim().length || !date || (!amount.trim.length && !Number(amount.trim()))) return Alert.alert("Заповніть всі поля");

        const instance: Transaction = {
            id,
            amount: Number(amount) * 100,
            description,
            time: date.unix()
        }

        // await create(instance);
        navigation.navigate('Home', {
            screen: "Transactions"
        })
    }

    return (
        <Layout style={{
            backgroundColor: "#222222",
            rowGap: 30,
        }}>
            <View style={[s.container, s.bg]}>

                <TextInput
                    style={[s.textInput, { fontSize: 25, }]}
                    value={description}
                    onChange={handleChange}
                    onSubmitEditing={() => { amountRef?.current?.focus(); }}
                    inputMode="text"
                    keyboardAppearance="dark"
                    autoFocus={true}
                    placeholder={"Введіть назву"}
                    placeholderTextColor="gray"
                />
                <Button onPress={toggle}>
                    {date?.format ? date.format("DD MMMM YYYY, HH:mm") : ""}
                </Button>

                <DataPickerModal
                    visible={isOpen}
                    value={date}
                    onSubmit={toggle}
                    onRequestClose={toggle}
                    locale='uk'
                    onValueChange={(date) => setDate(dayjs(date))}
                />


                <View style={{
                    flexDirection: 'row',
                    gap: 10
                }}>
                    <TextInput
                        ref={amountRef}
                        style={[s.textInput, { fontSize: 35, }]}
                        value={amount}
                        onChange={handleChangeAmount}
                        onSubmitEditing={() => { }}
                        inputMode="numeric"
                        keyboardAppearance="dark"
                        placeholder={"Сума"}
                        placeholderTextColor="gray"
                    />
                    <Text style={{
                        fontSize: 35,
                        color: "white"
                    }}>ГРН</Text>
                </View>

            </View>
            <ScrollView contentContainerStyle={{
                rowGap: 30
            }}>
                {
                    stats.map(el => <View key={el.title} style={[s.bg, s.mh15, s.p, s.rounded]}>
                        <Text style={[s.white]}>
                            {el.title}
                        </Text>
                        <Text style={s.white}>{el.value} ГРН</Text>
                    </View>)
                }
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ paddingBottom: 60 }}
            >
                <Button onPress={createTransaction}>
                    Створити
                </Button>
            </KeyboardAvoidingView>

        </Layout >
    )
}

const s = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 40,
        rowGap: 30,
    },
    bg: {
        backgroundColor: '#292929',
    },
    mh15: {
        marginHorizontal: 15,
    },
    p: {
        padding: 20,
    },
    rounded: {
        borderRadius: 20,
    },
    white: {
        color: 'white'
    },
    textInput: {
        color: "white",
        textAlign: Platform.OS === 'android' ? 'center' : 'left',
        textAlignVertical: 'center',
    }
})

export default NewTransaction