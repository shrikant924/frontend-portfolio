import { baseApi } from "../../services/baseApi"
import type { Product } from "./ProductType"

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
      fetchProducts: builder.query<Product[], void>({
        query: () => "product/getProducts",
      }),
  
      fetchProductById: builder.query<Product, number>({
        query: (id) => ({
          url: `product/get/${id}`,
          method: "GET",
        }),
      }),
  
      deleteProductById: builder.mutation<Product, number>({
        query: (id) => ({ url: `product/delete/${id}`, method: "DELETE" }),
      }),
  
      addProductToCartByIdAndQty: builder.mutation<
        Product,
        { id: string; qty: number }
      >({
        query: ({ id, qty }) => ({
          url: `product/addToCart/${id}/${qty}`,
          method: "POST",
        }),
      }),
  
      updateProductById: builder.mutation<
        void,
        { id: string | undefined; formData: FormData }
      >({
        query: ({ id, formData }) => ({
          url: `product/updateProduct/${id}`,
          method: "PUT",
          body: formData,
          responseHandler: "text",
        }),
      }),
  
      addProduct: builder.mutation<void, FormData>({
        query: (formData) => ({
          url: "product/addProduct",
          method: "POST",
          body: formData,
          responseHandler: "text",
        }),
      }),
    }),
  });
  
  export const { useFetchProductsQuery , useFetchProductByIdQuery } = productApi;
  export const {
    useDeleteProductByIdMutation,
    useAddProductToCartByIdAndQtyMutation,
    useUpdateProductByIdMutation,
    useAddProductMutation,
  } = productApi;
  
