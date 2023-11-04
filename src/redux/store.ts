import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './slices/Orders/cartSlice'
import usersReducer from './slices/Users/userSlice'
import ordersReducer from './slices/Orders/ordersSlice'
import productReducer from './slices/products/productSlice'
import categoriesReducer from './slices/Categories/categoriesSlice'

export const store = configureStore({
  reducer: {
    cartReducer: cartReducer,
    usersReducer: usersReducer,
    ordersReducer: ordersReducer,
    productsReducer: productReducer,
    categoriesReducer: categoriesReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
