import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import { appSlice, authSlice } from "./slices"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

/**
 * Configuration object for persisting Redux state using redux-persist.
 * @type {Object}
 */
const persistConfig = {
    key: "nitprofile",
    version: 1,
    storage,
    whitelist: ["appSlice", "authSlice"],
}

/**
 * Root reducer combining multiple slice reducers.
 * @type {Function}
 */
const rootReducer = combineReducers({
    appSlice: appSlice.reducer,
    authSlice: authSlice.reducer,
})

/**
 * Persisted reducer using redux-persist to persist specific slices of the Redux state.
 * @type {Function}
 */
const persistedReducer = persistReducer(persistConfig, rootReducer)

/**
 * Redux store configuration.
 * @type {Object}
 */
export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ["persist/PERSIST"],
                // Ignore these field paths in all actions
                ignoredActionPaths: ["meta.arg", "payload.timestamp"],
                // Ignore these paths in the state
                ignoredPaths: ["items.dates"],
            },
        }),
})

/**
 * Redux store persistor for persisting state across sessions.
 * @type {Object}
 */
export const persistor = persistStore(store)

/**
 * Type representing the root state of the Redux store.
 * @type {Object}
 */
export type RootState = ReturnType<typeof store.getState>

/**
 * Type representing the dispatch function in the Redux store.
 * @type {Function}
 */
export type AppDispatch = typeof store.dispatch

/**
 * Custom hook providing typed access to the Redux store dispatch function.
 * @function
 * @name useAppDispatch
 * @returns {AppDispatch} - The Redux store dispatch function.
 */
export const useAppDispatch: () => AppDispatch = useDispatch

/**
 * Typed selector hook for accessing the Redux store state.
 * @function
 * @name useAppSelector
 * @param {Function} selector - A selector function to extract specific parts of the state.
 * @returns {TypedUseSelectorHook<RootState>} - The Redux store selector hook.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
