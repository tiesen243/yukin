import type { AxiosInstance } from 'axios'
import axios from 'axios'

export const api: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
