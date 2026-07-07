import { useCurrencyBySymbolQuery, type Currency } from "@/06.entities";
import { useEffect, useRef, useState } from "react";

const DEFAULT_FROM_SYMBOL = "USDT";
const DEFAULT_TO_SYMBOL = "BTC";

export const useSwapPair = () => {
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);
  const fromTouchedRef = useRef(false);
  const toTouchedRef = useRef(false);

  const { data: defaultFrom } = useCurrencyBySymbolQuery(DEFAULT_FROM_SYMBOL);
  const { data: defaultTo } = useCurrencyBySymbolQuery(DEFAULT_TO_SYMBOL);

  useEffect(() => {
    if (defaultFrom && !fromTouchedRef.current) {
      setFromCurrency(defaultFrom);
    }
  }, [defaultFrom]);

  useEffect(() => {
    if (defaultTo && !toTouchedRef.current) {
      setToCurrency(defaultTo);
    }
  }, [defaultTo]);

  const selectFromCurrency = (currency: Currency) => {
    fromTouchedRef.current = true;
    setFromCurrency(currency);
  };

  const selectToCurrency = (currency: Currency) => {
    toTouchedRef.current = true;
    setToCurrency(currency);
  };

  const swapPair = () => {
    fromTouchedRef.current = true;
    toTouchedRef.current = true;
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return {
    fromCurrency,
    toCurrency,
    selectFromCurrency,
    selectToCurrency,
    swapPair,
  };
};
