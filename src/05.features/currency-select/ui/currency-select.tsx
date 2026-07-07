"use client";

import { CurrencyIcon, type Currency } from "@/06.entities";
import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCurrencySelect } from "../model";
import CurrencyDropdown from "./currency-dropdown";

type CurrencySelectProps = {
  value: Currency | null;
  onChange: (currency: Currency) => void;
};

const CurrencySelect = ({ value, onChange }: CurrencySelectProps) => {
  const t = useTranslations("swap");
  const {
    isOpen,
    toggleDropdown,
    rootRef,
    query,
    setQuery,
    currencies,
    isLoading,
    isLoadingMore,
    isError,
    loadMore,
    selectCurrency,
    retry,
  } = useCurrencySelect({ onChange });

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={t("selectCurrency")}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={toggleDropdown}
        className="flex cursor-pointer items-center gap-3"
      >
        {value ? (
          <>
            <CurrencyIcon currency={value} />
            <span className="flex flex-col items-start justify-center gap-1">
              <span className="flex items-center gap-2 text-2xl font-semibold leading-[1.24] text-[#f1f1f1]">
                {value.symbol}
                <ChevronDown
                  className={`size-6 text-[#f1f1f1] transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </span>
              <span className="max-w-[140px] truncate text-sm leading-[18px] text-[#d1d1d1]">
                {value.name}
              </span>
            </span>
          </>
        ) : (
          <span aria-hidden className="flex animate-pulse items-center gap-3">
            <span className="size-6 rounded-full bg-[#272727]" />
            <span className="flex flex-col gap-2">
              <span className="h-[18px] w-16 rounded bg-[#272727]" />
              <span className="h-3 w-10 rounded bg-[#272727]" />
            </span>
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <CurrencyDropdown
            query={query}
            onQueryChange={setQuery}
            currencies={currencies}
            selectedId={value?.id ?? null}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            isError={isError}
            onLoadMore={loadMore}
            onSelect={selectCurrency}
            onRetry={retry}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrencySelect;
