import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithoutToken } from "./baseQuery";
import { ResponseType } from "@/models";

export const siteConfigService = createApi({
  reducerPath: "siteConfigService",
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => ({
    getSiteConfig: builder.query({
      query: () => ({
        url: "/site-config",
        method: "GET",
      }),
    }),
    postSiteConfig: builder.mutation<
      ResponseType<{ message: string }>,
      { siteName: string; contact: string }
    >({
      query: (body) => ({
        url: "/site-config",
        method: "POST",
        body,
      }),
    }),
    updateSiteConfig: builder.mutation<
      ResponseType<{ message: string }>,
      { siteName: string; contact: string; _id: string }
    >({
      query: ({ _id, ...body }) => ({
        url: `/site-config/${_id}`,
        method: "PATCH",
        body,
      }),
    }),

    deleteSiteConfig: builder.mutation({
      query: (id: string) => ({
        url: `/site-config/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSiteConfigQuery,
  usePostSiteConfigMutation,
  useDeleteSiteConfigMutation,
  useUpdateSiteConfigMutation,
} = siteConfigService;
