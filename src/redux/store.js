import { configureStore } from '@reduxjs/toolkit';
import user from './userReducer';
import { apiSlice } from '../api/apiSlice'

export default configureStore({
    reducer: {
        user,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});