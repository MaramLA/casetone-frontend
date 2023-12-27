import { createSlice } from '@reduxjs/toolkit'

import { ProductType } from '../products/productSlice'

export type NewCartItemType = {
  product: Partial<ProductType>
  quantity: number
}

const cartData =
  localStorage.getItem('cart') !== null ? JSON.parse(String(localStorage.getItem('cart'))) : []

type CartState = {
  cartItems: NewCartItemType[]
  isCheckout: boolean
  newOrderObject: Object
}

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
      // const foundProduct = state.cartItems.find((item) => {
      //   if (item._id === productData._id) {
      //     return item
      //   }
      // })
      // console.log('foundProduct')
      // if (foundProduct) {
      //   warningResponse('Product add to the cart already')
      //   return
      // }
      // const newProductData = { ...productData, quantity: 1 }
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

      // Update state with the modified cartItems
      state.cartItems = updatedCartItems

      // Save the updated cartItems to local storage
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    }
  }
})

export const { addToCart, deleteFromCart, resetCart, updateCartItem, closeCheckout, openCheckout } =
  cartSlice.actions
export default cartSlice.reducer
