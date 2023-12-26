import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios, { AxiosError } from 'axios'

const baseUrl = 'http://localhost:5050/orders'

export const fetchUserOrders = createAsyncThunk('orders/fetchUserOrders', async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data.payload
  } catch (error: AxiosError | any) {
    return error.response.data.msg
  }
})

export interface IOrderProduct {
  product: string
  quantity: number
}

export interface IOrderPayment {}

export type OrderType = {
  _id: string
  products: IOrderProduct[]
  payment: IOrderPayment
  user: string
  status: string
  createdAt: string
}

type OrdersState = {
  ordersList: OrderType[]
  isLoading: boolean
  error: null | string
}

const initialState: OrdersState = {
  ordersList: [],
  isLoading: false,
  error: null
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    deleteAllUserOrders: (state, action) => {
      const newOrdersList = state.ordersList.filter((order) => order.user !== action.payload)
      state.ordersList = newOrdersList
    },
    deleteSingleUserOrder: (state, action) => {
      const newOrdersList = state.ordersList.filter((order) => order._id !== action.payload)
      state.ordersList = newOrdersList
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      console.log('fetchUserOrders:', action.payload)
      state.ordersList = action.payload
    })
    // pending
    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true
        state.error = null
      }
    )
    // rejected
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'An error occured'
      }
    )
  }
})

export const { deleteAllUserOrders, deleteSingleUserOrder } = ordersSlice.actions
export default ordersSlice.reducer
