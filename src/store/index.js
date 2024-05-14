import { configureStore, combineReducers } from "@reduxjs/toolkit";
// combineReducer - объеденяет reducers 
import userReducer from './userSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    user : userReducer
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer) // передается config, и наши reducers

const store = configureStore({
    reducer: persistedReducer, // передается персистированный reducers, в данный момент persistReducer содержит все наши reducer, но у нас он пока один
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store) // сюда в persistStore мы передаем наш стор чтобы наше приложение могло работать с persist
export default store

// здесь создается хранилище, данное хранилище состоит из reducer - это объект, и мы говорим у нас есть вот такой вот
// reducer и она выполняет вот такую вот операцию, reducers в redux toolkit называют slices, для этого создаем файл TodoSlice