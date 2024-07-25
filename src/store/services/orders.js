// src/store/services/orders.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "store/slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://order-management-2.onrender.com/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Logout user
    api.dispatch(logout());
  }

  return result;
};

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `/orders?${queryString}`;
      },
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
