import axios from 'axios'
import { redirect } from 'react-router'
import { getMe } from '@/services/api/users'

export async function appLoader() {
  try {
    const user = await getMe()

    return { user }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw redirect('/login')
    }

    throw error
  }
}