import { useCurrenciesInfiniteQuery, type Currency } from "@/06.entities";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebouncedValue } from "./use-debounced-value";

const SEARCH_DEBOUNCE_MS = 400;

type UseCurrencySelectParams = {
  onChange: (currency: Currency) => void;
};

export const useCurrencySelect = ({ onChange }: UseCurrencySelectParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query.trim(), SEARCH_DEBOUNCE_MS);
  const rootRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useCurrenciesInfiniteQuery(debouncedQuery, { skip: !isOpen });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const currencies = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectCurrency = (currency: Currency) => {
    onChange(currency);
    setIsOpen(false);
    setQuery("");
  };

  const loadMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  return {
    isOpen,
    toggleDropdown,
    rootRef,
    query,
    setQuery,
    currencies,
    isLoading,
    isLoadingMore: isFetching && !isLoading,
    isError,
    hasNextPage,
    loadMore,
    selectCurrency,
    retry: refetch,
  };
};
