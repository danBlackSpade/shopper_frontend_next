import axios, { AxiosInstance } from 'axios'
// import { NextPageContext } from 'next'


const setupApiClient = () : AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  })
  return api
}

const apiClient = setupApiClient()

export { apiClient, setupApiClient }