import {
  useSwapPreviewQuery,
  type Currency,
  type SwapDirection,
} from "@/06.entities";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useSwapPair } from "./use-swap-pair";
import { useThrottledValue } from "./use-throttled-value";

const PREVIEW_THROTTLE_MS = 600;
const AMOUNT_PATTERN = /^\d*\.?\d*$/;
const AMOUNT_MAX_LENGTH = 20;

export type SwapConfirmation = {
  fromSymbol: string;
  fromAmount: string;
  toSymbol: string;
  toAmount: string;
};

export const useSwapForm = () => {
  const pair = useSwapPair();
  const { fromCurrency, toCurrency } = pair;

  const [amount, setAmount] = useState("");
  const [direction, setDirection] = useState<SwapDirection>("from");
  const [confirmation, setConfirmation] = useState<SwapConfirmation | null>(
    null,
  );

  const throttledAmount = useThrottledValue(amount, PREVIEW_THROTTLE_MS);
  const canPreview = Number(throttledAmount) > 0;

  const {
    data: preview,
    isFetching: isPreviewFetching,
    isError: isPreviewError,
  } = useSwapPreviewQuery(
    fromCurrency && toCurrency && canPreview
      ? {
          fromAssetId: fromCurrency.id,
          toAssetId: toCurrency.id,
          direction,
          amount: throttledAmount,
          balanceType: ["main", "trade"],
        }
      : skipToken,
  );

  const changeAmount = (nextDirection: SwapDirection) => (value: string) => {
    const normalized = value.replace(",", ".").trim();
    if (
      normalized.length > AMOUNT_MAX_LENGTH ||
      !AMOUNT_PATTERN.test(normalized)
    ) {
      return;
    }
    setDirection(nextDirection);
    setAmount(normalized);
  };

  const selectFromCurrency = (currency: Currency) => {
    setAmount("");
    pair.selectFromCurrency(currency);
  };

  const selectToCurrency = (currency: Currency) => {
    setAmount("");
    pair.selectToCurrency(currency);
  };

  const isConfirmEnabled =
    canPreview && !isPreviewFetching && !isPreviewError && preview !== undefined;

  const confirmSwap = () => {
    if (!isConfirmEnabled || !fromCurrency || !toCurrency || !preview) {
      return;
    }
    setConfirmation({
      fromSymbol: fromCurrency.symbol,
      fromAmount: preview.estimatedGive,
      toSymbol: toCurrency.symbol,
      toAmount: preview.estimatedReceive,
    });
  };

  const closeConfirmation = () => {
    setConfirmation(null);
    setAmount("");
  };

  const hasAmount = Number(amount) > 0;
  const sendAmount =
    direction === "from"
      ? amount
      : hasAmount
        ? (preview?.estimatedGive ?? "")
        : "";
  const receiveAmount =
    direction === "to"
      ? amount
      : hasAmount
        ? (preview?.estimatedReceive ?? "")
        : "";

  return {
    fromCurrency,
    toCurrency,
    selectFromCurrency,
    selectToCurrency,
    swapPair: pair.swapPair,
    sendAmount,
    receiveAmount,
    changeSendAmount: changeAmount("from"),
    changeReceiveAmount: changeAmount("to"),
    isCalculating: hasAmount && (isPreviewFetching || amount !== throttledAmount),
    isPreviewError: canPreview && isPreviewError,
    isConfirmEnabled,
    confirmation,
    confirmSwap,
    closeConfirmation,
  };
};
