import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await api.get('public/mock/e-commerce/users.json')
  return response.data
})

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

export type UsersState = {
  usersList: User[]
  isLoading: boolean
  error: null | string
}

const initialState: UsersState = {
  usersList: [],
  isLoading: false,
  error: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.usersList = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      ;(state.isLoading = false),
        (state.error = action.error.message || 'Fetching users data ended unsuccessfully')
    })
  }
})

export default usersSlice.reducer
