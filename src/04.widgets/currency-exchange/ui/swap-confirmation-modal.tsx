"use client";

import type { SwapConfirmation } from "@/05.features";
import { Modal } from "@/07.shared";
import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";

type SwapConfirmationModalProps = {
  confirmation: SwapConfirmation | null;
  onClose: () => void;
};

const SwapConfirmationModal = ({
  confirmation,
  onClose,
}: SwapConfirmationModalProps) => {
  const t = useTranslations("swap");

  return (
    <Modal isOpen={confirmation !== null} onClose={onClose}>
      {confirmation && (
        <div className="flex flex-col items-center gap-6 text-center">
          <CircleCheck className="size-12 text-[#05d533]" />
          <p className="text-base leading-6 text-[#f1f1f1]">
            {t("swapSuccess", {
              fromAmount: confirmation.fromAmount,
              fromSymbol: confirmation.fromSymbol,
              toAmount: confirmation.toAmount,
              toSymbol: confirmation.toSymbol,
            })}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#05d533] px-6 py-2.5
            text-base font-medium leading-5 text-[#050505] shadow-[inset_0_2px_4px_0_rgba(238,255,241,0.25)]
            transition-opacity hover:opacity-90"
          >
            {t("ok")}
          </button>
        </div>
      )}
    </Modal>
  );
};

export default SwapConfirmationModal;
