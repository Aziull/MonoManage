import React from 'react';
import { ActivityIndicator, Alert, Image, Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/button/Button';
import Layout from '../components/Layout';
import { getUserAsync } from '../features/user/thunks';
import { SignInProps } from '../navigation/types';
import { AppDispatch, RootState } from '../store';
const SignIn: React.FC<SignInProps> = ({ navigation }) => {
    const dispatch: AppDispatch = useDispatch();
    const { error, loading } = useSelector((state: RootState) => state.auth);

    const handleLoginWithoutBank = async () => {
        dispatch(getUserAsync());
    };

    const openStore = () => {
        const appStoreUrl = Platform.OS === 'ios'
            ? 'https://apps.apple.com/ua/app/monobank/id1271828964'
            : 'market://details?id=ua.com.monobank';

        Linking.openURL(appStoreUrl).catch((err) => {
            console.error('Error opening app store', err);
            Alert.alert('Помилка', 'Не вдалося відкрити магазин додатків.');
        });
    }
    const checkMonobankInstalled = async () => {
        try {
            if (Platform.OS === 'ios') {
                return await Linking.canOpenURL('mono://');
            } else {
                return await Linking.canOpenURL('app://com.ftband.mono/');
            }
        } catch (error) {
            console.error('Error checking Monobank installation', error);
            return false;
        }
    }

    const handleLoginWithMonobank = async () => {
        const monobankInstalled = await checkMonobankInstalled();
        if (monobankInstalled) {
            navigation.navigate('WebScreen', { url: 'https://api.monobank.ua/' });
        } else {
            Alert.alert(
                'Монобанк не встановлений',
                'Ви хочете завантажити додаток з магазину?',
                [
                    { text: 'Відмінити', style: 'cancel' },
                    { text: 'Завантажити', onPress: openStore },
                ]
            );
        }

    };

    if (error) {
        Alert.alert("Error", "Failed to login.");
    }
    return (
        <Layout style={styles.container}>
            <Image source={require('../assets/logo.png')} resizeMode='contain' style={styles.logo} />
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
                        shape="roundedFull"
                        style={styles.shadow}
                        icon={{
                            name: "credit-card",
                            size: 20,
                            color: '#fff'
                        }}
                    >
                        Увійти з Monobank
                    </Button>
                    <Button
                        shape="roundedFull"
                        onPress={handleLoginWithoutBank}
                        variant='secondary'
                        width='full'
                        style={styles.shadow}
                        icon={{
                            name: 'user',
                            size: 20,
                            color: "#5818bf"
                        }}
                        textStyle={{
                            color: "#5818bf"
                        }}

                    >
                        Увійти без банку
                    </Button>

                    <Button
                        variant='link'
                        onPress={() => { navigation.navigate("PrivacyPolicyScreen") }}
                        style={{
                            alignSelf: 'flex-end'
                        }}
                    >
                        Політика конфіденційності
                    </Button>
                </View>
            )
            }

        </Layout >
    );
};

const styles = StyleSheet.create({
    container: {
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