import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CategoryHelper } from '../helper/category';
import BottomSheet from '../modal/BottomSheet';
import Search from './Search';
import Button from './button/Button';


const { width } = Dimensions.get('window'); // Отримуємо ширину екрану

type CategorySelectorProps = {
    type: "income" | "expense";
    value: string; // Вибрана категорія
    onSelectCategory: (category: string) => void;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ type, value, onSelectCategory }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [query, setQuery] = useState('');
    const { width } = useWindowDimensions()
    useEffect(() => {
        if (!value) {
            setModalVisible(false);
        }
    }, [value]);

    let categories = CategoryHelper.getAllByType(type);
    categories = categories.filter(el => el.description.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    useEffect(() => {
        onSelectCategory(categories[0].description)
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Button
            variant='ghost'
                containerStyle={{
                    flexDirection: 'row',
                    columnGap: 10,

                }}
                onPress={() => setModalVisible(true)}
                icon={{
                    name: 'shopping-cart',
                    size: 25,
                    color: 'white',
                    containerStyle: {
                        backgroundColor: "#522da86f",
                        flexDirection: 'row',
                        width: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        aspectRatio: 1,
                        borderRadius: 20
                    }
                }}
            >
                Категорія {'\n'}
                <Text style={{ color: "#512DA8", fontSize: 15 }}>
                    {value}
                </Text>
            </Button>

            <BottomSheet
                isVisible={modalVisible}
                onDismiss={() => setModalVisible(false)}
            >
                <View>
                    <FlatList
                        invertStickyHeaders
                        scrollEnabled
                        data={categories}

                        showsVerticalScrollIndicator
                        initialNumToRender={20}

                        style={{
                            height: 400,
                            backgroundColor: '#eee',
                            marginHorizontal: -16,
                        }}
                        contentContainerStyle={styles.modalView}
                        indicatorStyle='white'
                        renderItem={({ item }) => (
                            <Button
                                style={{
                                    padding: 0
                                }}
                                containerStyle={styles.categoryItem}
                                onPress={() => {
                                    onSelectCategory(item.description);
                                    setModalVisible(false);
                                }}
                            >
                                <View style={{
                                    backgroundColor: 'rgba(82, 45, 168, 1)',
                                    height: 70,
                                    aspectRatio: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    borderRadius: 15,
                                }}>
                                    <MaterialIcons name={'circle'} color={"#eee"} size={50} />
                                </View>
                                <Text numberOfLines={1} style={styles.categoryItemText}>{item.description}</Text>
                            </Button>
                        )}
                        keyExtractor={(item) => JSON.stringify(item)}
                        numColumns={3}
                    />
                </View>
                <View>
                    <Search
                        style={{
                        }}
                        value={query}
                        handleValueChange={(text) => setQuery(text)}
                    />
                </View>



            </BottomSheet>
        </View>
    );
};
const styles = StyleSheet.create({

    modalView: {
        alignItems: 'center',
        marginHorizontal: -16
    },
    categoryItem: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 2,
        width: width * 0.315,
        height: width * 0.315,
        padding: 0,
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