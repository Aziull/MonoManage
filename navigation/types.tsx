import { StackNavigationProp } from '@react-navigation/stack';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { Transaction } from '../features/transaction/types';

type TransactionScreenType = {
    deleted: boolean
}

export type BottomTabParamList = {
    Transactions: TransactionScreenType;
    DeletedTransactions: TransactionScreenType;
    Settings: undefined;
};

export type RootStackParamList = {
    SignIn: undefined;
    WebScreen: { url: string };
    Home: NavigatorScreenParams<BottomTabParamList>;
    NewTransaction: { type: TransactionType, transaction?: Transaction};
    PrivacyPolicyScreen: undefined
};

export type SignInProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignIn'>;
};

export type WebScreenProps = {
    route: RouteProp<RootStackParamList, 'WebScreen'>
};

export type TransactionType = 'income' | 'expense';

export type TransactionFormProps = {
    navigation: StackNavigationProp<RootStackParamList, 'NewTransaction'>;
    route: RouteProp<RootStackParamList, 'NewTransaction'>;
};

export type HomeProps = {};

export type TransactionsScreenProps = {
    route: RouteProp<BottomTabParamList, 'Transactions'>;
};

export type DeletedTransactionsScreenProps = {
    route: RouteProp<BottomTabParamList, 'DeletedTransactions'>;
};

export type NewTransactionNavigationProp = StackNavigationProp<RootStackParamList, 'NewTransaction'>;

