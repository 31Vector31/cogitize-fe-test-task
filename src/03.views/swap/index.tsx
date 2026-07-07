import { CurrencyExchange } from "@/04.widgets";
import { useTranslations } from "next-intl";
import { Roboto } from "next/font/google";

const ROBOTO = Roboto({
  weight: "700",
  subsets: ["latin", "cyrillic"],
});

const SwapView = () => {
  const t = useTranslations("swap");

  return (
    <main className="flex min-h-dvh w-full flex-col items-center bg-white px-4 pb-16 pt-16 tablet:pt-[124px]">
      <h1
        className={`${ROBOTO.className} text-center text-[40px] font-bold leading-[1.2] text-[#050505] tablet:text-[58px]`}
      >
        {t("title")}
      </h1>
      <div className="mt-12 flex w-full justify-center tablet:mt-24">
        <CurrencyExchange />
      </div>
    </main>
  );
};

export default SwapView;
