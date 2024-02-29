import { Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../../Button";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import DatePickerModal from "../../../modal/DatePickerModal";
type Range = {
    title: string;
    fromDate?: Date;
    toDate?: Date;
};

const formatDate = (date: Date): string => {
    const months = ['січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
};

const renderDate = (date?: Date): string => {
    return date ? formatDate(date) : '-';
};


const ranges: Range[] = [
    {
        title: "Вручну",
        fromDate: undefined,
        toDate: undefined,
    },
    {
        title: "Місяць",
        fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        toDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    },
    {
        title: "Квартал",
        fromDate: new Date(new Date().getFullYear(), Math.floor(new Date().getMonth() / 3) * 3, 1),
        toDate: new Date(new Date().getFullYear(), Math.floor(new Date().getMonth() / 3) * 3 + 3, 0),
    },
    {
        title: "Рік",
        fromDate: new Date(new Date().getFullYear(), 0, 1),
        toDate: new Date(new Date().getFullYear(), 11, 31),
    }
];

const Timeframe = () => {
    const [selectedRange, setSelectedRange] = useState<Range | null>(null);

    const [isShowModal, setIsShowModal] = useState(false)

    const handleSelectionChange = (range: Range) => {
        setSelectedRange(range);
    };

    const onSetFromDateSubmit = () => {

    }

    const onSetToDateSubmit = () => {

    }

    const onCancelSubmit = () => {
        setIsShowModal(false)
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerText}>Період часу</Text>
            <View style={styles.timeContainer}>
                <Button style={styles.dateSelect} onPress={() => setIsShowModal(true)}>
                    <Text style={styles.label}>Від</Text>
                    <Text style={styles.date}>{renderDate(selectedRange?.fromDate)}</Text>
                </Button>
                <Button style={styles.dateSelect} onPress={() => setIsShowModal(true)} >
                    <Text style={styles.label}>До</Text>
                    <Text style={styles.date}>{renderDate(selectedRange?.toDate)}</Text>
                </Button>


            </View >
            <DatePickerModal
                locale='uk'
                onSubmit={() => { setIsShowModal(false) }}
                onCancelSubmit={onCancelSubmit}
                onValueChange={() => { }}
                visible={isShowModal}
            />
            <View style={{
                marginBottom: 15,
                width: '100%',
            }}>

                {ranges.map((range, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.radioButton,
                            {
                                borderBottomWidth: index !== ranges.length - 1 ? 1 : 0,
                                borderBottomColor: "#b694ff"
                            }
                        ]}
                        onPress={() => handleSelectionChange(range)}
                    >
                        <View style={styles.radioCircle}>
                            {selectedRange?.title === range.title && <View style={styles.selectedRadio} />}
                        </View>
                        <Text style={styles.radioText}>{range.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Button style={{
                backgroundColor: '#512DA8',
                width: '100%',
                padding: 13,
                alignItems: 'center',
                borderRadius: 10,
                marginBottom: 40
            }}>
                <Text style={{
                    color: '#EDE7F6',
                    fontSize: 18,
                }}>Застосувати</Text>
            </Button>

            {/* <DataPickerModal
                visible={isOpen}
                value={date}
                onSubmit={toggle}
                onRequestClose={toggle}
                locale='uk'
                onValueChange={(date) => setDate(dayjs(date))}
            /> */}
        </View >
    )
}

const styles = StyleSheet.create({
    headerText: {
        color: '#673AB7',
        fontSize: 17,
        marginBottom: 10,
    },
    timeContainer: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 10,
    },
    dateSelect: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,

        padding: 10

    },
    label: {
        color: "#9575CD",
    },
    date: {
        color: "#512DA8"
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingVertical: 20,

    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#512DA8",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    selectedRadio: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: "#512DA8",
    },
    radioText: {
        fontSize: 16,
        color: "#512DA8",
    },
})

export default Timeframe;