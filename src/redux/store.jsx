import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  REGISTER,
  PAUSE,
  PURGE,
  PERSIST,
} from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage for React Native
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "./slice";

// Persist config using AsyncStorage
const persistConfig = {
  key: "root",
  storage: AsyncStorage, // Use AsyncStorage instead of sessionStorage
  stateReconciler: autoMergeLevel2,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PURGE, PERSIST],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

// Persistor for persisting the store
export const Persistor = persistStore(store);

export default store;
