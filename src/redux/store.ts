import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage' // localStorage

import userReducer from './userSlice'

const persistedUser = persistReducer({
  key: 'user',
  storage
}, userReducer)

export const store = configureStore({
  reducer: {
    user: persistedUser,
  },
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch