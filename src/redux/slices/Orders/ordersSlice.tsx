import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios, { AxiosError } from 'axios'

const baseUrl = 'http://localhost:5050/orders'

// fetch orders for a specific user
export const fetchUserOrders = createAsyncThunk('orders/fetchUserOrders', async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data.payload
  } catch (error: AxiosError | any) {
    return error.response.data.msg
  }
})
// fetch all orders for admin
export const fetchOrdersForAdmin = createAsyncThunk('orders/fetchOrdersForAdmin', async () => {
  try {
    const response = await axios.get(`${baseUrl}/all-orders`)
    return response.data.payload
  } catch (error: AxiosError | any) {
    return error.response.data.msg
  }
})

// delete single user order
export const deleteSingleUserOrder = createAsyncThunk(
  'orders/deleteSingleUserOrder',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/${id}`)
      return id
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

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
    }
    // deleteSingleUserOrder: (state, action) => {
    //   const newOrdersList = state.ordersList.filter((order) => order._id !== action.payload)
    //   state.ordersList = newOrdersList
    // }
  },
  extraReducers(builder) {
    // fetch orders for a specific user
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      console.log('fetchUserOrders:', action.payload)
      state.ordersList = action.payload
    })
    // fetch all orders for admin
    builder.addCase(fetchOrdersForAdmin.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      console.log('fetchOrdersForAdmin:', action.payload)
      state.ordersList = action.payload
    })
    // delete single user order
    builder.addCase(deleteSingleUserOrder.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      const newOrdersList = state.ordersList.filter((order) => order._id !== action.payload)
      state.ordersList = newOrdersList
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

export const { deleteAllUserOrders } = ordersSlice.actions
export default ordersSlice.reducer
