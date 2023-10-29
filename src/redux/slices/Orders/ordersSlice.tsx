import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await api.get('/mock/e-commerce/orders.json')
  return response.data
})

export type OrderType = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}

export type OrdersState = {
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
      return {
        ...state,
        ordersList: state.ordersList.filter((order) => order.userId !== action.payload)
      }
    },
    deleteSingleUserOrder: (state, action) => {
      //not working
      return {
        ...state,
        ordersList: state.ordersList.filter((order) => order.id !== action.payload)
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false
      state.ordersList = action.payload
    })
    builder.addCase(fetchOrders.rejected, (state, action) => {
      ;(state.isLoading = false),
        (state.error = action.error.message || 'Fetching orders data ended unsuccessfully')
    })
  }
})

export const { deleteAllUserOrders, deleteSingleUserOrder } = ordersSlice.actions
export default ordersSlice.reducer
