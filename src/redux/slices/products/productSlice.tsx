import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import { productApiBaseURL } from '../../../services/productsServices'

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await axios.get(productApiBaseURL)
  return response.data.payload.products.allProductOnPage
})

export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSinglProduct',
  async (id: string) => {
    const response = await axios.get(`${productApiBaseURL}/${id}`)
    return response.data.payload
  }
)

export const deleteSingleProduct = createAsyncThunk(
  'product/deleteSingleProduct',
  async (id: string) => {
    const response = await axios.delete(`${productApiBaseURL}/${id}`)
    return response.data
  }
)

export type ProductType = {
  _id: string
  name: string
  price: number
  image: string
  quantity: number
  sold: number
  categories: string[]
  description: string
  sizes: string
  variants: string
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
    // findProductById: (state, action) => {
    //   const id: string = action.payload
    //   state.productsList.find((product: ProductType) => {
    //     if (product._id === id) {
    //       state.singleProduct = product
    //     }
    //   })
    // },
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
    // deleteProduct: (state, action) => {
    //   const newProductsList = state.productsList.filter((product) => product._id !== action.payload)
    //   state.productsList = newProductsList
    // },

    editProduct: (state, action) => {
      const updatedProduct = action.payload
      const foundProduct = state.productsList.find((product) => product._id === updatedProduct.id)
      if (foundProduct) {
        foundProduct.name = updatedProduct.name
        foundProduct.image = updatedProduct.image
        foundProduct.description = updatedProduct.description
        foundProduct.categories = updatedProduct.categories
        foundProduct.variants = updatedProduct.variants
        foundProduct.sizes = updatedProduct.sizes
        foundProduct.price = updatedProduct.price
      }
    }
  },
  extraReducers(builder) {
    // fetchProducts
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productsList = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      console.log(action.payload)
      state.singleProduct = action.payload
      state.isLoading = false
    })
    builder.addCase(deleteSingleProduct.fulfilled, (state, action) => {
      console.log('from delete builder: ' + action.payload)
      // state.singleProduct = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message || 'Fetching products data ended unsuccessfully'
      state.isLoading = false
    })

    // // fetchSingleProduct
    // builder.addCase(fetchSingleProduct.pending, (state) => {
    //   state.isLoading = true
    //   state.error = null
    // })
    // builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
    //   state.singleProduct = action.payload
    //   state.isLoading = false
    // })
    // builder.addCase(fetchSingleProduct.rejected, (state, action) => {
    //   state.error = action.error.message || 'Fetching product data ended unsuccessfully'
    //   state.isLoading = false
    // })
  }
})

export const {
  // findProductById,
  searchProducts,
  sortProducts,
  // deleteProduct,
  editProduct
} = productSlice.actions
export default productSlice.reducer
