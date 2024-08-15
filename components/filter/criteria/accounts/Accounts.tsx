import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { setAccountsId } from "../../../../features/filter/slice";
import AccountsList from "./accountsList";
import { selectBankAccounts, selectCashAccounts } from "../../../../features/accounts/slice";
import Button from "../../../button/Button";

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
                <Button
                    align="center"
                    variant={'ghost'}
                    onPress={handleSelectAll}
                >
                    Вибрати все
                </Button>
                <Button
                    onPress={handleDeselectAll}
                    variant={'ghost'}
                    align={'center'}
                >
                    Відмінити все
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
                width="full"
                size="lg"
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