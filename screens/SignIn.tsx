
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Layout from "../components/Layout"
import Button from "../components/Button";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { createUser } from "../features/user/userSlice";
import { getUserAsync } from "../features/user/thunks";
import { StackNavigationProp } from "@react-navigation/stack";
import { SignInProps } from "../navigation/types";


const SignIn: React.FC<SignInProps> = ({ navigation }) => {
    const dispatch: AppDispatch = useDispatch();
    const handleLoginWithoutBank = () => {
        dispatch(getUserAsync())
    };

    const handleLoginWithMonobank = () => {
        navigation.navigate('WebScreen', { url: 'https://api.monobank.ua/' });
    };

    return (
        <Layout style={styles.container}>
            <Text style={styles.title}>Виберіть спосіб входу</Text>
            <Pressable style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? '#512DA8' : '#7e47ff' },
                styles.shadow
            ]}
                onPress={handleLoginWithoutBank}>
                <Text style={styles.buttonText}>Увійти без банку</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? '#512DA8' : '#7e47ff' },
                styles.shadow
            ]}
                onPress={handleLoginWithMonobank}>
                <Text style={styles.buttonText}>Увійти з Monobank</Text>
            </Pressable>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        color: '#673AB7',
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default SignIn

