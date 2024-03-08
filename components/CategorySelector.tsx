import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CategoryHelper } from '../helper/category';
import Button from './Button';


const { width } = Dimensions.get('window'); // Отримуємо ширину екрану

type CategorySelectorProps = {
    type: "income" | "expense";
    value: string; // Вибрана категорія
    onSelectCategory: (category: string) => void;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ type, value, onSelectCategory }) => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (!value) {
            setModalVisible(false);
        }
    }, [value]);

    const categories = CategoryHelper.getAllByType(type);

    useEffect(() => {
        onSelectCategory(categories[0].description)
    }, [])
    return (
        <View>
            <Button containerStyle={{
                flexDirection: 'row',
                columnGap: 10,

            }}
                onPress={() => setModalVisible(true)}
            >
                <View style={{
                    backgroundColor: "#522da86f",
                    flexDirection: 'row',
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    aspectRatio: 1,
                    borderRadius: 20
                }}>
                    <MaterialIcons name='shopping-cart' color={'white'} size={25} />

                </View>
                <View>
                    <Text style={{ color: '#8307f7', fontSize: 13 }}>
                        Категорія
                    </Text>
                    <Text style={{ color: "#512DA8", fontSize: 15 }}>
                        {value}
                    </Text>
                </View>
            </Button>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)} >
                    <FlatList
                    scrollEnabled
                        data={categories}
                        contentContainerStyle={styles.modalView}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                
                                style={styles.categoryItem}
                                onPress={() => {
                                    onSelectCategory(item.description);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.categoryItemText}>{item.description}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => JSON.stringify(item)}
                        numColumns={3}
                    />
                </Pressable>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: width * 0.9, // Ширина майже на весь екран
        aspectRatio: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
    },
    categoryItem: {

    },
    categoryItemText: {
        color: '#512DA8',
    },

});

// export default CategorySelector;
// import React from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import Button from './Button';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// type CategorySelectorProps = {
//   categories: string[];
//   value: string;
//   onSelectCategory: (category: string) => void;
// };

// const Header = () => (
//   <View style={styles.header}>
//     <Text style={styles.headerText}>Категорія</Text>
//   </View>
// );

// const RenderItem = ({ item, onSelectCategory }: { item: string; onSelectCategory: (category: string) => void; }) => {
//   // Функція для скорочення тексту категорії, якщо вона перевищує 8 символів
//   const truncateString = (str: string, num: number) => {
//     return str.length > num ? `${str.slice(0, num)}...` : str;
//   };

//   return (
//     <View style={styles.categoryItem}>
//       <Button
//         containerStyle={styles.categoryItemButton}
//         onPress={() => onSelectCategory(item)}
//       >
//         <MaterialIcons name="circle" size={30} color="#512DA8" />
//       </Button>
//       <Text style={styles.categoryItemText}>{truncateString(item, 8)}</Text>
//     </View>
//   );
// };

// const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, value, onSelectCategory }) => {
//   return (
//     <FlatList
//       contentContainerStyle={styles.modalView}
//       ListHeaderComponent={<Header />}
//       data={categories}
//       renderItem={({ item }) => <RenderItem item={item} onSelectCategory={onSelectCategory} />}
//       keyExtractor={(item) => item}
//       numColumns={4}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   modalView: {
//     padding: 10,
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//   },
//   header: {
//     paddingBottom: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#EDE7F6',
//   },
//   headerText: {
//     color: '#512DA8',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   categoryItem: {
//     flex: 1,
//     margin: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   categoryItemButton: {
//     padding: 10,
//     borderRadius: 20,
//     backgroundColor: '#E1BEE7',
//   },
//   categoryItemText: {
//     color: '#512DA8',
//     fontSize: 14,
//     marginTop: 5,
//     textAlign: 'center',
//   },
// });

export default CategorySelector;