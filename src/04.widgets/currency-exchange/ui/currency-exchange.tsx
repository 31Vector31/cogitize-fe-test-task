"use client";

import { useSwapForm } from "@/05.features";
import { useTranslations } from "next-intl";
import CurrencyField from "./currency-field";
import SwapConfirmationModal from "./swap-confirmation-modal";
import SwapDirectionButton from "./swap-direction-button";

const CurrencyExchange = () => {
  const t = useTranslations("swap");
  const {
    fromCurrency,
    toCurrency,
    selectFromCurrency,
    selectToCurrency,
    swapPair,
    sendAmount,
    receiveAmount,
    changeSendAmount,
    changeReceiveAmount,
    isCalculating,
    isPreviewError,
    isConfirmEnabled,
    confirmation,
    confirmSwap,
    closeConfirmation,
  } = useSwapForm();

  return (
    <section className="flex w-full max-w-[500px] flex-col gap-8 rounded-3xl bg-[#1d1d1d] p-6 tablet:p-10">
      <div className="flex w-full flex-col gap-3">
        <h2 className="text-xl font-medium leading-[1.2] text-[#f1f1f1]">
          {t("selectCryptocurrency")}
        </h2>
        <div className="flex w-full flex-col gap-1 rounded-[20px] border border-[#272727] p-5">
          <CurrencyField
            label={t("youSend")}
            value={fromCurrency}
            onChange={selectFromCurrency}
            amount={sendAmount}
            onAmountChange={changeSendAmount}
            isCalculating={isCalculating}
          />
          <div className="relative flex h-11 w-full items-center">
            <span className="h-px w-full bg-[#272727]" />
            <div className="absolute right-5 top-0">
              <SwapDirectionButton
                label={t("changeDirection")}
                onClick={swapPair}
              />
            </div>
          </div>
          <CurrencyField
            label={t("youReceive")}
            value={toCurrency}
            onChange={selectToCurrency}
            amount={receiveAmount}
            onAmountChange={changeReceiveAmount}
            isCalculating={isCalculating}
          />
        </div>
        {isPreviewError && (
          <p role="alert" className="text-sm leading-[18px] text-[#ff6b6b]">
            {t("previewError")}
          </p>
        )}
      </div>
      <button
        type="button"
        disabled={!isConfirmEnabled}
        onClick={confirmSwap}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#05d533] px-6 py-2.5
        text-base font-medium leading-5 text-[#050505] shadow-[inset_0_2px_4px_0_rgba(238,255,241,0.25)]
        transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t("next")}
      </button>
      <SwapConfirmationModal
        confirmation={confirmation}
        onClose={closeConfirmation}
      />
    </section>
  );
};

export default CurrencyExchange;
