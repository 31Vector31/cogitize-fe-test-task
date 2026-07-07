import { fetchBaseQuery } from "@/07.shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { SwapPreview, SwapPreviewPayload } from "../model";

const swapApi = createApi({
  reducerPath: "swapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GATEWAY_API,
  }),
  endpoints: (build) => ({
    swapPreview: build.query<SwapPreview, SwapPreviewPayload>({
      query: (payload) => ({
        url: "/swap/public/preview",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

const { useSwapPreviewQuery } = swapApi;

export { swapApi, useSwapPreviewQuery };
