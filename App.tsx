import React, { Suspense } from 'react';
import 'react-native-gesture-handler';

import { Button, StyleSheet } from 'react-native';

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
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://f2f5e303eae0973649dfc90031fc3fad@o4506644392968192.ingest.us.sentry.io/4507871632162816',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
});

const App = () => {

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

export default Sentry.wrap(App);