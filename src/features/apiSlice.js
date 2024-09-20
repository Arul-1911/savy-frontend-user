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

    getBudgets: builder.mutation({
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

    // ====== Subscriptions =======
    getSubscriptions: builder.mutation({
      query: () => ({
        url: "/plan/get-plans",
        method: "GET",
      }),
    }),

    // ====== Cashflow =======
    getCashflow: builder.mutation({
      query: () => ({
        url: "/user/get-cashflow-data",
        method: "GET",
      }),
    }),

    getCashflowMoneyIn: builder.mutation({
      query: ({ date, filter }) => ({
        url: `/user/get-cashflow-data-in?date=${date}&filter=${filter}`,
        method: "GET",
      }),
    }),

    // ====== Dashboard =======
    dashboardData: builder.mutation({
      query: () => ({
        url: "/user/get-graph-data",
        method: "GET",
      }),
    }),

    // ====== Transactions =======
    getTransactions: builder.mutation({
      query: ({ query, date }) => ({
        url: `/user/get-transactions?keyword=${query}&date=${date}`,
        method: "GET",
      }),
    }),

    getTransaction: builder.mutation({
      query: (tranId) => ({
        url: `/user/get-transaction/${tranId}`,
        method: "GET",
      }),
    }),

    updateTransaction: builder.mutation({
      query: ({ transactionId, transData }) => ({
        url: `/user/update-transaction/${transactionId}`,
        method: "PATCH",
        body: transData,
      }),
    }),

    // ====== Tags =======
    createTag: builder.mutation({
      query: (data) => ({
        url: "/tag/create-tag",
        method: "POST",
        body: data,
      }),
    }),

    getTags: builder.mutation({
      query: () => ({
        url: "/tag/get-tags",
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
  useGetBudgetsMutation,
  useGetCategoriesMutation,

  useCreateBillMutation,

  useGetSubscriptionsMutation,

  useGetCashflowMutation,
  useGetCashflowMoneyInMutation,

  useDashboardDataMutation,

  useGetTransactionsMutation,
  useGetTransactionMutation,
  useUpdateTransactionMutation,

  useCreateTagMutation,
  useGetTagsMutation,
} = apiSlice;
