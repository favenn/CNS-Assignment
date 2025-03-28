import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = "http://localhost:4000/api/"

export const getApi = createApi({
  reducerPath: "getApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    encryptWithAES: builder.mutation({
      query: (data) => ({
        url: "aes/encrypt",
        method: "POST",
        body: data,
      }),
    }),
    decryptWithAES: builder.mutation({
      query: (data) => ({
        url: "aes/decrypt",
        method: "POST",
        body: data,
      }),
    }),
    encryptWith3DES: builder.mutation({
      query: (data) => ({
        url: "3des/encrypt",
        method: "POST",
        body: data,
      }),
    }),
    decryptWith3DES: builder.mutation({
      query: (data) => ({
        url: "3des/decrypt",
        method: "POST",
        body: data,
      }),
    }),
    encryptWithOTP: builder.mutation({
      query: (data) => ({
        url: "otp/encrypt",
        method: "POST",
        body: data,
      }),
    }),
    decryptWithOTP: builder.mutation({
      query: (data) => ({
        url: "otp/decrypt",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const {
  useEncryptWithAESMutation,
  useDecryptWithAESMutation,
  useEncryptWith3DESMutation,
  useDecryptWith3DESMutation,
  useEncryptWithOTPMutation,
  useDecryptWithOTPMutation,
} = getApi

