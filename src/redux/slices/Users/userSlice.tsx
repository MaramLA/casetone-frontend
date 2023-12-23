import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

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

// fetch single user
export const fetchSingleUser = createAsyncThunk('users/fetchSingleUser', async () => {
  try {
    const response = await axios.get(`${baseURL}/users/profile`)
    return response.data.user
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

// update user
export const updateUserData = createAsyncThunk(
  'users/updateUserData',
  async (userData: Partial<UserType>, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/users/profile`, userData)
      return userData
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
  data: object | null | any
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
    }
  },
  extraReducers(builder) {
    // fetch users
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.usersList = action.payload
    })
    // fetch single user
    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.data = action.payload
    })
    // delete user
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      const newUsersList = state.usersList.filter((user) => user._id !== action.payload)
      state.usersList = newUsersList
    })
    // update user
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.data = action.payload
      const foundUser = state.usersList.find((user) => user._id === state.data._id)
      if (foundUser) {
        foundUser.firstName = String(state.data.firstName)
        foundUser.lastName = String(state.data.lastName)
        state.userData = state.data
        foundUser.email = String(state.data.email)
        foundUser.address = String(state.data.address)
        localStorage.setItem(
          'signInData',
          JSON.stringify({ isSignedIn: state.isSignedIn, userData: state.userData })
        )
      }
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
    })
    // activate user
    builder.addCase(activateUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.data = action.payload
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
        state.isLoading = false
        state.data = null
        state.error = action.payload || 'An error occured'
      }
    )
  }
})

export const { searchUser, clearError } = usersSlice.actions
export default usersSlice.reducer
