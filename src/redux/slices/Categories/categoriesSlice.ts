import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await api.get('public/mock/e-commerce/categories.json')
  return response.data
})

type Category = {
  id: number
  name: string
}

export type CategoryState = {
  categoriesList: Category[]
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
  reducers: {},
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

export default categoriesSlice.reducer
