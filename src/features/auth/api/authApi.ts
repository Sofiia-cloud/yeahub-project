
import {api } from '../../../shared/api/baseApi';
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '../../../entities/user/model/types';
import Cookies from 'js-cookie';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
   
    register: builder.mutation<User, RegisterRequest>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: AuthResponse) => {
        if (response.accessToken) {
          Cookies.set('accessToken', response.accessToken);
        }
        return response.user;
      },
      invalidatesTags: ['User'],
    }),

    
    login: builder.mutation<User, LoginRequest>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: AuthResponse) => {
        if (response.accessToken) {
          Cookies.set('accessToken', response.accessToken);
        }
        return response.user;
      },
      invalidatesTags: ['User'],
    }),

   
    getProfile: builder.query<User, void>({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      onQueryStarted: (_, { dispatch }) => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        dispatch(api.util.resetApiState());
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
} = authApi;

export default authApi;