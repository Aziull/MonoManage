import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Отримуємо ширину екрану

type CategorySelectorProps = {
    categories: string[];
    value: string; // Вибрана категорія
    onSelectCategory: (category: string) => void;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, value, onSelectCategory }) => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (!value) {
            setModalVisible(false);
        }
    }, [value]);

    return (
        <View>
            <TouchableOpacity style={styles.categorySelector} onPress={() => setModalVisible(true)}>
                <Text style={styles.categorySelectorText}>{value || 'Виберіть категорію'}</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        <FlatList
                            data={categories}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.categoryItem}
                                    onPress={() => {
                                        onSelectCategory(item);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.categoryItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item}
                            numColumns={3}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    categorySelector: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#9575CD',
        borderRadius: 5,
        backgroundColor: '#EDE7F6',
    },
    categorySelectorText: {
        color: '#512DA8',
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: width * 0.9, // Ширина майже на весь екран
        height: width * 0.9, // Висота у співвідношенні 1:1
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
    categoryItem: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: '#9575CD',
        borderRadius: 5,
        backgroundColor: '#EDE7F6',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, // Забезпечує, що всі елементи мають однакову ширину
        minHeight: 50, // Мінімальна висота для кожного елемента сітки
    },
    categoryItemText: {
        color: '#512DA8',
        textAlign: 'center',
    },

});

export default CategorySelector;
