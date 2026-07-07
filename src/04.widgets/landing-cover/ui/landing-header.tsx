"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import MobileMenu from "./mobile-menu";

const NAV_KEYS = ["home", "howItWorks", "features", "forWhom"] as const;

const LandingHeader = () => {
  const t = useTranslations("landing");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-40"
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-4 tablet:px-20 tablet:py-6">
          <div className="flex h-[42px] items-center justify-center rounded-lg bg-[#efeeed]/40 px-4 backdrop-blur-sm">
            <span className="text-xl font-bold text-black">PHASE</span>
          </div>
          <nav className="hidden items-center laptop:flex">
            {NAV_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className="cursor-pointer rounded-lg bg-[#efeeed]/40 px-4 py-3 text-sm font-medium leading-[18px]
                text-[#181818] backdrop-blur-sm transition-colors hover:bg-[#efeeed]"
              >
                {t(`nav.${key}`)}
              </button>
            ))}
          </nav>
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden h-[42px] cursor-pointer items-center justify-center rounded-lg border border-[#050505] px-5
            text-base font-medium leading-5 text-[#050505] transition-colors hover:bg-[#050505]/5 laptop:flex"
          >
            {t("logIn")}
          </motion.button>
          <button
            type="button"
            aria-label={t("openMenu")}
            onClick={() => setIsMenuOpen(true)}
            className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-lg bg-[#efeeed]/40
            backdrop-blur-sm transition-colors hover:bg-[#efeeed] laptop:hidden"
          >
            <Menu size={24} className="text-[#050505]" />
          </button>
        </div>
      </motion.header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default LandingHeader;
