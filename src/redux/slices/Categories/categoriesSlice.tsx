import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios, { AxiosError } from 'axios'

export const categoryApiBaseURL = 'https://casetone-backend-api.vercel.app/categories'

type UpdateCategoryPayload = {
  id: string
  name: string
}

type NewCategoryPaylosad = {
  name: string
}

export type CategoryType = {
  _id: string
  name: string
}

export type CategoryState = {
  categoriesList: CategoryType[]
  error: null | string
  isLoading: boolean
}

// fetch categoreis
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await axios.get(categoryApiBaseURL)
    return response.data.payload.allCategoriesOnPage
  } catch (error: AxiosError | any) {
    return error.response.data.msg
  }
})

// delete single category
export const deleteSingleCategory = createAsyncThunk(
  'categories/deleteSingleCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${categoryApiBaseURL}/${id}`)
      return id
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// create new category
export const createNewCategory = createAsyncThunk(
  'categories/createNewCategory',
  async (newCategory: NewCategoryPaylosad, { rejectWithValue }) => {
    try {
      const response = await axios.post(categoryApiBaseURL, newCategory)
      return response.data.payload
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// update single category
export const updateSingleCategory = createAsyncThunk(
  'categories/updateSingleCategory',
  async ({ id, name }: UpdateCategoryPayload, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${categoryApiBaseURL}/${id}`, { name })
      return response.data.payload
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

const initialState: CategoryState = {
  categoriesList: [],
  error: null,
  isLoading: false
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers(builder) {
    // fetch categories
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.categoriesList = action.payload
    })
    // delete single category
    builder.addCase(deleteSingleCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      const newcategoriesList = state.categoriesList.filter(
        (category) => category._id !== action.payload
      )
      state.categoriesList = newcategoriesList
    })
    // create single category
    builder.addCase(createNewCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.categoriesList.push(action.payload)
    })
    // update single category
    builder.addCase(updateSingleCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
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

export const { clearError } = categoriesSlice.actions

export default categoriesSlice.reducer
