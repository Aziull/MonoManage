import 'react-native-gesture-handler';
import React, { Suspense } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import AppNavigator from './navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { RenamedProvider } from './context/RenamedContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { CustomLightTheme } from './theme';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDbIfNeeded } from './db';
import Loader from './components/Loader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  return (
    <Suspense fallback={<Loader text={"Завантаження"} />}>
      <SQLiteProvider databaseName="appDatabase.db" onInit={migrateDbIfNeeded} useSuspense>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer theme={CustomLightTheme}>
              <GestureHandlerRootView style={{ flex: 1, }}>
                  <AppNavigator />
              </GestureHandlerRootView>
            </NavigationContainer >
          </PersistGate>
        </Provider>
      </SQLiteProvider>
    </Suspense>

  );
}

const styles = StyleSheet.create({});
