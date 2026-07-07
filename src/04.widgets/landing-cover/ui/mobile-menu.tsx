"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

const NAV_KEYS = ["home", "howItWorks", "features", "forWhom"] as const;

const list: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const listItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const script: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 240, damping: 15, delay: 0.55 },
  },
};

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const t = useTranslations("landing");

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex h-dvh flex-col overflow-y-auto bg-[#fefefe] px-5 laptop:hidden"
        >
          <div className="flex items-center justify-between py-4">
            <div className="flex h-[42px] items-center justify-center rounded-lg bg-[#efeeed]/40 px-4">
              <span className="text-xl font-bold text-black">PHASE</span>
            </div>
            <button
              type="button"
              aria-label={t("closeMenu")}
              onClick={onClose}
              className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-lg
              bg-[#efeeed]/40 transition-colors hover:bg-[#efeeed]"
            >
              <X size={24} className="text-[#050505]" />
            </button>
          </div>
          <motion.nav
            variants={list}
            initial="hidden"
            animate="visible"
            className="relative mt-[88px] flex flex-col gap-[25px]"
          >
            {NAV_KEYS.map((key, index) => (
              <motion.button
                key={key}
                type="button"
                variants={listItem}
                onClick={onClose}
                className="flex cursor-pointer items-start gap-4 border-b border-[#b3b3b3] pb-4"
              >
                <span className="text-[40px] font-medium leading-none tracking-[-1.2px] text-[#050505]">
                  {t(`nav.${key}`)}
                </span>
                <span className="text-base font-medium leading-none tracking-[-0.48px] text-[#bf57f3]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.button>
            ))}
            <motion.div
              variants={script}
              className="pointer-events-none absolute -bottom-9 left-[calc(50%+14px)] w-[113px]"
            >
              <Image
                src="/images/landing/start-wishing.svg"
                alt=""
                width={113}
                height={67}
                className="h-auto w-full"
              />
            </motion.div>
          </motion.nav>
          <motion.div
            variants={list}
            initial="hidden"
            animate="visible"
            className="mb-10 mt-auto flex flex-col gap-[15px] pt-24"
          >
            <motion.button
              type="button"
              variants={listItem}
              whileTap={{ scale: 0.97 }}
              className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#ffd000] px-5 py-[9px]"
            >
              <Image
                src="/images/landing/arrow-reply.svg"
                alt=""
                width={24}
                height={24}
                className="rotate-180"
              />
              <span className="text-base font-medium leading-5 text-[#050505]">
                {t("menuCta")}
              </span>
            </motion.button>
            <motion.button
              type="button"
              variants={listItem}
              whileTap={{ scale: 0.97 }}
              className="flex h-[42px] w-full cursor-pointer items-center justify-center rounded-lg border
              border-[#050505] text-base font-medium leading-5 text-[#050505] transition-colors hover:bg-[#050505]/5"
            >
              {t("logIn")}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
