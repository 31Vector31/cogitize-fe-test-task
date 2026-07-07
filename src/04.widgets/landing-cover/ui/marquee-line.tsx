"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

const GROUP_REPEATS = 6;
const MARQUEE_DURATION_S = 45;

const Separator = () => {
  return <span aria-hidden className="h-[18px] w-px shrink-0 bg-[#bf57f3]" />;
};

const MarqueeLine = () => {
  const t = useTranslations("landing");

  return (
    <div className="w-full overflow-hidden border-t border-[#bf57f3]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: MARQUEE_DURATION_S,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex w-max items-center gap-4 p-3"
      >
        {Array.from({ length: GROUP_REPEATS }).map((_, index) => (
          <Fragment key={index}>
            <span
              aria-hidden={index > 0}
              className="shrink-0 text-sm font-medium text-[#bf57f3] whitespace-nowrap"
            >
              {t("marquee.identity")}
            </span>
            <span
              aria-hidden={index > 0}
              className="shrink-0 rounded border border-dashed border-[#bf57f3] p-1 text-sm font-medium
              text-[#bf57f3] whitespace-nowrap"
            >
              100%
            </span>
            <Separator />
            <span
              aria-hidden={index > 0}
              className="shrink-0 text-sm font-medium text-[#bf57f3] whitespace-nowrap"
            >
              {t("marquee.freeForever")}
            </span>
            <Separator />
            <span
              aria-hidden={index > 0}
              className="shrink-0 text-sm font-medium text-[#bf57f3] whitespace-nowrap"
            >
              {t("marquee.share")}
            </span>
            <Separator />
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeLine;
