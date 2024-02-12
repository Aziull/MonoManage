import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Transactions from './Transactions';
import DeletedTransactions from './DeletedTransactions';
import { BottomTabParamList, HomeProps } from '../navigation/types';
import Layout from '../components/Layout';
import { Text } from 'react-native';


const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

// Опції для екранів
const screenOptions = (iconName: string): BottomTabNavigationOptions => ({
    tabBarIcon: ({ color, size }: { color: string, size: number }) => (
        <Icon name={iconName} size={size} color={color} />
    ),
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarLabel: () => null,
    tabBarActiveTintColor: '#A45A52',
    tabBarInactiveTintColor: 'silver',
    tabBarStyle: {
        backgroundColor: '#9575CD',
        borderTopWidth: 0,

    },
});

const Home: React.FC<HomeProps> = () => {
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
