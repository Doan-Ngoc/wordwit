import { configureStore } from "@reduxjs/toolkit";
import boardReducer from './boardSlice'
import snackbarReducer from './snackbarSlice'

export const store = configureStore({
    reducer:{
        board: boardReducer,
        snackbar: snackbarReducer
    }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>