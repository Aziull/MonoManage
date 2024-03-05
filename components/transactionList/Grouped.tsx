import React from 'react';
import { SectionList, Text, View, StyleSheet } from 'react-native';
import RenderItem from './RenderItem';
import Helper from '../../helper';
import { Transaction } from '../../features/transaction/types';
import SectionHeader from './SectionHeader';

type Props = {
    transactions: Transaction[],
    actionFunc: (transaction: Transaction) => Promise<void>,
}

const Grouped = ({ transactions = [], actionFunc }: Props) => {
    const sections = Helper.Tranasctions.summarizeByDate(transactions);
    return (
        <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index, section }) => (
                <RenderItem
                    index={index}
                    section={section}
                    transaction={item}
                    action={"delete"}
                    actionFunc={actionFunc}
                />
            )}
            renderSectionHeader={({ section }) => (<SectionHeader section={section} />)}
            ItemSeparatorComponent={() => <View style={styles.separator} />} // Додано розділювач між елементами
            showsVerticalScrollIndicator={false}
            stickySectionHeadersEnabled={true}
        />
    );
};

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#E0E0E0', // Світло-сірий колір розділювача
    },
});

export default Grouped;