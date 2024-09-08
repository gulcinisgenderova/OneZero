import { configureStore } from '@reduxjs/toolkit';
import productsReducer, { productsFetch } from '../features/productSlice';
import { productsApi } from '../features/productsApi';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware), 
});

store.dispatch(productsFetch());
