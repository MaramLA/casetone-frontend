import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await api.get('/mock/e-commerce/products.json')
  return response.data
})

export type ProductType = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: string[]
}

export type ProductState = {
  productsList: ProductType[]
  error: null | string
  isLoading: boolean
  singleProduct: ProductType
  searchTerm: string | null
}

const initialState: ProductState = {
  productsList: [],
  error: null,
  isLoading: false,
  singleProduct: {} as ProductType,
  searchTerm: ''
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    findProductById: (state, action) => {
      const id: number = action.payload
      state.productsList.find((product: ProductType) => {
        if (product.id === id) {
          state.singleProduct = product
        }
      })
    },
    searchProducts: (state, action) => {
      state.searchTerm = action.payload
    },
    sortProducts: (state, action) => {
      const sortingCriteria = action.payload
      if (sortingCriteria === 'name') {
        state.productsList.sort((currentProduct, nextProduct) =>
          currentProduct.name.toLowerCase().localeCompare(nextProduct.name.toLowerCase())
        )
      } else if (sortingCriteria === 'price') {
        state.productsList.sort(
          (currentProduct: ProductType, nextProduct: ProductType) =>
            Number(currentProduct.price) - Number(nextProduct.price)
        )
      }
    },
    deleteProduct: (state, action) => {
      const newProductsList = state.productsList.filter((product) => product.id !== action.payload)
      state.productsList = newProductsList
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productsList = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message || 'Fetching products data ended unsuccessfully'
      state.isLoading = false
    })
  }
})

export const { findProductById, searchProducts, sortProducts, deleteProduct } = productSlice.actions
export default productSlice.reducer
