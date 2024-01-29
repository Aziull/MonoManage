import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import WebScreen from '../screens/WebScreen';
import Home from '../screens/Home';
import NewTransaction from '../screens/NewTransaction';
import { useAuthContext } from '../context/AuthContext';
import { Text, View } from 'react-native';

const { Navigator, Screen } = createStackNavigator();


const AppNavigator = () => {
    const { isAuth, isLoading } = useAuthContext();

    if (isLoading) {
        return <View><Text>Loading...</Text></View>;
    }

    return (
        <Navigator>
            {!isAuth ? (
                <>
                    <Screen component={SignIn} name="SignIn" options={{ headerShown: false }} />
                    <Screen name="WebScreen" component={WebScreen} options={{ headerShown: false }} />
                </>
            ) : (
                <>
                    <Screen component={Home} name="Home" options={{ headerShown: false }} />
                    <Screen component={NewTransaction} name="NewTransaction" options={{ title: "Створення запису" }} />
                </>
            )}
        </Navigator>
    );
};

export default AppNavigator;