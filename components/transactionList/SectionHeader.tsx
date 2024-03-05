import { SectionListData, StyleSheet, Text, View } from "react-native"
import { Transaction } from "../../features/transaction/types"
import { TransactionSummary } from "../../helper/types"

const SectionHeader = ({ section: { date, total } }: { section: SectionListData<Transaction, TransactionSummary> }) => {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderDate}>{date}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.sectionHeaderTotal}>{total}₴</Text>
            </View>
        </View>
    )
}

export default SectionHeader;


const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDE7F6',
        padding: 10,
        paddingVertical: 5,

        shadowColor: '#000', // Колір тіні
        shadowOffset: { width: 0, height: 2 }, // Зміщення тіні
        shadowOpacity: 0.1, // Прозорість тіні
        shadowRadius: 4, // Радіус розмиття тіні
        elevation: 5, // Висота тіні для Android
    },
    sectionHeaderDate: {
        fontSize: 15, // Розмір шрифту для дати
        color: '#512DA8', // Фіолетовий колір тексту
    },
    sectionHeaderTotal: {
        fontSize: 15, // Розмір шрифту для суми
        color: '#9575CD', // Фіолетовий колір тексту
        fontWeight: "bold"
    },
});