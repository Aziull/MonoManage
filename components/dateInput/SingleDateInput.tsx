import { useState } from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePickerModal, { Single } from "../../modal/DatePickerModal";
import dayjs, { Dayjs } from "dayjs";
import { StyleSheet, Text } from "react-native";
import Button from "../button/Button";
type Props = {
    date: Date
    setDate: (date: Dayjs) => void
}
const SingleDateInput = ({ setDate, date: dateDate }: Props) => {
    const date = dayjs(dateDate)
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const onSubmit = (data: Single) => {
        setDate(dayjs(data.date));
        setDatePickerVisible(!isDatePickerVisible);
    };
    return (
        <>
            <Button variant='ghost' style={styles.dateButton} containerStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 3
            }}
                onPress={() => setDatePickerVisible(true)}
                icon={{
                    name: 'calendar',
                    size: 18,
                    color: 'rgba(82, 45, 168, 0.7)'
                }}
            >
                <Text style={styles.dateButtonText}>
                    {new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }).format(dateDate)}
                </Text>
            </Button>

            <DatePickerModal
                datePickerProps={{
                    mode: 'single',
                    locale: 'uk',
                    params: {
                        date: date,
                    }
                }}
                modalProps={{
                    visible: isDatePickerVisible,
                    style: {
                    }
                }}
                onSubmit={onSubmit}
                cancel={() => setDatePickerVisible(false)}
            />
        </>
    )
}

const styles = StyleSheet.create({
    dateButton: {
        marginHorizontal: 'auto',
    },
    dateButtonText: {
        color: 'rgba(82, 45, 168, 0.7)', // Фіолетовий колір тексту
        fontSize: 17,
    },
});

export default SingleDateInput;