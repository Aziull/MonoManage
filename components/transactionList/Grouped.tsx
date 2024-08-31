import { useRoute } from '@react-navigation/native';
import React, { memo, useCallback, useMemo } from 'react';
import { SectionList, SectionListData, StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { selectActiveBankIds } from '../../features/filter/slice';
import { Transaction } from '../../features/transaction/types';
import Helper from '../../helper';
import { TransactionSummary } from '../../helper/types';
import { useFetchTransactions } from '../../hook/useFetchTransactuins';
import { RootState } from '../../store';
import Progress from '../ui/Progress';
import EmptyList from './EmptyList';
import RenderItem from './RenderItem';
import SectionHeader from './SectionHeader';
import LockedOverlay from '../ui/LockedOverlay';

type Props = {
    transactions: Transaction[],
    actionFunc: (transaction: Transaction) => void,
}

const RenderHeader = ({ section }: { section: SectionListData<Transaction, TransactionSummary> }) => (<SectionHeader date={section.date} total={section.total} />)

const Grouped = memo(({ transactions, actionFunc }: Props) => {

    const route = useRoute();
    const accountsId = useSelector(selectActiveBankIds);
    const { fetchedAccounts, processedAccounts } = useSelector((state: RootState) => state.transaction);
    const { authToken } = useSelector((state: RootState) => state.authToken)
    const { refetch, refreshing } = useFetchTransactions(accountsId)

    const sections = useMemo(() => (Helper.Tranasctions.summarizeByDate(transactions)), [transactions]);

    const renderItem = useCallback(({ item: transaction }: { item: Transaction }) => (
        <RenderItem
            transaction={transaction}
            action={route.name === 'Transactions' ? "delete" : 'list'}
            actionFunc={actionFunc}
        />
    ), [actionFunc, route.name]);

    const value = useMemo(() => {
        return processedAccounts * 100 / fetchedAccounts;
    }, [processedAccounts, fetchedAccounts])


    return (
        <>
            <Progress value={value} />
            <SectionList
                refreshControl={
                    !!authToken
                        ? <RefreshControl refreshing={refreshing} onRefresh={refetch} />
                        : undefined
                }
                ListEmptyComponent={EmptyList}
                sections={sections}
                keyExtractor={(transaction, id) => transaction.id + id}
                renderItem={renderItem}
                renderSectionHeader={RenderHeader}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={true}
                windowSize={31}
                initialNumToRender={15}
                maxToRenderPerBatch={15}
            />
        </>

    );
});

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#dbd4ff',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
});

export default Grouped;