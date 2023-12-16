import axios from 'axios'

export const userApiBaseURL = 'http://localhost:5050/auth'

export const signIn = async (userData: any) => {
  const response = await axios.post(`${userApiBaseURL}/login`, userData)
  return response
}

export const signOut = async () => {
  const response = await axios.post(`${userApiBaseURL}/logout`)
  return response
}
