import axios from 'axios'

export const productApiBaseURL = 'http://localhost:5050/products'

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${productApiBaseURL}/${id}`)
  return response.data
}

export const createProduct = async (formData: FormData) => {
  const response = await axios.post(productApiBaseURL, formData)
  return response
}
