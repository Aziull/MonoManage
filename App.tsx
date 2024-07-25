import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import { StyleSheet } from 'react-native';

import AppNavigator from './navigation/AppNavigation';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { RenamedProvider } from './context/RenamedContext';
import { ActionSheetProvider } from './provider/ActionSheetProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { initializeDatabase } from './services/database';
import { CustomLightTheme } from './theme';


export default function App() {
  useEffect(() => {
    (async () => {
      await initializeDatabase();
    })();
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={CustomLightTheme}>
          <ActionSheetProvider>
            <RenamedProvider>
              <AppNavigator />
            </RenamedProvider>
          </ActionSheetProvider>
        </NavigationContainer >
      </PersistGate>
    </Provider>

  );
}

const styles = StyleSheet.create({});
