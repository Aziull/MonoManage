import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import WebScreen from '../screens/WebScreen';
import Home from '../screens/Home';
import { Text, View } from 'react-native';
import TransactionForm from '../screens/TransactionForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { NavigatorScreenParams } from '@react-navigation/native';
import { RootStackParamList } from './types';

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();


const AppNavigator = () => {
    const { user, isLoading } = useSelector((state: RootState) => state.auth);

    if (isLoading) {
        return <View><Text>Loading...</Text></View>;
    }
    return (
        <Navigator>
            {!user ? (
                <>
                    <Screen component={SignIn} name="SignIn" options={{ headerShown: false }} />
                    <Screen name="WebScreen" component={WebScreen} options={{ headerShown: false }} />
                </>
            ) : (
                <>
                    <Screen component={Home} name="Home" options={{ headerShown: false }} />
                    <Screen component={TransactionForm} name="NewTransaction" options={{ title: "Створення запису", }} />
                </>
            )}
        </Navigator>
    );
};

export default AppNavigator;