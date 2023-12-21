import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { Response, response } from 'express'

axios.defaults.withCredentials = true

type ResetUserPasswordPayload = {
  token: string
  password: string
}

const baseURL = 'http://localhost:5050'

// fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(`${baseURL}/users`)
    return response.data.allUsers
  } catch (error: AxiosError | any) {
    return error.response.data.msg
  }
})

// delete user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseURL}/users/${id}`)
      return id
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// ban user
export const banUser = createAsyncThunk(
  'users/banUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/users/ban/${id}`)
      return response.data
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// unban user
export const unbanUser = createAsyncThunk(
  'users/unbanUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/users/unban/${id}`)
      return response.data
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// upgrade user
export const upgradeUser = createAsyncThunk(
  'users/upgradeUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/users/admin/${id}`)
      return response.data
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// downgrade user
export const degradeUser = createAsyncThunk(
  'users/downgradeUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/users/notadmin/${id}`)
      return response.data
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// sign in user
export const signInUser = createAsyncThunk(
  'users/signInUser',
  async (userData: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, userData)
      return response.data
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// sign up user
export const signUpUser = createAsyncThunk(
  'users/signUpUser',
  async (newUser: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/users/register`, newUser)
      return response.data
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// activate user
export const activateUser = createAsyncThunk(
  'users/activateUser',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/users/activate`, { token })
      return response.data
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// sign out user
export const signOutUser = createAsyncThunk('users/signOutUser', async () => {
  try {
    const response = await axios.post(`${baseURL}/auth/logout`)
    return response.data
  } catch (error: AxiosError | any) {
    return error.response.data.msg
  }
})

// forgot user password
export const forgotUserPassword = createAsyncThunk(
  'users/forgotUserPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/users/forget-password`, { email })
      console.log(response)
      return response.data
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// reset user password
export const resetUserPassword = createAsyncThunk(
  'users/resetUserPassword',
  async ({ token, password }: ResetUserPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/users/reset-password`, {
        token: token,
        password: password
      })
      return response.data
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

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

export type UsersState = {
  usersList: UserType[]
  isLoading: boolean
  error: null | string
  data: object | string | null
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
  data: null,
  isSignedIn: signInData.isSignedIn,
  userData: signInData.userData,
  searchTerm: ''
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    searchUser: (state, action) => {
      state.searchTerm = action.payload
    },
    clearError: (state) => {
      state.error = null
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
    // fetch users
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.usersList = action.payload
    })
    // delete user
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      const newUsersList = state.usersList.filter((user) => user._id !== action.payload)
      state.usersList = newUsersList
    })
    // ban user
    builder.addCase(banUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.usersList.map((user) => {
        if (user._id === action.payload.id) {
          user.isBanned = true
        }
      })
    })
    // uban user
    builder.addCase(unbanUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.usersList.map((user) => {
        if (user._id === action.payload.id) {
          user.isBanned = false
        }
      })
    })

    // upgrade user
    builder.addCase(upgradeUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.usersList.map((user) => {
        if (user._id === action.payload.id) {
          user.isAdmin = true
        }
      })
    })

    // degrade user
    builder.addCase(degradeUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.usersList.map((user) => {
        if (user._id === action.payload.id) {
          user.isAdmin = false
        }
      })
    })

    // sign in user
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.isSignedIn = true
      state.userData = action.payload.payload
      localStorage.setItem(
        'signInData',
        JSON.stringify({ isSignedIn: state.isSignedIn, userData: state.userData })
      )
    })
    // sign up user
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.data = action.payload
      console.log('signUpUser: ', action.payload)
    })
    // activate user
    builder.addCase(activateUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.data = action.payload
      console.log('activateUser: ', action.payload)
    })
    // sign out user
    builder.addCase(signOutUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.isSignedIn = false
      state.userData = action.payload
      localStorage.setItem(
        'signInData',
        JSON.stringify({ isSignedIn: state.isSignedIn, userData: state.userData })
      )
    })
    // forgot user password
    builder.addCase(forgotUserPassword.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.data = action.payload.message
    })
    // reset user password
    builder.addCase(resetUserPassword.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.data = action.payload.message
    })
    // pending
    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true
        state.data = null
        state.error = null
      }
    )
    // rejected
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        console.log('rejected: ', action.payload)
        state.isLoading = false
        state.data = null
        state.error = action.payload || 'An error occured'
        console.log('error: ', state.error)
      }
    )
  }
})

export const { searchUser, clearError, updateUser } = usersSlice.actions
export default usersSlice.reducer
