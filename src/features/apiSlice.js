import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL = "https://savy-backend-tda5.onrender.com/api";
const BASE_URL = "https://api.sayv.net/api";
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
      query: (paydayId) => ({
        url: `/payday/get-payday/${paydayId}`,
        method: "GET",
      }),
    }),

    getPaydays: builder.mutation({
      query: () => ({
        url: "/payday/get-paydays",
        method: "GET",
      }),
    }),

    updatePayday: builder.mutation({
      query: ({ paydayId, paydayData }) => ({
        url: `/payday/update-payday/${paydayId}`,
        method: "PATCH",
        body: paydayData,
      }),
    }),

    deletePayday: builder.mutation({
      query: (paydayId) => ({
        url: `/payday/delete-payday/${paydayId}`,
        method: "DELETE",
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
      query: () => ({
        url: "/budget/get-budgets",
        method: "GET",
      }),
    }),

    getBudget: builder.mutation({
      query: (budgetId) => ({
        url: `/budget/get-budget/${budgetId}`,
        method: "GET",
      }),
    }),

    updateBudget: builder.mutation({
      query: ({ budgetId, budgetData }) => ({
        url: `/budget/update-budget/${budgetId}`,
        method: "PATCH",
        body: budgetData,
      }),
    }),

    // ====== Category =======
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

    getBills: builder.mutation({
      query: () => ({
        url: "/bill/get-bills",
        method: "GET",
      }),
    }),

    getBill: builder.mutation({
      query: (billId) => ({
        url: `/bill/get-bill/${billId}`,
        method: "GET",
      }),
    }),

    updateBill: builder.mutation({
      query: ({ billId, billData }) => ({
        url: `/bill/update-bill/${billId}`,
        method: "PATCH",
        body: billData,
      }),
    }),

    deleteBill: builder.mutation({
      query: (billId) => ({
        url: `/bill/delete-bill/${billId}`,
        method: "DELETE",
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
      query: ({ currentStart, currentEnd, previousStart, previousEnd }) => ({
        url: `/user/get-cashflow-data-overview?currentStart=${currentStart}&currentEnd=${currentEnd}&previousStart=${previousStart}&previousEnd=${previousEnd}`,
        method: "GET",
      }),
    }),

    getCashflowMoneyIn: builder.mutation({
      query: ({
        currentStart,
        currentEnd,
        previousStart,
        previousEnd,
        filter,
      }) => ({
        url: `/user/get-cashflow-data-in?currentStart=${currentStart}&currentEnd=${currentEnd}&previousStart=${previousStart}&previousEnd=${previousEnd}&filter=${filter}`,
        method: "GET",
      }),
    }),

    getCashflowMoneyOut: builder.mutation({
      query: ({
        currentStart,
        currentEnd,
        previousStart,
        previousEnd,
        filter,
      }) => ({
        url: `/user/get-cashflow-data-out?currentStart=${currentStart}&currentEnd=${currentEnd}&previousStart=${previousStart}&previousEnd=${previousEnd}&filter=${filter}`,
        method: "GET",
      }),
    }),

    getCashflowNet: builder.mutation({
      query: ({
        currentStart,
        currentEnd,
        previousStart,
        previousEnd,
        filter,
      }) => ({
        url: `/user/get-cashflow-data-net?currentStart=${currentStart}&currentEnd=${currentEnd}&previousStart=${previousStart}&previousEnd=${previousEnd}&filter=${filter}`,
        method: "GET",
      }),
    }),

    getCashflowListData: builder.mutation({
      query: ({ currentStart, currentEnd, from }) => ({
        url: `/user/get-all-list?currentStart=${currentStart}&currentEnd=${currentEnd}&from=${from}`,
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

    // ====== Assets/Liabilities =======
    getAssetsLiabilities: builder.mutation({
      query: () => ({
        url: `/asset-liability/get-assets-liabilities`,
        method: "GET",
      }),
    }),

    getAssets: builder.mutation({
      query: (query) => ({
        url: `/asset/get-assets?type=${query}`,
        method: "GET",
      }),
    }),

    getAssetsLv2: builder.mutation({
      query: ({ assetLv1Id }) => ({
        url: `/asset-level1/get-assets?asset_ref=${assetLv1Id}`,
        method: "GET",
      }),
    }),

    getAssetsLv3: builder.mutation({
      query: ({ assetLv2Id }) => ({
        url: `/asset-level2/get-assets?asset_level1_ref=${assetLv2Id}`,
        method: "GET",
      }),
    }),

    createAssetLiability: builder.mutation({
      query: (data) => ({
        url: "/asset-liability/create-asset-liability",
        method: "POST",
        body: data,
      }),
    }),

    // ====== Dashboard =======
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
  useGetPaydayMutation,
  useUpdatePaydayMutation,
  useDeletePaydayMutation,

  useSaveBudgetMutation,
  useGetBudgetsMutation,
  useGetBudgetMutation,
  useUpdateBudgetMutation,

  useGetCategoriesMutation,

  useCreateBillMutation,
  useGetBillsMutation,
  useGetBillMutation,
  useUpdateBillMutation,
  useDeleteBillMutation,

  useGetSubscriptionsMutation,

  useGetCashflowMutation,
  useGetCashflowMoneyInMutation,
  useGetCashflowMoneyOutMutation,
  useGetCashflowNetMutation,
  useGetCashflowListDataMutation,

  useGetAssetsMutation,
  useGetAssetsLv2Mutation,
  useGetAssetsLv3Mutation,
  useCreateAssetLiabilityMutation,
  useGetAssetsLiabilitiesMutation,

  useDashboardDataMutation,

  useGetTransactionsMutation,
  useGetTransactionMutation,
  useUpdateTransactionMutation,

  useCreateTagMutation,
  useGetTagsMutation,
} = apiSlice;
