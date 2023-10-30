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
  ban: boolean
}

export type UsersState = {
  usersList: UserType[]
  isLoading: boolean
  error: null | string
  isSignedIn: boolean
  userData: null | UserType
  searchTerm: string
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
  userData: signInData.userData,
  searchTerm: ''
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
    },
    searchUser: (state, action) => {
      state.searchTerm = action.payload
    },
    deleteUser: (state, action) => {
      const newUsersList = state.usersList.filter((user) => user.id !== action.payload)
      state.usersList = newUsersList
    },
    banUser: (state, action) => {
      const id = action.payload
      state.usersList.map((user) => {
        if (user.id === id) {
          user.ban = !user.ban
        }
      })
    },
    addUser: (state, action) => {
      state.usersList.push(action.payload)
    },
    updateUser: (state, action) => {
      const { id, firstName, lastName, email } = action.payload
      const foundUser = state.usersList.find((user) => user.id === id)

      if (foundUser) {
        foundUser.firstName = firstName
        foundUser.lastName = lastName
        state.userData = foundUser
        foundUser.email = email
        localStorage.setItem(
          'signInData',
          JSON.stringify({ isSignedIn: state.isSignedIn, userData: state.userData })
        )
      }
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

export const { signIn, signOut, searchUser, deleteUser, banUser, addUser, updateUser } =
  usersSlice.actions
export default usersSlice.reducer
