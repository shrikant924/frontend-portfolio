import { baseApi } from '../../services/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, { username: string; password: string }>({
      query: (data) => ({
        url: '/api/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
