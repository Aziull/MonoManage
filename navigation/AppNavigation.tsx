import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import WebScreen from '../screens/WebScreen';
import Home from '../screens/Home';
import {  Text, View } from 'react-native';
import TransactionForm from '../screens/TransactionForm/TransactionForm';
import { useSelector } from 'react-redux';
import {  RootState } from '../store';
import { RootStackParamList } from './types';
import Loader from '../components/Loader';

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();


const AppNavigator = () => {
    const { user, loading } = useSelector((state: RootState) => state.auth);

    if (loading) {
        return <Loader text={"Виконується вхід"} />
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
                    <Screen component={TransactionForm} name="NewTransaction" options={({ route }) => ({
                        headerShown: false
                    })} />
                </>
            )}
        </Navigator>
    );
};

export default AppNavigator;