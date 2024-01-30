import React, { useLayoutEffect } from 'react';
import { SectionList, Text, View, StyleSheet } from 'react-native';
import RenderItem from './RenderItem';
import { Transaction } from '../types/transaction';


type Props = {
    transactions: Transaction[],
    actionFunc: (item: Transaction) => void,
}

const Grouped = ({ transactions, actionFunc }: Props) => {
    // Підготовка даних для використання в SectionList
    const groupedData = transactions.reduce((acc, transaction) => {
        // Отримання дати в форматі 'день місяць'
        const date = new Date(transaction.time * 1000).toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
            year: "numeric"
        });

        // Додавання транзакції до відповідного розділу
        if (!acc[date]) {
            acc[date] = [];
        }

        acc[date].push(transaction);
        return acc;
    }, {});

    // Перетворення об'єкта в масив для SectionList
    const sections = Object.keys(groupedData).map((date) => {
        const today = groupedData[date].reduce((accumulator, transaction) => {
            return accumulator + transaction.amount;
        }, 0);
        return {
            title: date + " " + today / 100 + "грн",
            data: groupedData[date],
        }

    });

    const ItemSeparator = () => {
        return <View style={styles.separator} />;
    };

    // Компонент SectionList
    return (
        <SectionList
            sections={sections}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index, section }) => <RenderItem
                index={index}
                section={section}
                transaction={item} action={"-"}
                actionFunc={actionFunc} />}
            renderSectionHeader={({ section: { title } }) => (
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>{title}</Text>
                </View>

            )}
            showsVerticalScrollIndicator={false}
            stickySectionHeadersEnabled={true}
        />
    );
};

const styles = StyleSheet.create({
    sectionHeader: {
        // backgroundColor: '#000',
        paddingVertical: 15,
        alignItems: 'center',
    },
    sectionHeaderText: {
        fontSize: 15,
        // color: 'silver',
    },
    separator: {
        height: 20,
    }
});

export default Grouped;