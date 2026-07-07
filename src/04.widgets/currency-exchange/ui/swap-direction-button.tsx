"use client";

import { ArrowDownUp } from "lucide-react";

type SwapDirectionButtonProps = {
  label: string;
  onClick: () => void;
};

const SwapDirectionButton = ({ label, onClick }: SwapDirectionButtonProps) => {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-[#272727]
      bg-[#272727] transition-opacity hover:opacity-80"
    >
      <ArrowDownUp className="size-6 text-[#05d533]" />
    </button>
  );
};

export default SwapDirectionButton;
