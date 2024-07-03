import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user.reducer'
import loaderReducer from './loader.reducer'

export const store = configureStore({
    reducer:{
        user:userReducer,
        loader:loaderReducer
    }
})