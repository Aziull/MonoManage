// types.tsx
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

// Тип параметрів для BottomTabNavigator
export type BottomTabParamList = {
    Transactions: undefined;
    DeletedTransactions: undefined;
    Settings: undefined;
};

// Тип параметрів для RootStackNavigator
export type RootStackParamList = {
    SignIn: undefined;
    WebScreen: { url: string };
    Home: NavigatorScreenParams<BottomTabParamList>;
    NewTransaction: { type: TransactionType };
};

// SignIn компонент з navigation
export type SignInProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignIn'>;
};

// WebScreen компонент з route
export type WebScreenProps = {
    route: RouteProp<RootStackParamList, 'WebScreen'>
};

// TransactionForm компонент з navigation і route
export type TransactionType = 'income' | 'expense';

export type TransactionFormProps = {
    navigation: StackNavigationProp<RootStackParamList, 'NewTransaction'>;
    route: RouteProp<RootStackParamList, 'NewTransaction'>;
};

// Home компонент без параметрів
export type HomeProps = {};
