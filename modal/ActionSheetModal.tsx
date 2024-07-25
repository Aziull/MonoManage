import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Dimensions } from "react-native";

const { width } = Dimensions.get('window'); // Отримання ширини екрану

const ActionSheetModal = ({ transaction, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={styles.modalContent}>
                            {/* Відображення інформації про транзакцію */}
                            <View style={styles.transactionView}>
                                <Text style={styles.transactionText}>Опис: {transaction.description}</Text>
                                <Text style={styles.transactionText}>Сума: {transaction.amount}</Text>
                                {/* ... інші деталі */}
                            </View>

                            {/* Відступ між блоками */}
                            <View style={styles.separator} />

                            {/* Вікно з опціями дій */}
                            <View style={styles.actionSheetView}>
                                <TouchableOpacity style={styles.button} onPress={() => { /* дія редагування */ }}>
                                    <Text style={styles.buttonText}>Редагувати</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => { /* дія видалення */ }}>
                                    <Text style={styles.buttonText}>Видалити</Text>
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity style={styles.button} onPress={onClose}>
                                <Text style={styles.buttonText}>Скасувати</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        width: width * 0.95, // Ширина 90% від екрану
        alignSelf: 'center', // Центрування блоку
        backgroundColor: 'white', // Колір фону
        borderRadius: 10, // Закруглення кутів
        overflow: 'hidden', // Щоб закруглення були видимі
    },
    transactionView: {
        padding: 20, // Відступ всередині блоку
        backgroundColor: '#f9f9f9', // Світліший колір для блоку з інформацією
    },
    actionSheetView: {
        paddingVertical: 20, // Вертикальний відступ всередині блоку
    },
    button: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#2196F3', // Колір фону кнопок
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white', // Колір тексту кнопок
        fontWeight: 'bold',
    },
    transactionText: {
        color: '#333', // Колір тексту інформації про транзакцію
        fontSize: 16,
        marginVertical: 2,
    },
    separator: {
        height: 10, // Висота відступу між блоками
    },
});

export default ActionSheetModal;