import { configureStore } from "@reduxjs/toolkit"
import { getApi } from "./api/getApi"
import { setupListeners } from "@reduxjs/toolkit/query"

export const store = configureStore({
  reducer: {
    [getApi.reducerPath]: getApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

