export type Currency = {
  id: number;
  symbol: string;
  name: string;
  assetImage: string;
};

export type CurrenciesPage = {
  currentPage: number;
  data: Currency[];
  hasNextPage: boolean;
  maximumPages: number;
};
