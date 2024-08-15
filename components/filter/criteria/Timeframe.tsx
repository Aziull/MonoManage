import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import DatePickerModal, { Range as RangeModal } from "../../../modal/DatePickerModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setDateRange } from "../../../features/filter/slice";
import { convertToDate } from "../../../features/filter/lib";
import Button from "../../button/Button";
import { colors } from "../../../theme";
import { RangeNames } from "../../../features/filter/types";
type Range = {
    title: RangeNames;
    fromDate?: Date;
    toDate?: Date;
};

const renderDate = (date?: Date): string => {
    return date ? new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: '2-digit', year: 'numeric' }).format(date) : '-';
};
const currentDate = new Date();
const ranges: Range[] = [
    {
        title: "Вручну",
        fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
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

const Timeframe = ({ close }: { close: () => void }) => {
    const { timeframe } = useSelector((state: RootState) => state.filters);
    const [selectedRange, setSelectedRange] = useState<Range | null>(ranges.find(range => range.title === timeframe.title)!);

    useEffect(() => {
        setSelectedRange(prev => ({
            ...prev,
            fromDate: timeframe.start,
            toDate: timeframe.end,
        }) as Range)
    }, [])

    const [isShowModal, setIsShowModal] = useState(false)

    const dispatch = useDispatch();

    const handleSelectionChange = (range: Range) => {
        setSelectedRange(prev => ({
            ...range,
            fromDate: range.fromDate || prev?.fromDate,
            toDate: range.toDate || prev?.toDate,
        }));

        if (!range.fromDate || !range.toDate) setIsShowModal(true);
    };

    const onSubmit = (range: RangeModal) => {
        setSelectedRange(prev => ({
            ...prev,
            fromDate: range.startDate,
            toDate: range.endDate,
        }) as Range)
        setIsShowModal(false);
    }


    //todo: можливо перенести на рівень вище
    const apply = (title: RangeNames) => {

        dispatch(setDateRange({
            start: convertToDate(selectedRange?.fromDate)?.getTime(),
            end: convertToDate(selectedRange?.toDate)?.getTime(),
            title
        }))
        close();
    }
    const disabled = !selectedRange?.fromDate && !selectedRange?.toDate;
    return (
        <View style={{ alignItems: 'center' }}>
            <Button
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    padding: 0,
                }}
                containerStyle={{
                    padding: 0
                }}
                onPress={() => {
                    setSelectedRange(ranges[0]);
                }}
                size='sm'
                variant='ghost'>
                Скинути
            </Button>
            <Text style={styles.headerText}>Період</Text>
            <View style={styles.timeContainer}>
                <Button
                    variant={'ghost'}
                    color={colors.purple[200]}
                    onPress={() => setIsShowModal(true)}
                >
                    <Text style={styles.label}>Від{" "} </Text>
                    <Text style={styles.date}>{renderDate(selectedRange?.fromDate)}</Text>
                </Button>
                <Button
                    variant={'ghost'}
                    color={colors.purple[200]}
                    onPress={() => setIsShowModal(true)}
                >
                    <Text style={styles.label}>До{" "}</Text>
                    <Text style={styles.date}>{renderDate(selectedRange?.toDate)}</Text>
                </Button>


            </View >
            <DatePickerModal
                datePickerProps={{
                    mode: 'range',
                    locale: 'uk',
                    params: {
                        startDate: selectedRange?.fromDate,
                        endDate: (selectedRange?.toDate && selectedRange?.toDate > currentDate) ? currentDate : selectedRange?.toDate,
                    }
                }}
                modalProps={{
                    visible: isShowModal,
                }}

                onSubmit={onSubmit}
                cancel={() => setIsShowModal(false)}
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
                width: '100%',
                padding: 13,
                alignItems: 'center',
                borderRadius: 10,
                marginBottom: 40
            }}
                disabled={disabled}
                onPress={() => apply(selectedRange?.title || "Вручну")}

            >
                Застосувати
            </Button>

        </View >
    )
}

const styles = StyleSheet.create({
    headerText: {
        color: colors.purple[950],
        fontSize: 17,
        marginBottom: 18,
    },
    timeContainer: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 10,
    },
    dateSelect: {
        flex: 1,
        backgroundColor: colors.purple[50],
        borderRadius: 10,

        padding: 10

    },
    label: {
        color: colors.purple[950]
    },
    date: {
        color: colors.purple[700],
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
        borderColor: colors.purple[700],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    selectedRadio: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: colors.purple[700],
    },
    radioText: {
        fontSize: 16,
        color: colors.purple[700],
    },
})

export default Timeframe;