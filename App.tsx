import 'react-native-gesture-handler';
import React from 'react';

import { StyleSheet } from 'react-native';

import { AuthProvider, useAuthContext } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { IgnoredTransactionsProvider } from './context/TransactionsContext';
import { RenamedProvider } from './context/RenamedContext';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://c92d0e494d983ee545c781cfbc2c89d1@o4506644392968192.ingest.sentry.io/4506644396179456',
});


export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <IgnoredTransactionsProvider>
          <RenamedProvider>
            <AppNavigator />
          </RenamedProvider>
        </IgnoredTransactionsProvider>
      </AuthProvider>
    </NavigationContainer >

  );
}

const styles = StyleSheet.create({});
