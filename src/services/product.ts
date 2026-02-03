import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../type/Product";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers) =>
      headers.set("Authorization", `Bearer ${sessionStorage.getItem("token")}`),
  }),

  endpoints: (builder) => ({
    fetchProducts: builder.query<Product, void>({
      query: () => "product/getProducts",
    }),

    deleteProductById: builder.mutation<Product, number>({
      query: (id) => ({ url: `product/delete/${id}`, method: "DELETE" }),
    }),

    addProductToCartByIdAndQty : builder.mutation<Product , {id: string; qty: number}>({
      query:({id, qty}) => ({
        url:`product/addToCart/${id}/${qty}`,
        method:'POST',
      })
    })
  }),
});

export const { useFetchProductsQuery } = productApi;
export const {useDeleteProductByIdMutation , useAddProductToCartByIdAndQtyMutation} = productApi