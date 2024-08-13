import React, { useCallback, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, ImageBackground } from 'react-native';
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
import Button  from '../../components/button/Button';
import HiddeOnKeyboard from '../../components/HiddeByKeyboard';
import { TabButton, TabSymbolIconButton } from '../../components/numpad/TabButton';
import { LinearGradient } from 'expo-linear-gradient';
import TransactionNamePicker from '../../components/TransactionNamePicker';
import ActionButtons from './ActionButtons';
import { TabPanel, TabPanels, Tabs, TabsList } from '../../components/ui/tabs';

type ActionType = '₴' | 'description' | 'account' | 'date';
type TabButtonType = {
    value: ActionType,
    button: string,
    icon?: {
        name: string, color: string, size: number
    }
}

const tabButtons: TabButtonType[] = [
    {
        value: '₴',
        button: '₴',
    },
    {
        value: 'description',
        button: 'Назва',
        icon: { name: 'edit', color: '#7e47ff', size: 20 },

    },
    {
        value: 'date',
        button: 'Дата',
        icon: { name: 'calendar', color: '#7e47ff', size: 20 },

    },
];



const TransactionForm: React.FC<TransactionFormProps> = ({ navigation, route }) => {
    let currentDate = new Date();
    const [type, setType] = useState<TransactionType>(route.params.type);

    const dispatch = useDispatch<AppDispatch>();
    const [selectedAction, setSelectedAction] = useState<ActionType>('₴');
    const descriptionRef = useRef<TextInput>(null);
    const { control, handleSubmit, getValues, formState: { isDirty }, setValue } = useForm<z.infer<typeof TransactionFormValidation>>({
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
        name: ['date', 'amount'],
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


    const handleNumpadPress = useCallback((key: string, onChange: (value: string) => void) => {
        const currentAmount = getValues('amount');

        const initValue = '0.00'
        const isDeleting = key === 'delete';
        const isDecimal = key === '.';
        const isInitialValue = currentAmount === initValue;
        const lastCharIsDecimal = currentAmount.at(-1) === '.';
        const hasDecimal = currentAmount.includes('.');
        const oneLenght = currentAmount.length === 1;
        const zero = currentAmount === '0'

        if (isDecimal && (lastCharIsDecimal || hasDecimal)) return;
        if (isInitialValue && isDeleting) return;
        if (oneLenght && isDeleting) return onChange(initValue);
        if (isInitialValue && !isDeleting) return onChange(key);
        if (isDeleting) return onChange(currentAmount.slice(0, -1));
        if (zero && !isDecimal) return onChange('0.' + key);

        onChange(currentAmount + key);
    }, []);

    if (selectedAction !== 'description' && descriptionRef.current?.isFocused) {
        descriptionRef.current?.blur();
    }

    const onDescriptionPress = useCallback(() => {
        if (selectedAction !== 'description')
            setSelectedAction('description')
    }, [selectedAction])

    const onNotFoundPress = () => {

        if (descriptionRef.current?.focus) { descriptionRef.current?.blur(); }
        descriptionRef.current?.focus();
    }
    return (
        <Layout style={styles.container}>
            <View style={styles.formContainer}>
                <ImageBackground source={require('../../assets/card-bg.jpg')} resizeMode="cover" style={styles.data}>
                    <PageHeader type={type} setType={(type) => setType(type)} />
                    <View style={styles.dataContiner}>
                        <Button
                            variant='ghost'
                            style={{
                                paddingLeft: 0,
                                paddingVertical: 0,
                            }}
                            containerStyle={{
                                flexDirection: 'row',
                                paddingLeft: 0,
                            }}
                            onPress={() => setSelectedAction('date')}
                            icon={{
                                name: 'calendar',
                                size: 18,
                                color: 'white',
                                containerStyle: {
                                    paddingHorizontal: 0,
                                }
                            }}
                            textStyle={{
                                color: 'white',
                                fontSize: 17,
                            }}
                        >
                            {new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }).format(
                                watched[0]
                            )}
                        </Button>

                        <Button
                            variant='ghost'
                            style={{
                                paddingLeft: 0,
                                paddingVertical: 0,
                            }}
                            containerStyle={{
                                paddingLeft: 0,
                            }}
                            onPress={() => setSelectedAction('₴')}
                        >
                            <Text style={{
                                fontWeight: '900',
                                fontSize: 20,
                                color: 'white',
                                marginRight: 10
                            }}>
                                ₴
                            </Text>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: watched[1] === '0.00' ? '#eee' : 'white',
                            }}>
                                {`${watched[1]}`}
                            </Text>
                        </Button>

                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={styles.inputRow}>
                                    <Icon name="edit" size={18} color="white" style={styles.inputIcon} />
                                    <TextInput
                                        ref={descriptionRef}
                                        placeholder="Назва транзакції"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        style={styles.description}
                                        placeholderTextColor="white"
                                        onPress={onDescriptionPress}
                                    />
                                </View>
                            )}
                        />

                    </View>

                </ImageBackground>
                <ActionButtons disabled={!isDirty} style={{ alignSelf: 'flex-end', direction: 'rtl', flexWrap: 'nowrap', marginHorizontal: 24, }} shape='roundedFull' type={type} handleSave={handleSubmit(onSubmit)} />
                <HiddeOnKeyboard>
                    <Tabs style={styles.actionsContainer} tabs={tabButtons} defaultValue='₴'>
                        <TabPanels style={styles.actionsViews}>
                            <TabPanel<TabButtonType> value='₴'>
                                <Controller
                                    control={control}
                                    name="amount"
                                    render={({ field: { onChange, } }) => (
                                        <Numpad onKeyPress={(key) => handleNumpadPress(key, onChange)} />
                                    )}
                                />
                            </TabPanel>
                            <TabPanel<TabButtonType> value='description'>
                                <Controller
                                    control={control}
                                    name='description'
                                    render={({ field: { onChange } }) => (
                                        <TransactionNamePicker
                                            onNotFoundPress={onNotFoundPress}
                                            onNamePress={(name) => { onChange(name) }}
                                        />
                                    )}
                                />
                            </TabPanel>
                            <TabPanel<TabButtonType> value='date'>
                                <Controller
                                    control={control}
                                    name="date"
                                    render={({ field: { onChange, value } }) => (
                                        <DateTimePicker
                                            onChange={({ date: dateStr }) => {
                                                const date = new Date(dateStr as string);
                                                onChange(date)
                                            }}
                                            date={value}
                                            calendarTextStyle={{
                                                color: '#7e47ff'
                                            }}
                                            weekDaysTextStyle={{ color: '#49169c' }}
                                            selectedItemColor='#7e47ff'
                                            headerButtonColor='#5818bf'
                                            headerTextStyle={{ color: '#7e47ff' }}
                                            mode='single'
                                            locale={'uk'}
                                            maxDate={currentDate}
                                            firstDayOfWeek={1}
                                            timePicker
                                            height={180}
                                            selectedTextStyle={{
                                                fontWeight: 'bold',
                                            }}

                                        />
                                    )}
                                />
                            </TabPanel>
                            <TabPanel<TabButtonType> value='account'>
                                <Controller
                                    control={control}
                                    name="accountId"
                                    render={({ field: { onChange, value } }) => (
                                        <WalletSelector onSelectAccount={onChange} accountId={value} />
                                    )}
                                />
                            </TabPanel>
                        </TabPanels>
                        <TabsList<TabButtonType>
                            style={styles.tabController}
                            renderActiveTrigger={(child) => (
                                <View >
                                    {child}
                                    <View style={{
                                        position: 'absolute',
                                        bottom: 5,
                                        alignSelf: 'center',
                                        width: '40%',
                                        borderWidth: 1.5,
                                        borderRadius: 10,
                                        borderColor: '#7e47ff'
                                    }} />
                                </View>
                            )}
                            renderTrigger={({ tab: { value, button, icon }, isActive, changeTab }) => (
                                value !== '₴' ? (
                                    <TabButton
                                        key={value}
                                        button={button}
                                        icon={icon}
                                        onKeyPress={changeTab}
                                        isActive={isActive}
                                    />) : (
                                    <TabSymbolIconButton
                                        key={value}
                                        button={'Сума'}
                                        onKeyPress={changeTab}
                                        iconSign={value}
                                        isActive={isActive}
                                    />
                                )
                            )}
                        />
                    </Tabs>

                </HiddeOnKeyboard>
            </View>

            <LinearGradient
                colors={['transparent', '#c2b1ff']}
                style={styles.background}
            />
        </Layout >
    );
};

const CustomTabTrigger = ({ isActive, children }: { isActive: boolean; children: React.ReactNode }) => {
    return (
        <View>
            <Text style={{ color: isActive ? 'blue' : 'gray' }}>{children}</Text>
        </View>
    );
};

const PageHeader = ({ type, setType }: { type: TransactionType, setType: (newType: TransactionType) => void }) => {
    return (
        <>
            <View style={styles.footer}>
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    typeSwitcher: {
        alignSelf: 'center',
    },
});

export default TransactionForm;
