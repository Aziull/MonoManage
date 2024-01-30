import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Transactions from './Transactions';
import DeletedTransactions from './DeletedTransactions';

const { Navigator, Screen } = createBottomTabNavigator();

// Опції для екранів
const screenOptions = (iconName) => ({
    tabBarIcon: ({ color, size }) => (
        <Icon name={iconName} size={size} color={color} />
    ),
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarLabel: () => null,
    tabBarActiveTintColor: '#A45A52',
    tabBarInactiveTintColor: 'silver',
    tabBarStyle: {
        backgroundColor: '#162836',
        borderTopWidth: 0,
        borderTopColor: "#276e72"
    },
});

const Home = () => {
    return (
        <Navigator initialRouteName="Transactions">
            <Screen
                name="Transactions"
                component={Transactions}
                options={screenOptions('check')}
            />
            <Screen
                name="DeletedTransactions"
                component={DeletedTransactions}
                options={screenOptions('delete')}
            />
        </Navigator>
    );
};

export default Home;
