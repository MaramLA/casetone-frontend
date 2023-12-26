import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios, { AxiosError } from 'axios'

const productApiBaseURL = 'http://localhost:5050/products'

export type EditProductPayload = {
  formData: FormData
  id: string
}

// fetch products
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  try {
    const response = await axios.get(productApiBaseURL)
    return response.data.payload.products.allProductOnPage
  } catch (error: AxiosError | any) {
    return error.response.data.msg
  }
})

// fetch single product
export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSinglProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${productApiBaseURL}/${id}`)
      return response.data.payload
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// delete single product
export const deleteSingleProduct = createAsyncThunk(
  'product/deleteSingleProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${productApiBaseURL}/${id}`)
      return id
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// create new produtct
export const createNewProduct = createAsyncThunk(
  'product/createNewProduct',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(productApiBaseURL, formData)
      return response.data.createdProduct
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// edit single produtct
export const editSingleProduct = createAsyncThunk(
  'product/editSingleProduct',
  async ({ formData, id }: EditProductPayload, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${productApiBaseURL}/${id}`, formData)
      return response.data.payload
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

// fetch braintree token
export const fetchBraintreeToken = createAsyncThunk('product/fetchBraintreeToken', async () => {
  try {
    const response = await axios.get(`${productApiBaseURL}/braintree/token`)
    return response.data
  } catch (error: AxiosError | any) {
    return error.response.data.msg
  }
})

// fetch braintree token
export const PaywithBraintree = createAsyncThunk(
  'product/PaywithBraintree',
  async (data: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${productApiBaseURL}/braintree/payment`, data)
      return response.data
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response.data.msg)
    }
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
    }

    // editProduct: (state, action) => {
    //   const updatedProduct = action.payload
    //   const foundProduct = state.productsList.find((product) => product._id === updatedProduct.id)
    //   if (foundProduct) {
    //     foundProduct.name = updatedProduct.name
    //     foundProduct.image = updatedProduct.image
    //     foundProduct.description = updatedProduct.description
    //     foundProduct.categories = updatedProduct.categories
    //     foundProduct.variants = updatedProduct.variants
    //     foundProduct.sizes = updatedProduct.sizes
    //     foundProduct.price = updatedProduct.price
    //     foundProduct.quantity = updatedProduct.quantity
    //   }
    // }
  },
  extraReducers(builder) {
    // fetch products
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.productsList = action.payload
    })
    // fetch single product
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      console.log(action.payload)
      state.singleProduct = action.payload
    })
    // delete single product
    builder.addCase(deleteSingleProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null

      const newProductsList = state.productsList.filter((product) => product._id !== action.payload)
      state.productsList = newProductsList
    })
    // create new product
    builder.addCase(createNewProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.productsList.push(action.payload)
      console.log('from create builder: ', action.payload)
    })
    // edit single product
    builder.addCase(editSingleProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      console.log('from edit builder: ', action.payload)
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
        foundProduct.quantity = updatedProduct.quantity
      }
    })
    // pay with braintree
    builder.addCase(PaywithBraintree.fulfilled, (state, action) => {
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

export const { searchProducts, sortProducts } = productSlice.actions
export default productSlice.reducer
