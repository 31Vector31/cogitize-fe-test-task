"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { BenefitRowConfig } from "./benefits-config";

type BenefitRowProps = {
  row: BenefitRowConfig;
  isRowActive: boolean;
  isStaticallyDecorated: boolean;
  onHover: () => void;
  onLeave: () => void;
};

const BenefitRow = ({
  row,
  isRowActive,
  isStaticallyDecorated,
  onHover,
  onLeave,
}: BenefitRowProps) => {
  const t = useTranslations("landing");
  const isDecorated = isStaticallyDecorated || isRowActive;

  return (
    <div
      data-active={isRowActive}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative overflow-hidden tablet:border-t tablet:border-[#242424] tablet:first:border-t-0"
    >
      <motion.div
        initial={false}
        animate={{ opacity: isDecorated ? 1 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={row.photoSrc}
          alt=""
          fill
          sizes="100vw"
          className={row.photoClassName}
        />
        <Image
          src={row.overlayMobileSrc}
          alt=""
          fill
          sizes="100vw"
          className="object-fill tablet:hidden"
        />
        <Image
          src={row.overlaySrc}
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover tablet:block"
        />
      </motion.div>

      <div
        className="relative flex flex-col items-center justify-center gap-3 px-5 py-6 text-center
        tablet:h-[129px] tablet:flex-row tablet:justify-between tablet:gap-6 tablet:px-20 tablet:text-left"
      >
        <p className="order-2 max-w-[300px] text-base font-medium leading-5 text-[#f4f4f4] tablet:hidden">
          {t(`benefits.${row.key}.descriptionMobile`)}
        </p>
        <p className="hidden font-medium text-[#f4f4f4] tablet:block tablet:w-[268px] tablet:text-[20px] tablet:leading-6">
          {t(`benefits.${row.key}.description`)}
        </p>
        <p
          className={`order-1 text-center text-[40px] font-bold leading-[44px] transition-colors duration-300
          tablet:order-none tablet:leading-none ${isRowActive ? "text-[#ffd000]" : "text-[#fefefe]"}`}
        >
          {t(`benefits.${row.key}.title`)}
        </p>
        <div className="order-3 flex h-7 items-center justify-center tablet:order-none tablet:w-[268px] tablet:justify-end tablet:pr-1">
          <span className="relative inline-flex items-center px-1">
            <motion.span
              initial={false}
              animate={{
                opacity: isDecorated ? 1 : 0,
                scale: isDecorated ? 1 : 0.7,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[26px] w-[calc(100%+28px)] -translate-x-1/2 -translate-y-1/2
              tablet:h-[36px] tablet:w-[calc(100%+58px)]"
            >
              <Image
                src="/images/landing/benefits/pill.svg"
                alt=""
                fill
                className="rotate-[6.16deg]"
              />
            </motion.span>
            <span
              aria-hidden
              className={`absolute inset-0 hidden bg-[#464646] transition-opacity duration-300 tablet:block ${
                isDecorated ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`relative text-base font-normal leading-5 transition-colors duration-300
              tablet:text-[20px] tablet:font-medium tablet:leading-6 ${
                isDecorated ? "text-[#fefefe]" : "text-[#181818]"
              }`}
            >
              {t(`benefits.${row.key}.tag`)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BenefitRow;
