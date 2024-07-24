import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import { getUserAsync } from '../features/user/thunks';
import { SignInProps } from '../navigation/types';
import { AppDispatch } from '../store';
import Button from '../components/button/Button';
const SignIn: React.FC<SignInProps> = ({ navigation }) => {
    const dispatch: AppDispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleLoginWithoutBank = async () => {
        setLoading(true);
        try {
            await dispatch(getUserAsync());
        } catch (error) {
            Alert.alert("Error", "Failed to login without bank.");
        } finally {
            setLoading(false);
        }
    };

    const handleLoginWithMonobank = () => {
        navigation.navigate('WebScreen', { url: 'https://api.monobank.ua/' });
    };
    return (
        <Layout style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Вхід</Text>
            <Text style={styles.subtitle}>Оберіть спосіб входу:</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#fff" />
            ) : (
                <View style={styles.actionsContainer}>
                    <Button
                        onPress={handleLoginWithMonobank}
                        width='full'
                        size='lg'
                        style={styles.shadow}
                        icon={<Icon name="credit-card" size={20} color="#fff" />}
                    >
                        Увійти з Monobank
                    </Button>
                    <Button
                        onPress={handleLoginWithoutBank}
                        variant='secondary'
                        width='full'
                        style={styles.shadow}
                        icon={<Icon name="user" size={20} color="#333" />}
                    >
                        Увійти без банку
                    </Button>
                </View>
            )}

        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    actionsContainer: {
        width: '100%',
        rowGap: 15,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        color: '#673AB7',
        fontSize: 32,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#999999',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
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

export default SignIn;