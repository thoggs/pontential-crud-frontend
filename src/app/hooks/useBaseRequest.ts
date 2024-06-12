'use client';
import axios, { AxiosInstance } from "axios";

export function useBaseRequest() {
  const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      }
    })
    instance.interceptors.response.use(async response => {
      try {
        return response
      } catch (error) {
        console.error(error)
        return Promise.reject(error)
      }
    })
    return instance;
  }

  return {
    instance: createAxiosInstance(),
  }
}
