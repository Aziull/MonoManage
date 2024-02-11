import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, createTransform, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { expoSecureStoreAdapter } from '../utils/expoSecureStoreAdapter';

import rootReducer from './rootReducer';
import { baseApi } from '../features/api';

const persistConfig = {
  key: 'root',
  storage: expoSecureStoreAdapter,
  whitelist: ['authToken'], // Вказуємо, що зберігати лише auth редюсер
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });

  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
