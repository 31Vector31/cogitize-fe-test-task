import { CurrencySelect } from "@/05.features";
import type { Currency } from "@/06.entities";

type CurrencyFieldProps = {
  label: string;
  value: Currency | null;
  onChange: (currency: Currency) => void;
  amount: string;
  onAmountChange: (value: string) => void;
  isCalculating?: boolean;
};

const CurrencyField = ({
  label,
  value,
  onChange,
  amount,
  onAmountChange,
  isCalculating = false,
}: CurrencyFieldProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-sm leading-[18px] text-[#d1d1d1]">{label}</p>
      <div className="flex w-full items-start justify-between gap-3">
        <CurrencySelect value={value} onChange={onChange} />
        <input
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="0"
          aria-label={label}
          value={amount}
          onChange={(event) => onAmountChange(event.target.value)}
          className={`min-w-0 flex-1 bg-transparent text-right text-2xl font-semibold leading-[1.24] text-[#f1f1f1]
          outline-none placeholder:text-[#6b6b6b] ${isCalculating ? "animate-pulse" : ""}`}
        />
      </div>
    </div>
  );
};

export default CurrencyField;
