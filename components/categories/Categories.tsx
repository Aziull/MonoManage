import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import Button from "../Button"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const categories: { id: number, name: string }[] = [{ id: 1, name: "circle" }, { id: 2, name: "circle" }, { id: 3, name: "circle" },
{ id: 4, name: "circle" }, { id: 5, name: "circle" }, { id: 6, name: "circle" }, { id: 7, name: "circle" },
{ id: 8, name: "circle" }, { id: 9, name: "circle" }, { id: 10, name: "circle" }, { id: 11, name: "circle" },
{ id: 12, name: "circle" }, { id: 13, name: "circle" }, { id: 14, name: "circle" }, { id: 15, name: "circle" }]

const Categories = () => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name={'arrow-left'} size={30} style={styles.icon} />
            <FlatList
                horizontal
                data={categories}
                keyExtractor={item => JSON.stringify(item)}
                renderItem={({ item: { name } }) => (
                    <View style={{alignItems: "center"}}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                {
                                    backgroundColor: pressed ? '#6c757d' : '#343a40',
                                },
                            ]}
                            onPress={() => { }}
                        >
                            <MaterialIcons name={name} size={30} style={styles.icon} />
                        </Pressable>
                        <Text>Хз</Text>
                    </View>
                )}
            />
            <MaterialIcons name={'arrow-right'} size={30} style={styles.icon} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 10,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    icon: {
        color: 'white',
    },
})

export default Categories