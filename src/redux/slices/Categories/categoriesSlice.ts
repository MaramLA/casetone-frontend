import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await api.get('/mock/e-commerce/categories.json')
  return response.data
})

export type CategoryType = {
  id: number
  name: string
}

export type CategoryState = {
  categoriesList: CategoryType[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoryState = {
  categoriesList: [],
  error: null,
  isLoading: false
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    deleteCategory: (state, action) => {
      return {
        ...state,
        categoriesList: state.categoriesList.filter((category) => category.id !== action.payload)
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categoriesList = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message || 'Fetching categories data ended unsuccessfully'
    })
  }
})

export const { deleteCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
