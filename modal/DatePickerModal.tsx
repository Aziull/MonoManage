import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { Modal, ModalProps, View, StyleSheet, TouchableOpacity, Text, Pressable } from "react-native";
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import 'dayjs/locale/uk';
import { DatePickeMultipleProps, DatePickerRangeProps, DatePickerSingleProps } from "react-native-ui-datepicker/lib/typescript/src/DateTimePicker";
import { MultiChange, RangeChange, SingleChange } from "react-native-ui-datepicker/lib/typescript/src/types";

type SingleParam = {
    date: DateType;
}

type RangeParam = {
    startDate: DateType;
    endDate: DateType;
}

type MultipleParam = {
    dates: DateType[];
}

type ParamsType = SingleParam | RangeParam | MultipleParam;


type PropsType = ModalProps & {
    modalProps?: ModalProps,
    datePickerProps: {
        params: ParamsType;
    } & (DatePickerSingleProps | DatePickerRangeProps | DatePickeMultipleProps),
    onSubmit: (data: any) => void,
    cancel: () => void,
};

export type Range = {
    startDate: DateType;
    endDate: DateType;
}

export type Single = {
    date: DateType;
}

const DatePickerModal: React.FC<PropsType> = ({ datePickerProps: { params, ...datePickerProps }, modalProps, ...props }) => {

    const [data, setData] = useState<ParamsType | undefined>(undefined)

    const { mode } = datePickerProps;

    const onChange = useCallback(
        (params: any) => {
            if (mode === 'single') {
                setData({ date: params.date });
            } else if (mode === 'range') {
                setData({ startDate: params.startDate, endDate: params.endDate });
            } else if (mode === 'multiple') {
                setData(params.dates);
            }
        },
        [mode]
    );

    const onSubmit = () => {
        props.onSubmit(data);
    }

    useEffect(() => {
        setData(params);
    }, [params])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            {...modalProps}
        >
            <Pressable style={styles.modalOverlay} onPress={props.cancel} >
                <View style={styles.modalContent}>
                    <DateTimePicker
                        onChange={onChange}
                        {...datePickerProps}
                        selectedTextStyle={{
                            fontWeight: 'bold',
                        }}
                        {...data}

                    />
                    <TouchableOpacity disabled={!data} style={styles.button} onPress={onSubmit}>
                        <Text style={styles.buttonText}>Встановити дату</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#9575CD', // Використовуємо вашу фіолетову кольорову гаму
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
    },
    // Додати інші необхідні стилі
});

export default DatePickerModal;
