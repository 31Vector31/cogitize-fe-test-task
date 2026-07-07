"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LandingHeader from "./landing-header";
import MarqueeLine from "./marquee-line";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const heroImage: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const smiley: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 14, delay: 0.9 },
  },
};

const note: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: 1.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const LandingCover = () => {
  const t = useTranslations("landing");

  return (
    <section className="relative flex min-h-svh w-full flex-col overflow-hidden bg-[#fefefe]">
      <LandingHeader />
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex w-full flex-1 flex-col items-center justify-center px-4 pb-20 pt-28"
      >
        <div className="relative w-full max-w-[1097px]">
          <motion.div variants={heroImage}>
            <Image
              src="/images/landing/phase-hero.png"
              alt="PHASE"
              width={2016}
              height={512}
              priority
              className="h-auto w-full"
            />
          </motion.div>
          <motion.div
            variants={smiley}
            className="absolute left-[0.8%] top-[3%] w-[8.6%]"
          >
            <Image
              src="/images/landing/smiley.svg"
              alt=""
              width={94}
              height={75}
              className="h-auto w-full"
            />
          </motion.div>
          <motion.div
            variants={note}
            className="absolute -top-[45px] right-0 h-[23px] w-[186px]
            tablet:-top-[37px] tablet:right-[4%] tablet:h-[34px] tablet:w-[240px]"
          >
            <Image
              src="/images/landing/note-stroke.svg"
              alt=""
              width={234}
              height={35}
              className="absolute left-1/2 top-1/2 h-auto w-[98%] -translate-x-1/2 -translate-y-1/2 rotate-[4.62deg]"
            />
            <p className="absolute inset-0 flex items-center justify-center text-base font-medium leading-5 text-[#fefefe] tablet:text-[20px] tablet:leading-6">
              {t("note")}
            </p>
          </motion.div>
        </div>
        <motion.p
          variants={fadeUp}
          className="mt-4 px-4 text-center text-[20px] font-medium leading-6 text-[#181818]"
        >
          {t("tagline")}
        </motion.p>
        <motion.button
          type="button"
          variants={fadeUp}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-6 flex cursor-pointer items-center gap-3 rounded-lg bg-[#ffd000] px-5 py-[9px]"
        >
          <Image
            src="/images/landing/arrow-reply.svg"
            alt=""
            width={24}
            height={24}
            className="rotate-180"
          />
          <span className="text-base font-medium leading-5 text-[#050505]">
            {t("cta")}
          </span>
        </motion.button>
      </motion.div>
      <MarqueeLine />
    </section>
  );
};

export default LandingCover;
