import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await api.get('/mock/e-commerce/users.json')
  return response.data
})

export type UserType = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

export type UsersState = {
  usersList: UserType[]
  isLoading: boolean
  error: null | string
  isSignedIn: boolean
  userData: null | UserType
}

const signInData =
  localStorage.getItem('signInData') !== null
    ? JSON.parse(String(localStorage.getItem('signInData')))
    : []

const initialState: UsersState = {
  usersList: [],
  isLoading: false,
  error: null,
  isSignedIn: signInData.isSignedIn,
  userData: signInData.userData
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isSignedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'signInData',
        JSON.stringify({ isSignedIn: state.isSignedIn, userData: state.userData })
      )
    },
    signOut: (state) => {
      state.isSignedIn = false
      state.userData = null
      localStorage.setItem(
        'signInData',
        JSON.stringify({ isSignedIn: state.isSignedIn, userData: state.userData })
      )
    }
  },
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

export const { signIn, signOut } = usersSlice.actions
export default usersSlice.reducer
