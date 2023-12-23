import { createSlice } from '@reduxjs/toolkit'

import { ProductType } from '../products/productSlice'

const cartData =
  localStorage.getItem('cart') !== null ? JSON.parse(String(localStorage.getItem('cart'))) : []

type CartState = {
  cartItems: ProductType[]
}

const initialState: CartState = {
  cartItems: cartData
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productData = action.payload
      state.cartItems.push(productData)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    deleteFromCart: (state, action) => {
      const removeId = action.payload
      const newCartItems = state.cartItems.filter((cartItem) => cartItem._id !== removeId)
      state.cartItems = newCartItems
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    resetCart: (state) => {
      state.cartItems = []
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    }
  }
})

export const { addToCart, deleteFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer
