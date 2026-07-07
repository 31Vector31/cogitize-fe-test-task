import { currencyApi, swapApi, type Currency } from "@/06.entities";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { Provider } from "react-redux";
import CurrencyExchange from "./currency-exchange";

const MESSAGES = {
  swap: {
    selectCryptocurrency: "Select cryptocurrency",
    youSend: "You send",
    youReceive: "You Receive",
    changeDirection: "Change direction",
    selectCurrency: "Select currency",
    searchCoins: "Search coins",
    noResults: "Nothing found",
    loading: "Loading",
    loadingError: "Failed to load coins",
    retry: "Retry",
    previewError: "Failed to calculate the rate. Please try again.",
    swapSuccess:
      "You have successfully exchanged {fromAmount} {fromSymbol} → {toAmount} {toSymbol}",
    ok: "OK",
    next: "Next",
  },
};

const ALL_CURRENCIES: Currency[] = [
  { id: 1, symbol: "BTC", name: "Bitcoin", assetImage: "https://cdn.test/btc.png" },
  { id: 2, symbol: "ETH", name: "Ethereum", assetImage: "https://cdn.test/eth.png" },
  { id: 3, symbol: "USDT", name: "Tether US", assetImage: "https://cdn.test/usdt.png" },
];

const PREVIEW_RESPONSE = {
  estimatedGive: "100",
  estimatedReceive: "0.00155233",
  estimatedRate: "0.00001552",
  estimatedUsdtEquivalent: "98.99",
};

const mockApis = () => {
  fetchMock.mockResponse(async (request) => {
    const url = new URL(request.url, "http://localhost");

    if (url.pathname.includes("/swap/public/preview")) {
      return JSON.stringify(PREVIEW_RESPONSE);
    }

    const search = (url.searchParams.get("search") ?? "").toLowerCase();
    const data = ALL_CURRENCIES.filter(
      (currency) =>
        currency.symbol.toLowerCase().includes(search) ||
        currency.name.toLowerCase().includes(search),
    );
    return JSON.stringify({
      currentPage: 1,
      data,
      hasNextPage: false,
      maximumPages: 1,
    });
  });
};

const createTestStore = () => {
  return configureStore({
    reducer: combineReducers({
      [currencyApi.reducerPath]: currencyApi.reducer,
      [swapApi.reducerPath]: swapApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(currencyApi.middleware, swapApi.middleware),
  });
};

const renderWidget = () => {
  render(
    <Provider store={createTestStore()}>
      <NextIntlClientProvider locale="en" messages={MESSAGES}>
        <CurrencyExchange />
      </NextIntlClientProvider>
    </Provider>,
  );
};

const findCurrencyTriggers = async () => {
  const triggers = await screen.findAllByRole("button", {
    name: "Select currency",
  });
  return { fromTrigger: triggers[0], toTrigger: triggers[1] };
};

describe("CurrencyExchange", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    mockApis();
  });

  it("initializes with the default USDT -> BTC pair", async () => {
    renderWidget();

    const { fromTrigger, toTrigger } = await findCurrencyTriggers();

    await waitFor(() => {
      expect(within(fromTrigger).getByText("USDT")).toBeInTheDocument();
    });
    expect(within(toTrigger).getByText("BTC")).toBeInTheDocument();
  });

  it("recalculates the receive amount when typing into the send field", async () => {
    const user = userEvent.setup();
    renderWidget();
    await findCurrencyTriggers();

    await user.type(screen.getByRole("textbox", { name: "You send" }), "100");

    await waitFor(
      () => {
        expect(screen.getByRole("textbox", { name: "You Receive" })).toHaveValue(
          PREVIEW_RESPONSE.estimatedReceive,
        );
      },
      { timeout: 3000 },
    );
  });

  it("recalculates the send amount when typing into the receive field", async () => {
    const user = userEvent.setup();
    renderWidget();
    await findCurrencyTriggers();

    await user.type(
      screen.getByRole("textbox", { name: "You Receive" }),
      "0.5",
    );

    await waitFor(
      () => {
        expect(screen.getByRole("textbox", { name: "You send" })).toHaveValue(
          PREVIEW_RESPONSE.estimatedGive,
        );
      },
      { timeout: 3000 },
    );
  });

  it("ignores non-numeric input", async () => {
    const user = userEvent.setup();
    renderWidget();
    await findCurrencyTriggers();

    const sendInput = screen.getByRole("textbox", { name: "You send" });
    await user.type(sendInput, "abc");

    expect(sendInput).toHaveValue("");
  });

  it("swaps the tokens (not the amounts) via the swap button", async () => {
    const user = userEvent.setup();
    renderWidget();

    const { fromTrigger, toTrigger } = await findCurrencyTriggers();
    await waitFor(() => {
      expect(within(fromTrigger).getByText("USDT")).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole("button", { name: "Change direction" }),
    );

    expect(within(fromTrigger).getByText("BTC")).toBeInTheDocument();
    expect(within(toTrigger).getByText("USDT")).toBeInTheDocument();
  });

  it("keeps the confirm button disabled until a successful preview", async () => {
    const user = userEvent.setup();
    renderWidget();
    await findCurrencyTriggers();

    const confirmButton = screen.getByRole("button", { name: "Next" });
    expect(confirmButton).toBeDisabled();

    await user.type(screen.getByRole("textbox", { name: "You send" }), "100");

    await waitFor(
      () => {
        expect(confirmButton).toBeEnabled();
      },
      { timeout: 3000 },
    );
  });

  it("shows the confirmation modal with the exchanged amounts", async () => {
    const user = userEvent.setup();
    renderWidget();
    await findCurrencyTriggers();

    await user.type(screen.getByRole("textbox", { name: "You send" }), "100");
    await waitFor(
      () => {
        expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
      },
      { timeout: 3000 },
    );

    await user.click(screen.getByRole("button", { name: "Next" }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent(
      "You have successfully exchanged 100 USDT → 0.00155233 BTC",
    );
  });

  it("closes the modal and resets the form on OK", async () => {
    const user = userEvent.setup();
    renderWidget();
    await findCurrencyTriggers();

    await user.type(screen.getByRole("textbox", { name: "You send" }), "100");
    await waitFor(
      () => {
        expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
      },
      { timeout: 3000 },
    );
    await user.click(screen.getByRole("button", { name: "Next" }));
    await screen.findByRole("dialog");

    await user.click(screen.getByRole("button", { name: "OK" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(screen.getByRole("textbox", { name: "You send" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "You Receive" })).toHaveValue(
      "",
    );
  });

  it("clears both inputs when a token is changed", async () => {
    const user = userEvent.setup();
    renderWidget();

    const { fromTrigger } = await findCurrencyTriggers();
    await waitFor(() => {
      expect(within(fromTrigger).getByText("USDT")).toBeInTheDocument();
    });

    await user.type(screen.getByRole("textbox", { name: "You send" }), "100");
    await waitFor(
      () => {
        expect(screen.getByRole("textbox", { name: "You Receive" })).toHaveValue(
          PREVIEW_RESPONSE.estimatedReceive,
        );
      },
      { timeout: 3000 },
    );

    await user.click(fromTrigger);
    await user.click((await screen.findAllByRole("option"))[1]);

    expect(screen.getByRole("textbox", { name: "You send" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "You Receive" })).toHaveValue("");
  });
});
