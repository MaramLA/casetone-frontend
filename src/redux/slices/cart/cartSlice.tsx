import { createSlice } from '@reduxjs/toolkit'
import { ProductType } from '../products/productSlice'

type CartState = {
  cartItems: ProductType[]
}

const initialState: CartState = {
  cartItems: []
}

// const cartSlice = createSlice({
//   name: 'cart'
//   initialState
// })
