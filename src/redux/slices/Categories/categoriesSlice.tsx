import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'
import axios from 'axios'

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await api.get('http://localhost:5050/categories')
  console.log('response: ' + response.data.payload.data)
  return response.data.payload.data
})

export type CategoryType = {
  _id: string
  name: string
  createAt?: string
  updateAt?: string
  __v: number
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
      api.delete(`http://localhost:5050/categories/${action.payload}`)
      window.location.reload()
      fetchCategories()
    },
    addCategory: (state, action) => {
      state.categoriesList.push(action.payload)
    },
    editCategory: (state, action) => {
      const { id, name } = action.payload
      const foundCategoy = state.categoriesList.find((category) => category._id === id)
      if (foundCategoy) {
        foundCategoy.name = name
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

export const { deleteCategory, addCategory, editCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
