import { useState } from "react";
import Button from "../Button";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePickerModal, { Single } from "../../modal/DatePickerModal";
import dayjs, { Dayjs } from "dayjs";
import { StyleSheet, Text } from "react-native";
type Props = {
    date: Dayjs
    setDate: (date: Dayjs) => void
}
const SingleDateInput = ({ setDate, date }: Props) => {
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const onSubmit = (data: Single) => {
        setDate(dayjs(data.date));
        setDatePickerVisible(!isDatePickerVisible);
    };
    return (
        <>
            <Button style={styles.dateButton} containerStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 3
            }}
                onPress={() => setDatePickerVisible(true)}
            >
                <MaterialIcons name='date-range' size={15} color='rgba(82, 45, 168, 0.7)' />
                <Text style={styles.dateButtonText}>
                    {date?.format ? date.format("DD MMMM YYYY") : ""}
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
        padding: 10,
    },
    dateButtonText: {
        color: 'rgba(82, 45, 168, 0.7)', // Фіолетовий колір тексту
        fontSize: 17,
    },
});

export default SingleDateInput;