import { baseApi } from '../../services/baseApi';
import type { Product } from './ProductType';

interface PaginatedResponse {
  content: Product[];
  page: number;
  size: number;
  totalPages: number;
}

interface Cart {
  userId: number;
  productId: number;
  productQty: number;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query<PaginatedResponse, number>({
      query: (page = 0) => `product/getProducts?page=${page}&size=8`,
      providesTags: ['product'],
    }),

    fetchProductById: builder.query<Product, number>({
      query: (id) => ({
        url: `product/get/${id}`,
        method: 'GET',
      }),
    }),

    deleteProductById: builder.mutation<Product, number>({
      query: (id) => ({ url: `product/delete/${id}`, method: 'DELETE' }),
      invalidatesTags: ['product'],
    }),

    addProductToCartByIdAndQty: builder.mutation<Product, Cart>({
      query: (cart) => ({
        url: `product/addToCart`,
        method: 'POST',
        body: cart,
      }),
      invalidatesTags: ['product'],
    }),

    updateProductById: builder.mutation<void, { id: string | undefined; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `product/updateProduct/${id}`,
        method: 'PUT',
        body: formData,
        responseHandler: 'text',
      }),
      invalidatesTags: ['product'],
    }),

    addProduct: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'product/addProduct',
        method: 'POST',
        body: formData,
        responseHandler: 'text',
      }),
      invalidatesTags: ['product'],
    }),

    getProductImage: builder.query<string, number>({
      query: (productId) => ({
        url: `product/image/${productId}`,
        responseHandler: async (response) => {
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        },
      }),
      providesTags: ['product'],
    }),
    updateProductStock: builder.mutation<void, { productId: number; qty: number }>({
      query: ({ productId, qty }) => ({
        url: `product/${productId}/stock`,
        method: 'PATCH',
        body: { qty },
      }),
      invalidatesTags: ['product'],
    }),
  }),
});

export const { useFetchProductsQuery, useFetchProductByIdQuery, useGetProductImageQuery } =
  productApi;
export const {
  useDeleteProductByIdMutation,
  useAddProductToCartByIdAndQtyMutation,
  useUpdateProductByIdMutation,
  useAddProductMutation,
  useUpdateProductStockMutation,
} = productApi;
