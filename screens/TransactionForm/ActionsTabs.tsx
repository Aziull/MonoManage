import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import Numpad from '../../components/numpad/Numpad';
import DateTimePicker from 'react-native-ui-datepicker';
import TransactionNamePicker from '../../components/TransactionNamePicker';
import WalletSelector from './WalletSelector';
import { ActionType, TabButtonType } from './TransactionForm';
import { TabButton, TabSymbolIconButton } from '../../components/numpad/TabButton';
import { colors } from '../../theme';

interface ActionsTabsProps {
    selectedAction: ActionType;
    control: any;
    getValues: (name: string) => string;
    currentDate: Date;
    changeTab: (tab: ActionType) => void;
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

const ActionsTabs: React.FC<ActionsTabsProps> = ({ selectedAction, control, getValues, currentDate, changeTab }) => {
    const handleNumpadPress = (key: string, onChange: (value: string) => void) => {
        const currentAmount = getValues('amount');
        const initValue = '0.00';
        const isDeleting = key === 'delete';
        const isDecimal = key === '.';
        const isInitialValue = currentAmount === initValue;
        const lastCharIsDecimal = currentAmount.at(-1) === '.';
        const hasDecimal = currentAmount.includes('.');
        const oneLength = currentAmount.length === 1;
        const zero = currentAmount === '0';

        if (isDecimal && (lastCharIsDecimal || hasDecimal)) return;
        if (isInitialValue && isDeleting) return;
        if (oneLength && isDeleting) return onChange(initValue);
        if (isInitialValue && !isDeleting) return onChange(key);
        if (isDeleting) return onChange(currentAmount.slice(0, -1));
        if (zero && !isDecimal) return onChange('0.' + key);

        onChange(currentAmount + key);
    };

    return (
        <View style={styles.actionsContainer}>
            <View style={styles.actionsViews}>
                {selectedAction === '₴' && <Controller
                    control={control}
                    name="amount"
                    render={({ field: { onChange, } }) => (
                        <Numpad onKeyPress={(key) => handleNumpadPress(key, onChange)} />
                    )}
                />
                }
                {selectedAction === 'date' &&
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
                                    color: colors.purple[500]
                                }}
                                weekDaysTextStyle={{ color: colors.purple[900] }}
                                selectedItemColor={colors.purple[500]}
                                headerButtonColor={colors.purple[800]}
                                headerTextStyle={{ color: colors.purple[500] }}
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
                }
                {selectedAction === 'description' && (
                    <Controller
                        control={control}
                        name='description'
                        render={({ field: { onChange } }) => (
                            <TransactionNamePicker
                                onNotFoundPress={() => { }}
                                onNamePress={(name) => { onChange(name) }}
                            />
                        )}
                    />



                )}
                {selectedAction === 'account' &&
                    <Controller
                        control={control}
                        name="accountId"
                        render={({ field: { onChange, value } }) => (
                            <WalletSelector onSelectAccount={onChange} accountId={value} />
                        )}
                    />
                }
            </View>
            <View style={styles.tabController}>
                {tabButtons.map(({ value, button, icon }) => {
                    return value !== '₴' ? (
                        <TabButton
                            key={value}
                            button={button}
                            icon={icon}
                            onKeyPress={() => { changeTab(value) }}
                            isActive={selectedAction === value}
                        />) : (
                        <TabSymbolIconButton
                            key={value}
                            button={'Сума'}
                            onKeyPress={() => { changeTab(value) }}
                            iconSign={value}
                            isActive={selectedAction === value}
                        />
                    )
                })}

            </View>
        </View>
    );
};

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
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    typeSwitcher: {
        alignSelf: 'center',
    },
});

export default ActionsTabs;
