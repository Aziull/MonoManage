import React, { memo, useCallback, useMemo } from 'react';
import { SectionList, Text, View, StyleSheet, SectionListData } from 'react-native';
import RenderItem from './RenderItem';
import Helper from '../../helper';
import { Transaction } from '../../features/transaction/types';
import SectionHeader from './SectionHeader';
import { TransactionSummary } from '../../helper/types';
import { useRoute } from '@react-navigation/native';

type Props = {
    transactions: Transaction[],
    actionFunc: (transaction: Transaction) => void,
}


const RenderHeader = ({ section }: { section: SectionListData<Transaction, TransactionSummary> }) => (<SectionHeader date={section.date} total={section.total} />)
const Separator = () => <View style={styles.separator} />

const Grouped = ({ transactions = [], actionFunc }: Props) => {

    const route = useRoute();

    const sections = useMemo(() => (Helper.Tranasctions.summarizeByDate(transactions)), [transactions]);
    const callback = useCallback(actionFunc, []);
    const renderItem = useCallback(({ item: transaction }: { item: Transaction }) => (
        <RenderItem
            transaction={transaction}
            action={route.name === 'Transactions' ? "delete" : 'list'}
            actionFunc={callback}
        />
    ), []);




    return (
        <>
            <SectionList
                ListEmptyComponent={() => (
                    <View style={{flex: 1, alignItems:"center"}}><Text>Тут поки порожньо. Поки... -_-</Text></View>
                )}
                sections={sections}
                keyExtractor={(transaction, id) => transaction.id + id}
                renderItem={renderItem}
                renderSectionHeader={RenderHeader}
                // ItemSeparatorComponent={Separator}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={true}
                windowSize={31}
                initialNumToRender={15}
                maxToRenderPerBatch={15}

            />
        </>

    );
};

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