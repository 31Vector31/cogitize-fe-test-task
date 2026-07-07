import { baseQuery } from "@/07.shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { CurrenciesPage, Currency } from "../model";

const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery,
  endpoints: (build) => ({
    currencies: build.infiniteQuery<CurrenciesPage, string, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
          lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
      },
      query: ({ queryArg, pageParam }) => ({
        url: "/public/assets",
        params: { search: queryArg, page: pageParam },
      }),
    }),
    currencyBySymbol: build.query<Currency | null, string>({
      query: (symbol) => ({
        url: "/public/assets",
        params: { search: symbol, page: 1 },
      }),
      transformResponse: (response: CurrenciesPage, _meta, symbol) =>
        response.data.find(
          (currency) => currency.symbol.toUpperCase() === symbol.toUpperCase(),
        ) ?? null,
    }),
  }),
});

const { useCurrenciesInfiniteQuery, useCurrencyBySymbolQuery } = currencyApi;

export { currencyApi, useCurrenciesInfiniteQuery, useCurrencyBySymbolQuery };
