import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import { baseApi } from "../services/baseApi"
import cartReducer from '../features/cart/cartSlice'
import productCartReducer from '../features/product/productSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    cart:cartReducer,
    productCart: productCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
