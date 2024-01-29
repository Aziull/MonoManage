import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import Layout from "../components/Layout"
const SignIn = ({ navigation }) => {

    const handlePress = () => {
        // Викликаємо функцію навігації для переходу за вказаною адресою
        navigation.navigate('WebScreen', { url: 'https://api.monobank.ua/' });
    };
    

    return <Layout style={s.container}>
        <View>
            <Pressable
                style={({ pressed }) => [
                    s.pressableContainer,
                    pressed ? s.pressablePressed : null,
                ]}
                onPress={handlePress}
            >
                <Image
                
                    style={s.image}
                    borderRadius={40}

                    source={require('../assets/mono.jpg')} />
            </Pressable>
        </View>

    </Layout>
}

export default SignIn

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressableContainer: {
        width: '50%',
        aspectRatio: 1 / 1,

    },
    pressablePressed: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    image: {
        width: '100%',
        height: '100%',
        zIndex:1000
    },
})