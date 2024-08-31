import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { convertToDate } from "../../../features/filter/lib";
import { setDateRange } from "../../../features/filter/slice";
import { RangeNames } from "../../../features/filter/types";
import DatePickerModal, { Range as RangeModal } from "../../../modal/DatePickerModal";
import { colors } from "../../../theme";
import DateUtils, { getEndOfCurrentYearUnixTime } from "../../../utils/timeUtils";
import Button from "../../button/Button";
import { ComponentProps } from "../FilterOptions";
import { DEFAULT_VALUES } from "../constants";
type Range = {
    title: RangeNames;
    start?: UnixTimestampSeconds;
    end?: UnixTimestampSeconds;
};

const renderDate = (date?: UnixTimestampSeconds): string => {
    return date ? DateUtils.formatters.twoDigitMonthFormatter.format(DateUtils.convertUnixToDate(date)) : '-';
};
const currentDate = DateUtils.getCurrentUnixTime()
const ranges: Range[] = [
    {
        title: "Вручну",
        start: undefined,
        end: undefined,
    },
    {
        title: "Місяць",
        start: DateUtils.getStartOfCurrentMonthUnixTime(),
        end: DateUtils.getEndOfCurrentMonthUnixTime(),
    },
    {
        title: "Квартал",
        start: DateUtils.getStartOfCurrentQuarterUnixTime(),
        end: DateUtils.getEndOfCurrentQuarterUnixTime(),
    },
    {
        title: "Рік",
        start: DateUtils.getStartOfCurrentYearUnixTime(),
        end: getEndOfCurrentYearUnixTime(),
    }
];

const defaultRange = { title: DEFAULT_VALUES.Timeframe }
const Timeframe = ({ close, filter }: ComponentProps) => {
    const timeframe = filter.timeframe;

    const [selectedRange, setSelectedRange] = useState<Range>(!timeframe ? defaultRange : timeframe);


    const [isShowModal, setIsShowModal] = useState(false)

    const dispatch = useDispatch();

    const handleSelectionChange = (range: Range) => {
        setSelectedRange(prev => ({
            ...range,
            start: range.start || prev?.start,
            end: range.end || prev?.end,
        }));

        if (!range.start || !range.end) setIsShowModal(true);
    };
    const onSubmit = (range: RangeModal) => {

        setSelectedRange({
            title: 'Вручну',
            start: DateUtils.convertToUnix(range.startDate),
            end: DateUtils.convertToUnix(range.endDate),
        } as Range)
        setIsShowModal(false);
    }


    const apply = () => {

        dispatch(setDateRange(selectedRange))
        close();
    }

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
                    dispatch(setDateRange(defaultRange))
                    setSelectedRange(defaultRange);
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
                    <Text style={styles.date}>{renderDate(selectedRange?.start)}</Text>
                </Button>
                <Button
                    variant={'ghost'}
                    color={colors.purple[200]}
                    onPress={() => setIsShowModal(true)}
                >
                    <Text style={styles.label}>До{" "}</Text>
                    <Text style={styles.date}>{renderDate(selectedRange?.end)}</Text>
                </Button>


            </View >
            <DatePickerModal
                datePickerProps={{
                    mode: 'range',
                    locale: 'uk',
                    params: {
                        startDate: selectedRange?.start ? DateUtils.convertUnixToDate(selectedRange.start) : undefined,
                        endDate: (selectedRange?.end && selectedRange?.end > DateUtils.getCurrentUnixTime()) ? convertToDate(currentDate) : convertToDate(selectedRange?.end),
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
                onPress={() => apply()}

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