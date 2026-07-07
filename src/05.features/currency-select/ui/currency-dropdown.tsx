"use client";

import type { Currency } from "@/06.entities";
import { motion } from "framer-motion";
import { Loader2, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UIEvent } from "react";
import CurrencyOption from "./currency-option";

const LOAD_MORE_THRESHOLD_PX = 48;

type CurrencyDropdownProps = {
  query: string;
  onQueryChange: (query: string) => void;
  currencies: Currency[];
  selectedId: number | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  isError: boolean;
  onLoadMore: () => void;
  onSelect: (currency: Currency) => void;
  onRetry: () => void;
};

const CurrencyDropdown = ({
  query,
  onQueryChange,
  currencies,
  selectedId,
  isLoading,
  isLoadingMore,
  isError,
  onLoadMore,
  onSelect,
  onRetry,
}: CurrencyDropdownProps) => {
  const t = useTranslations("swap");

  const handleScroll = (event: UIEvent<HTMLUListElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < LOAD_MORE_THRESHOLD_PX) {
      onLoadMore();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="absolute -left-5 top-[calc(100%+12px)] z-20 flex w-[232px] flex-col overflow-hidden rounded-xl border border-[#d1d1d1] bg-[#f9f9f9] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]"
    >
      <div className="border-b border-[#d1d1d1] px-3 pb-2 pt-3">
        <label className="flex h-10 w-full items-center gap-2 rounded-lg border border-[#d1d1d1] bg-[#f9f9f9] px-3 py-2 shadow-[inset_0_2px_4px_0_rgba(238,255,241,0.25)]">
          <Search className="size-5 shrink-0 text-[#b0b0b0]" />
          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={t("searchCoins")}
            className="min-w-0 flex-1 bg-transparent text-base leading-6 text-[#050505] outline-none placeholder:text-[#b0b0b0]"
          />
        </label>
      </div>

      {isLoading && (
        <div
          aria-label={t("loading")}
          className="flex h-60 items-center justify-center"
        >
          <Loader2 className="size-6 animate-spin text-[#b0b0b0]" />
        </div>
      )}

      {isError && !isLoading && (
        <div className="flex h-60 flex-col items-center justify-center gap-3 px-3 text-center">
          <p className="text-sm leading-[18px] text-[#b0b0b0]">
            {t("loadingError")}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="cursor-pointer rounded-lg bg-[#05d533] px-4 py-1.5 text-sm font-medium leading-5 text-[#050505] transition-opacity hover:opacity-90"
          >
            {t("retry")}
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <ul
          role="listbox"
          onScroll={handleScroll}
          className="h-60 overflow-y-auto pl-3 pr-1 pt-2 [scrollbar-color:#d1d1d1_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-[#d1d1d1] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1"
        >
          {currencies.map((currency) => (
            <CurrencyOption
              key={currency.id}
              currency={currency}
              isSelected={currency.id === selectedId}
              onSelect={onSelect}
            />
          ))}
          {currencies.length === 0 && (
            <li className="py-3 text-center text-sm leading-[18px] text-[#b0b0b0]">
              {t("noResults")}
            </li>
          )}
          {isLoadingMore && (
            <li
              aria-label={t("loading")}
              className="flex justify-center py-2"
            >
              <Loader2 className="size-5 animate-spin text-[#b0b0b0]" />
            </li>
          )}
        </ul>
      )}
    </motion.div>
  );
};

export default CurrencyDropdown;
