"use client";

import { CurrencyIcon, type Currency } from "@/06.entities";

type CurrencyOptionProps = {
  currency: Currency;
  isSelected: boolean;
  onSelect: (currency: Currency) => void;
};

const CurrencyOption = ({
  currency,
  isSelected,
  onSelect,
}: CurrencyOptionProps) => {
  return (
    <li className="border-b border-[#f1f1f1] first:*:pt-0">
      <button
        type="button"
        role="option"
        aria-selected={isSelected}
        onClick={() => onSelect(currency)}
        className="flex w-full cursor-pointer items-center gap-3 pb-2 pt-3 text-base font-medium leading-6 text-[#050505] transition-colors hover:bg-[#f1f1f1]"
      >
        <CurrencyIcon currency={currency} />
        <span className="truncate">{currency.symbol}</span>
      </button>
    </li>
  );
};

export default CurrencyOption;
