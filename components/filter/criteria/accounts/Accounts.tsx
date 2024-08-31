import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { setAccountsId } from "../../../../features/filter/slice";
import AccountsList from "./accountsList";
import { selectBankAccounts, selectCashAccounts } from "../../../../features/accounts/slice";
import Button from "../../../button/Button";
import { ComponentProps } from "../../FilterOptions";

const Accounts = ({ close, filter: { accountsId = [] } }: ComponentProps) => {
    const dispatch: AppDispatch = useDispatch();
    const cashAccounts = useSelector(selectCashAccounts);
    const bankAccounts = useSelector(selectBankAccounts);

    const bankIds = useMemo(() => (bankAccounts.map(acc => acc.id)), [bankAccounts]);
    const cashIds = useMemo(() => (cashAccounts.map(acc => acc.id)), [cashAccounts]);

    const defaultSelectedIds = useMemo(() => ({
        bank: accountsId.length === 0 ? bankIds : accountsId.filter(id => bankIds.some(account => account === id)),
        cash: accountsId.length === 0 ? cashIds : accountsId.filter(id => cashIds.some(account => account === id)),
    }), [accountsId, bankIds, cashIds]);

    const [selectedIds, setSelectedIds] = useState<{ bank: string[]; cash: string[] }>(defaultSelectedIds);

    const handleSelectAll = useCallback(() => {
        setSelectedIds({
            bank: bankIds,
            cash: cashIds,
        });
    }, [bankIds, cashIds]);

    const handleDeselectAll = useCallback(() => {
        setSelectedIds({ bank: [], cash: [] });
    }, []);

    const applySelection = useCallback(() => {
        dispatch(setAccountsId([...selectedIds.bank, ...selectedIds.cash]));
        close();
    }, [selectedIds, dispatch, close]);

    const isSelectionEmpty = useMemo(() => !selectedIds.bank.length && !selectedIds.cash.length, [selectedIds]);

    return (
        <View style={styles.container}>
            <Button
                style={styles.resetButton}
                onPress={handleSelectAll}
                size='sm'
                variant='ghost'>
                Скинути
            </Button>
            <Text style={styles.headerText}>Рахунки</Text>
            <View style={styles.actionButtons}>
                <Button
                    align="center"
                    variant="ghost"
                    onPress={handleSelectAll}
                    style={styles.flexButton}
                >
                    Вибрати все
                </Button>
                <Button
                    align="center"
                    variant="ghost"
                    onPress={handleDeselectAll}
                    style={styles.flexButton}
                >
                    Відмінити все
                </Button>
            </View>
            <ScrollView style={styles.accountsList}>
                <AccountsList
                    title="Банківські рахунки"
                    accounts={bankAccounts}
                    update={ids => setSelectedIds(prev => ({ ...prev, bank: ids }))}
                    selectedIds={selectedIds.bank}
                />
                <AccountsList
                    title="Готівка"
                    accounts={cashAccounts}
                    update={ids => setSelectedIds(prev => ({ ...prev, cash: ids }))}
                    selectedIds={selectedIds.cash}
                    containerStyle={styles.lastAccountList}
                />
            </ScrollView>
            <Button
                onPress={applySelection}
                disabled={isSelectionEmpty}
                style={{
                    width: '100%',
                    padding: 13,
                    alignItems: 'center',
                    borderRadius: 10,
                    marginBottom: 40
                }}
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
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#ddc8fd',
    },
    flexButton: {
        flex: 1,
    },
    accountsList: {
        padding: 15,
        marginHorizontal: -16,
        marginBottom: 15,
        maxHeight: 350,
        backgroundColor: '#ddc8fd',
    },
    lastAccountList: {
        marginBottom: 0,
    },
    resetButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 0,
    },
    applyButton: {
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
