import { memo } from "react";
import { StyleSheet, Text, View } from "react-native"


const SectionHeader = memo(({ date, total }: { date: string, total: number }) => {

    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderDate}>{date}</Text>
            <Text style={styles.sectionHeaderTotal}>{total}₴</Text>
        </View>
    )
})

export default SectionHeader;


const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingVertical: 5,
        backgroundColor: '#f5f2ff',
        marginHorizontal: 8,
    },
    sectionHeaderDate: {
        fontSize: 14, // Розмір шрифту для дати
        color: '#a385ff', // Фіолетовий колір тексту
        marginHorizontal: 'auto',
    },
    sectionHeaderTotal: {
        position: 'absolute',
        right: 12,
        fontSize: 16, // Розмір шрифту для суми
        color: '#6a1ee3', // Фіолетовий колір тексту
    },
});