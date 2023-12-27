import { createSlice } from '@reduxjs/toolkit'

import { ProductType } from '../products/productSlice'

export type NewCartItemType = {
  product: Partial<ProductType>
  quantity: number
}

type CartState = {
  cartItems: NewCartItemType[]
  isCheckout: boolean
  newOrderObject: Object
}

const cartData =
  localStorage.getItem('cart') !== null ? JSON.parse(String(localStorage.getItem('cart'))) : []

const initialState: CartState = {
  cartItems: cartData,
  isCheckout: false,
  newOrderObject: {}
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
      const newCartItems = state.cartItems.filter((cartItem) => cartItem.product._id !== removeId)
      state.cartItems = newCartItems
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    resetCart: (state) => {
      state.cartItems = []
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    closeCheckout: (state) => {
      state.isCheckout = false
    },
    openCheckout: (state) => {
      state.isCheckout = true
    },
    updateCartItem(state, action) {
      const { id, quantity } = action.payload
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.product._id === id) {
          return {
            ...item,
            quantity
          }
        }
        return item
      })

      state.cartItems = updatedCartItems

      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    }
  }
})

export const { addToCart, deleteFromCart, resetCart, updateCartItem, closeCheckout, openCheckout } =
  cartSlice.actions
export default cartSlice.reducer
