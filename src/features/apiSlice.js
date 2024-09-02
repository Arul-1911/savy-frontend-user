import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://sayv-backend.adaptable.app/api";
export const imgAddr = "https://creative-story.s3.amazonaws.com";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = getState().auth;

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    // ====== user auth ======= /

    userRegistration: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),

    // ====== Goals =======
    createGoals: builder.mutation({
      query: (data) => ({
        url: "/goal/create-goal",
        method: "POST",
        body: data,
      }),
    }),

    getGoals: builder.mutation({
      query: () => ({
        url: "/goal/get-goals",
        method: "GET",
      }),
    }),

    // ====== payday =======
    createPayday: builder.mutation({
      query: (data) => ({
        url: "/payday/create-payday",
        method: "POST",
        body: data,
      }),
    }),

    getPayday: builder.mutation({
      query: () => ({
        url: "/payday/create-payday",
        method: "GET",
      }),
    }),

    getPaydays: builder.mutation({
      query: () => ({
        url: "/payday/get-paydays",
        method: "GET",
      }),
    }),

    // ====== Budget =======
    saveBudget: builder.mutation({
      query: (data) => ({
        url: "/budget/create-budget",
        method: "POST",
        body: data,
      }),
    }),

    getBudget: builder.mutation({
      query: (data) => ({
        url: "/budget/get-budgets",
        method: "GET",
      }),
    }),

    getCategories: builder.mutation({
      query: () => ({
        url: "/category/get-categorys",
        method: "GET",
      }),
    }),

    // ====== Bills =======
    createBill: builder.mutation({
      query: (data) => ({
        url: "/bill/create-bill",
        method: "POST",
        body: data,
      }),
    }),

    dashboardData: builder.mutation({
      query: () => ({
        url: "/user/get-graph-data",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUserRegistrationMutation,
  useLoginUserMutation,
  useForgetPasswordMutation,

  useCreateGoalsMutation,
  useGetGoalsMutation,

  useCreatePaydayMutation,
  useGetPaydaysMutation,

  useSaveBudgetMutation,
  useGetBudgetMutation,
  useGetCategoriesMutation,

  useCreateBillMutation,

  useDashboardDataMutation,
} = apiSlice;
