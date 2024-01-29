import dayjs, { Dayjs } from "dayjs"
import React from "react"
import { Modal, ModalProps, View, StyleSheet } from "react-native"
import DateTimePicker from 'react-native-ui-datepicker';
import Button from "../components/Button";
import 'dayjs/locale/uk';
type PropsType = ModalProps & {
    value: Dayjs
    onValueChange: (date: string | number | dayjs.Dayjs | Date) => void,
    locale: string,
    onSubmit: () => void
}
const DataPickerModal = (props: PropsType) => {
    return <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        {...props}
    >
        <View style={s.centeredView}>
            <View style={s.modalView}>


                <DateTimePicker
                    maximumDate={dayjs()}
                    value={props.value}
                    locale={props.locale}
                    onValueChange={props.onValueChange}
                />
                <Button onPress={props.onSubmit}>
                    Встановити дату
                </Button>
            </View>
        </View>
    </Modal>
}

const s = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})

export default DataPickerModal