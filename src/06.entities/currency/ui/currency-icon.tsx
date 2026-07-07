import Image from "next/image";
import type { Currency } from "../model";

type CurrencyIconProps = {
  currency: Currency;
};

const CurrencyIcon = ({ currency }: CurrencyIconProps) => {
  return (
    <Image
      src={currency.assetImage}
      alt={currency.symbol}
      width={24}
      height={24}
      className="size-6 shrink-0 rounded-full"
    />
  );
};

export default CurrencyIcon;
