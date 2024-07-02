import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://scienda-backend.adaptable.app/api";
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
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin/admin-login",
        method: "POST",
        body: data,
      }),
    }),

    createDomain: builder.mutation({
      query: (data) => ({
        url: "/domain/create-domain",
        method: "POST",
        body: data,
      }),
    }),
    getDomains: builder.mutation({
      query: (params) => ({
        url: `/domain/get-domains?${params ? params : ""}`,
        method: "GET",
      }),
    }),
    getDomainById: builder.mutation({
      query: (id) => ({
        url: `/domain/get-domain/${id}`,
        method: "GET",
      }),
    }),
    updateDomainById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/domain/update-domain/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    //--subdomain----

    getSubdomains: builder.mutation({
      query: ({ id, params }) => ({
        url: `/sub-domain/get-sub-domains${id ? `?domain=${id}` : "?"}${
          params ? "&&" + params : ""
        }`,
        method: "GET",
      }),
    }),
    createSubdomain: builder.mutation({
      query: (data) => ({
        url: `/sub-domain/create-sub-domain`,
        method: "POST",
        body: data,
      }),
    }),
    getSubdomainById: builder.mutation({
      query: (id) => ({
        url: `/sub-domain/get-sub-domain/${id}`,
        method: "GET",
      }),
    }),

    updateSubdomainById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/sub-domain/update-sub-domain/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    //--topic---

    getTopics: builder.mutation({
      query: ({ id, params }) => ({
        url: `/topic/get-topics?sub_domain=${id}${params ? "&&" + params : ""}`,
        method: "GET",
      }),
    }),
    createTopic: builder.mutation({
      query: (data) => ({
        url: `/topic/create-topic`,
        method: "POST",
        body: data,
      }),
    }),
    getTopicById: builder.mutation({
      query: (id) => ({
        url: `/topic/get-topic/${id}`,
        method: "GET",
      }),
    }),

    updateTopicById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/topic/update-topic/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    //--sub-topic---

    getSubTopics: builder.mutation({
      query: ({ id, params }) => ({
        url: `/subtopic/get-subtopics?topic=${id}${
          params ? "&&" + params : ""
        }`,
        method: "GET",
      }),
    }),
    createSubTopic: builder.mutation({
      query: (data) => ({
        url: `/subtopic/create-subtopic`,
        method: "POST",
        body: data,
      }),
    }),
    getSubTopicById: builder.mutation({
      query: (id) => ({
        url: `/subtopic/get-subtopic/${id}`,
        method: "GET",
      }),
    }),

    updateSubTopicById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subtopic/update-subtopic/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    //--question apis--

    getQuestions: builder.mutation({
      query: ({ id, params }) => ({
        url: `/question/get-questions?sub_topic_reference=${id}${
          params ? "&&" + params : ""
        }`,
        method: "GET",
      }),
    }),
    createQuestion: builder.mutation({
      query: (data) => ({
        url: `/question/create-question`,
        method: "POST",
        body: data,
      }),
    }),
    getQuestionById: builder.mutation({
      query: (id) => ({
        url: `/question/get-question/${id}`,
        method: "GET",
      }),
    }),

    updateQuestionById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/question/update-question/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    //--test apis--

    createTest: builder.mutation({
      query: (data) => ({
        url: `/test/create-test`,
        method: "POST",
        body: data,
      }),
    }),
    getTests: builder.mutation({
      query: ({ id, params }) => ({
        url: `/test/get-tests?subdomain_reference=${id}${
          params && `&${params}`
        }`,
        method: "GET",
      }),
    }),
    getTestById: builder.mutation({
      query: (id) => ({
        url: `/test/get-test/${id}`,
        method: "GET",
      }),
    }),
    updateTest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/test/update-test/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    //--prof apis---
    createProf: builder.mutation({
      query: (data) => ({
        url: `/subadmin/create-subadmin`,
        method: "POST",
        body: data,
      }),
    }),
    getProfs: builder.mutation({
      query: (query) => ({
        url: `/subadmin/get-subadmins${query}`,
        method: "GET",
      }),
    }),

    getProfById: builder.mutation({
      query: (id) => ({
        url: `/admin/get-subadmin/${id}`,
        method: "GET",
      }),
    }),
    updateProfById: builder.mutation({
      query: ({ id, data }) => {
        // console.log(data);
        return {
          url: `/admin/update-subadmin-profile/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),

    addProfBankDetails: builder.mutation({
      query: (data) => ({
        url: `/bank/add-bank`,
        method: "POST",
        body: data,
      }),
    }),

    //--content apis----

    getPages: builder.mutation({
      query: () => ({
        url: "/pages/get-pages",
        method: "GET",
      }),
    }),
    getPageById: builder.mutation({
      query: (id) => ({
        url: `/pages/get-page/${id}`,
        method: "GET",
      }),
    }),
    createPage: builder.mutation({
      query: (data) => ({
        url: `/pages/create-page`,
        method: "POST",
        body: data,
      }),
    }),
    updatePage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/pages/update-page/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    //--chat apis----
    getAdminTicket: builder.mutation({
      query: ({ status, query }) => ({
        url: `/admin/get-tickets?status=${status}&key=${query}`,
        method: "GET",
      }),
    }),

    getSingleTicket: builder.mutation({
      query: (id) => ({
        url: `/admin/get-ticket/${id}`,
        method: "GET",
      }),
    }),

    closeTicket: builder.mutation({
      query: (id) => ({
        url: `/admin/close-ticket/${id}`,
        method: "PATCH",
      }),
    }),

    acceptTicket: builder.mutation({
      query: (id) => ({
        url: `/admin/accept-ticket/${id}`,
        method: "PATCH",
      }),
    }),

    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `/ticket/delete-ticket/${id}`,
        method: "DELETE",
      }),
    }),

    postMessage: builder.mutation({
      query: (data) => ({
        url: `/ticket/post-message/${data.ticketId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    //--Report apis----
    getReportStatics: builder.mutation({
      query: () => ({
        url: `/admin/get-statics`,
        method: "GET",
      }),
    }),
    viewModuleReportStatics: builder.mutation({
      query: (query) => ({
        url: `admin/get-all-transactions?subdomain=${query}`,
        method: "GET",
      }),
    }),

    getReportGraphStatics: builder.mutation({
      query: () => ({
        url: `/admin/get-users-graph-data`,
        method: "GET",
      }),
    }),

    //--User apis----
    getUsers: builder.mutation({
      query: (query) => ({
        url: `/admin/get-users?key=${query}`,
        method: "GET",
      }),
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: `/admin/get-otp`,
        method: "POST",
        body: data,
      }),
    }),

    submitOTP: builder.mutation({
      query: (data) => ({
        url: `/admin/submit-otp`,
        method: "POST",
        body: data,
      }),
    }),

    newPassword: builder.mutation({
      query: (data) => ({
        url: `/admin/reset-password`,
        method: "POST",
        body: data,
      }),
    }),

    //--Payment apis----
    getPayments: builder.mutation({
      query: (query) => ({
        url: `/admin/get-payments?key=${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetTestsMutation,
  useCreateTestMutation,
  useGetTestByIdMutation,
  useUpdateTestMutation,
  useCreateQuestionMutation,
  useGetQuestionsMutation,
  useGetQuestionByIdMutation,
  useUpdateQuestionByIdMutation,
  useUpdateSubTopicByIdMutation,
  useGetSubTopicsMutation,
  useCreateSubTopicMutation,
  useGetSubTopicByIdMutation,
  useUpdateTopicByIdMutation,
  useGetTopicByIdMutation,
  useGetTopicsMutation,
  useCreateTopicMutation,
  useUpdateProfByIdMutation,
  useGetProfByIdMutation,
  useCreateProfMutation,
  useGetProfsMutation,
  useGetSubdomainsMutation,
  useGetSubdomainByIdMutation,
  useCreateSubdomainMutation,
  useUpdateSubdomainByIdMutation,
  useGetDomainByIdMutation,
  useUpdateDomainByIdMutation,
  useGetDomainsMutation,
  useCreateDomainMutation,
  useCreatePageMutation,
  useUpdatePageMutation,
  useGetPageByIdMutation,
  useGetPagesMutation,
  useLoginAdminMutation,
  useAddProfBankDetailsMutation,
  useGetAdminTicketMutation,
  useGetSingleTicketMutation,
  usePostMessageMutation,
  useCloseTicketMutation,
  useAcceptTicketMutation,
  useDeleteTicketMutation,
  useGetReportStaticsMutation,
  useGetUsersMutation,
  useGetPaymentsMutation,
  useForgetPasswordMutation,
  useNewPasswordMutation,
  useSubmitOTPMutation,
  useGetReportGraphStaticsMutation,
  useViewModuleReportStaticsMutation,
} = apiSlice;
