import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/ui/Loader';
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import TransactionForm from '../screens/TransactionForm/TransactionForm';
import WebScreen from '../screens/WebScreen';
import { RootState } from '../store';
import { RootStackParamList } from './types';

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
                    <Screen name="WebScreen" component={WebScreen} options={{ headerShown: true, headerTitle: "" }} />
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