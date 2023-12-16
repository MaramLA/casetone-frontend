import axios from 'axios'

export const categoryApiBaseURL = 'http://localhost:5050/categories'

export const deleteCategory = async (id: string) => {
  const response = await axios.delete(`${categoryApiBaseURL}/${id}`)
  return response.data
}

export const createCategory = async (newCategory: any) => {
  const response = await axios.post(categoryApiBaseURL, newCategory)
  return response.data
}

export const editCategory = async (updateCategory: any) => {
  console.log('from createCategory: ' + updateCategory)
  const response = await axios.put(`${categoryApiBaseURL}/${updateCategory.id}`, updateCategory)
  return response.data
}
