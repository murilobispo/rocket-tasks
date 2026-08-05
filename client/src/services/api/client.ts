import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { getToken, removeToken } from '@/services/auth/storage'

export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
})

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }
)

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if(error.response?.status === 401){
      removeToken()
    }
    
    return Promise.reject(error)
  }
)