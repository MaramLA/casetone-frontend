import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { userApiBaseURL } from '../../../services/usersServices'

export type UserType = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
  isBanned: boolean
  balance: number
  address: string
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(userApiBaseURL)
  console.log(response.data.allUsers)
  return response.data.allUsers
})

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
    setLoginCookie: (state, action) => {
      state.isSignedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'signInData',
        JSON.stringify({ isSignedIn: state.isSignedIn, userData: state.userData })
      )
    },
    resetLoginCookie: (state) => {
      state.isSignedIn = false
      state.userData = null
      localStorage.setItem(
        'signInData',
        JSON.stringify({ isSignedIn: state.isSignedIn, userData: state.userData })
      )
    },
    // signIn: (state, action) => {
    //   state.isSignedIn = true
    //   state.userData = action.payload
    //   localStorage.setItem(
    //     'signInData',
    //     JSON.stringify({ isSignedIn: state.isSignedIn, userData: state.userData })
    //   )
    // },
    // signOut: (state) => {
    //   state.isSignedIn = false
    //   state.userData = null
    //   localStorage.setItem(
    //     'signInData',
    //     JSON.stringify({ isSignedIn: state.isSignedIn, userData: state.userData })
    //   )
    // },
    searchUser: (state, action) => {
      state.searchTerm = action.payload
    },
    updateUser: (state, action) => {
      const { id, firstName, lastName, email } = action.payload
      const foundUser = state.usersList.find((user) => user._id === id)

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

export const { searchUser, updateUser, setLoginCookie, resetLoginCookie } = usersSlice.actions
export default usersSlice.reducer
