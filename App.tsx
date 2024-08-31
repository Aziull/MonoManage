import React, { Suspense } from 'react';
import 'react-native-gesture-handler';

import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { SQLiteProvider } from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/ui/Loader';
import { migrateDbIfNeeded } from './db';
import AppNavigator from './navigation/AppNavigation';
import { persistor, store } from './store';
import { CustomLightTheme } from './theme';

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