import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../../../Button";
import { useDispatch, useSelector } from "react-redux";
import { selectBankAccounts, selectCashAccounts } from "../../../../features/accounts/selectors";
import { AppDispatch, RootState } from "../../../../store";
import { setAccountsId } from "../../../../features/filter/slice";
import AccountsList from "./accountsList";

const Accounts = () => {
    const [selectedIds, setSelectedIds] = useState<{ bank: string[]; cash: string[] }>({ bank: [], cash: [] });

    const cashAccounts = useSelector(selectCashAccounts);
    const bankAccounts = useSelector(selectBankAccounts);
    const { accountsId } = useSelector((state: RootState) => state.filters);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const cashIds = accountsId.filter(id => cashAccounts.some(account => account.id === id));
        const bankIds = accountsId.filter(id => bankAccounts.some(account => account.id === id));
        setSelectedIds({ bank: bankIds, cash: cashIds });
    }, [accountsId, bankAccounts, cashAccounts]);

    const handleSelectAll = () => {
        setSelectedIds({
            bank: bankAccounts.map(({ id }) => id),
            cash: cashAccounts.map(({ id }) => id),
        });
    };

    const handleDeselectAll = () => {
        setSelectedIds({ bank: [], cash: [] });
    };

    // Застосування вибраних рахунків
    const applySelection = () => {
        dispatch(setAccountsId([...selectedIds.bank, ...selectedIds.cash]));
    };

    const isSelectionEmpty = !selectedIds.bank.length && !selectedIds.cash.length;

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Рахунки</Text>
            <View style={styles.actionButtons}>
                <Button onPress={handleSelectAll} style={styles.selectButton}>
                    <Text style={styles.buttonText}>Вибрати все</Text>
                </Button>
                <Button onPress={handleDeselectAll} style={styles.deselectButton}>
                    <Text style={styles.buttonText}>Відмінити все</Text>
                </Button>
            </View>
            <ScrollView style={styles.accountsList}>
                <AccountsList title="Банківські рахунки"
                    accounts={bankAccounts}
                    update={(ids) => setSelectedIds(prev => ({ ...prev, bank: ids }))}
                    selectedIds={selectedIds.bank}
                />
                <AccountsList title="Готівка"
                    accounts={cashAccounts}
                    update={(ids) => setSelectedIds(prev => ({ ...prev, cash: ids }))}
                    selectedIds={selectedIds.cash}
                    containerStyle={{
                        marginBottom: 0
                    }}
                />
            </ScrollView>
            <Button
                onPress={applySelection}
                style={[
                    styles.applyButton,
                    {
                        backgroundColor: isSelectionEmpty ? 'rgba(82, 45, 168, 0.5)' : '#512DA8',
                        elevation: 3,
                        shadowOpacity: 0.1,
                        shadowRadius: 3,
                        shadowOffset: { height: 2, width: 0 },
                    },
                ]}
                disabled={isSelectionEmpty}
            >
                <Text style={styles.applyButtonText}>Застосувати</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
    },
    headerText: {
        color: '#673AB7',
        fontSize: 17,
        alignSelf: 'center',
        marginBottom: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        marginHorizontal: -16,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#ddc8fd',
    },
    selectButton: {
        flex: 1,
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#ddc8fd',
        paddingVertical: 5,
    },
    deselectButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#673AB7',
    },
    accountsList: {
        padding: 15,
        marginHorizontal: -16,
        marginBottom: 15,
        maxHeight: 350,
        backgroundColor: '#ddc8fd',
    },
    applyButton: {
        width: '100%',
        padding: 13,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 40,
    },
    applyButtonText: {
        color: '#EDE7F6',
        fontSize: 18,
    },
});

export default Accounts;