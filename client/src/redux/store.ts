import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
import { postsApi } from '../api/posts/postsApi';
import { categoriesApi } from '../api/categories/categoriesApi';
import { authApi } from '../api/auth/authApi';
import authSlice from './slices/authSlice';
import { profilesApi } from '../api/profilesApi/profilesApi';

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [profilesApi.reducerPath]: profilesApi.reducer,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(postsApi.middleware)
        .concat(categoriesApi.middleware)
        .concat(authApi.middleware)
        .concat(profilesApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;