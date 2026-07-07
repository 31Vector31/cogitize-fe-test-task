import { currencyApi, type Currency } from "@/06.entities";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { Provider } from "react-redux";
import CurrencySelect from "./currency-select";

const MESSAGES = {
  swap: {
    selectCurrency: "Select currency",
    searchCoins: "Search coins",
    noResults: "Nothing found",
    loading: "Loading",
    loadingError: "Failed to load coins",
    retry: "Retry",
  },
};

const ALL_CURRENCIES: Currency[] = [
  { id: 1, symbol: "BTC", name: "Bitcoin", assetImage: "https://cdn.test/btc.png" },
  { id: 2, symbol: "ETH", name: "Ethereum", assetImage: "https://cdn.test/eth.png" },
  { id: 3, symbol: "USDT", name: "Tether", assetImage: "https://cdn.test/usdt.png" },
  { id: 4, symbol: "ADA", name: "Cardano", assetImage: "https://cdn.test/ada.png" },
  { id: 5, symbol: "SOL", name: "Solana", assetImage: "https://cdn.test/sol.png" },
];

const PAGE_SIZE = 3;

const mockAssetsApi = () => {
  fetchMock.mockResponse(async (request) => {
    const url = new URL(request.url, "http://localhost");
    const search = (url.searchParams.get("search") ?? "").toLowerCase();
    const page = Number(url.searchParams.get("page") ?? "1");

    const filtered = ALL_CURRENCIES.filter(
      (currency) =>
        currency.symbol.toLowerCase().includes(search) ||
        currency.name.toLowerCase().includes(search),
    );
    const start = (page - 1) * PAGE_SIZE;
    const data = filtered.slice(start, start + PAGE_SIZE);

    return JSON.stringify({
      currentPage: page,
      data,
      hasNextPage: start + PAGE_SIZE < filtered.length,
      maximumPages: Math.ceil(filtered.length / PAGE_SIZE),
    });
  });
};

const createTestStore = () => {
  return configureStore({
    reducer: combineReducers({
      [currencyApi.reducerPath]: currencyApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(currencyApi.middleware),
  });
};

const renderCurrencySelect = (value: Currency | null = null) => {
  const onChange = jest.fn();
  render(
    <Provider store={createTestStore()}>
      <NextIntlClientProvider locale="en" messages={MESSAGES}>
        <CurrencySelect value={value} onChange={onChange} />
      </NextIntlClientProvider>
    </Provider>,
  );
  return { onChange };
};

const openDropdown = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole("button", { name: "Select currency" }));
};

describe("CurrencySelect", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    mockAssetsApi();
  });

  it("renders the selected currency and keeps the dropdown closed", () => {
    renderCurrencySelect(ALL_CURRENCIES[0]);

    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("loads the first page of currencies when opened", async () => {
    const user = userEvent.setup();
    renderCurrencySelect();

    await openDropdown(user);

    expect(await screen.findAllByRole("option")).toHaveLength(PAGE_SIZE);
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("ETH")).toBeInTheDocument();
  });

  it("loads the next page when the list is scrolled to the bottom", async () => {
    const user = userEvent.setup();
    renderCurrencySelect();

    await openDropdown(user);
    await screen.findAllByRole("option");

    const list = screen.getByRole("listbox");
    list.dispatchEvent(new Event("scroll", { bubbles: true }));

    await waitFor(() => {
      expect(screen.getAllByRole("option")).toHaveLength(ALL_CURRENCIES.length);
    });
    expect(screen.getByText("SOL")).toBeInTheDocument();
  });

  it("requests filtered currencies when searching", async () => {
    const user = userEvent.setup();
    renderCurrencySelect();

    await openDropdown(user);
    await screen.findAllByRole("option");
    await user.type(screen.getByPlaceholderText("Search coins"), "tether");

    await waitFor(() => {
      expect(screen.getAllByRole("option")).toHaveLength(1);
    });
    expect(screen.getByText("USDT")).toBeInTheDocument();
  });

  it("shows an empty state when the search has no matches", async () => {
    const user = userEvent.setup();
    renderCurrencySelect();

    await openDropdown(user);
    await screen.findAllByRole("option");
    await user.type(screen.getByPlaceholderText("Search coins"), "zzz");

    expect(await screen.findByText("Nothing found")).toBeInTheDocument();
    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });

  it("shows an error state with retry when the request fails", async () => {
    fetchMock.resetMocks();
    fetchMock.mockReject(new Error("network error"));
    const user = userEvent.setup();
    renderCurrencySelect();

    await openDropdown(user);

    expect(await screen.findByText("Failed to load coins")).toBeInTheDocument();

    fetchMock.resetMocks();
    mockAssetsApi();
    await user.click(screen.getByRole("button", { name: "Retry" }));

    expect(await screen.findAllByRole("option")).toHaveLength(PAGE_SIZE);
  });

  it("calls onChange and closes the dropdown after selecting an option", async () => {
    const user = userEvent.setup();
    const { onChange } = renderCurrencySelect();

    await openDropdown(user);
    await user.click((await screen.findAllByRole("option"))[1]);

    expect(onChange).toHaveBeenCalledWith(ALL_CURRENCIES[1]);
    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("closes the dropdown on Escape", async () => {
    const user = userEvent.setup();
    renderCurrencySelect();

    await openDropdown(user);
    await screen.findAllByRole("option");
    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });
});
