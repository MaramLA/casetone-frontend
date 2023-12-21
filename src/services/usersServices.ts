import axios from 'axios'

export const userApiBaseURL = 'http://localhost:5050/users'

// export const deleteUser = async (id: string) => {
//   const response = await axios.delete(`${userApiBaseURL}/${id}`)
//   return response.data
// }

// export const banUser = async (id: string) => {
//   const response = await axios.put(`${userApiBaseURL}/ban/${id}`)
//   return response.data
// }

// export const unbanUser = async (id: string) => {
//   const response = await axios.put(`${userApiBaseURL}/unban/${id}`)
//   return response.data
// }

// export const createUser = async (newUser: any) => {
//   const response = await axios.post(`${userApiBaseURL}/register`, newUser)
//   return response.data
// }

// export const activateUserAccount = async (token: string) => {
//   const response = await axios.post(`${userApiBaseURL}/activate`, { token })
//   return response.data
// }

export const updateUserData = async (userData: any) => {
  const response = await axios.put(`${userApiBaseURL}/profile`, userData)
  return response.data
}

// export const forgotUserPassword = async (email: string) => {
//   const response = await axios.post(`${userApiBaseURL}/forget-password`, { email })
//   return response.data
// }

// export const resetUserPassword = async (token: string, password: string) => {
//   const response = await axios.post(`${userApiBaseURL}/reset-password`, {
//     token: token,
//     password: password
//   })
//   return response.data
// }
