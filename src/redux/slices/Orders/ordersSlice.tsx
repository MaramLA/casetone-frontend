import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await api.get('/mock/e-commerce/orders.json')
  return response.data
})

export type OrderType = {
  id: string
  productId: string
  userId: string
  purchasedAt: string
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
      const newOrdersList = state.ordersList.filter((order) => order.userId !== action.payload)
      state.ordersList = newOrdersList
    },
    deleteSingleUserOrder: (state, action) => {
      const newOrdersList = state.ordersList.filter((order) => order.id !== action.payload)
      state.ordersList = newOrdersList
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
