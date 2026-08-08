import { api } from "../../../shared/api/baseApi";
import type {
  User,
  LoginRequest,
  RegisterRequest,
} from "../../../entities/user/model/types";
import Cookies from "js-cookie";
import { setUser } from "../model/authSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<User, RegisterRequest>({
      query: (data) => ({
        url: "/auth/signUp",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => {
        if (response?.access_token) {
          Cookies.set("accessToken", response.access_token);
        }

        return response?.user || response;
      },
      invalidatesTags: ["User"],
    }),

    login: builder.mutation<User, LoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          username: data.username,
          password: data.password,
        },
      }),
      transformResponse: (response: any) => {
        if (response?.access_token) {
          Cookies.set("accessToken", response.access_token);
        }

        return response?.user || response;
      },

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUser(data));
        } catch (error) {
          console.error(error);
        }
      },
      invalidatesTags: ["User"],
    }),

    getProfile: builder.query<User, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      onQueryStarted: (_, { dispatch }) => {
        Cookies.remove("accessToken");
        dispatch(setUser(null));
        dispatch(api.util.resetApiState());
        window.location.href = "/login";
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
