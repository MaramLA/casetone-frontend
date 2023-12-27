import { configureStore } from '@reduxjs/toolkit'

import categoriesReducer from './slices/Categories/categoriesSlice'
import cartReducer from './slices/Orders/cartSlice'
import ordersReducer from './slices/Orders/ordersSlice'
import usersReducer from './slices/Users/userSlice'
import productReducer from './slices/products/productSlice'

export const store = configureStore({
  reducer: {
    cartReducer: cartReducer,
    usersReducer: usersReducer,
    ordersReducer: ordersReducer,
    productsReducer: productReducer,
    categoriesReducer: categoriesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
