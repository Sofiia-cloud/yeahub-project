import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const BASE_URL = "https://api.yeatwork.ru";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    try {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          credentials: "include",
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      }
    } catch (error) {
      console.error(error);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Questions", "Filter", "Interview"],
  endpoints: () => ({}),
});

export default api;
