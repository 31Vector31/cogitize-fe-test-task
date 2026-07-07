"use client";

import { RevealWords, useMediaQuery } from "@/07.shared";
import { motion, useInView, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { useStepRotation } from "../model";
import StepCard from "./step-card";
import {
  MOBILE_STEP_ROTATION_MS,
  STEP_ROTATION_MS,
  STEPS,
} from "./steps-config";

const tag: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 240, damping: 15, delay: 0.85 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const LandingSteps = () => {
  const t = useTranslations("landing");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });
  const isMobile = useMediaQuery("(max-width: 767px)");
  const intervalMs = isMobile ? MOBILE_STEP_ROTATION_MS : STEP_ROTATION_MS;
  const { currentStep, cycle, selectStep } = useStepRotation({
    stepsCount: STEPS.length,
    intervalMs,
    isActive: isInView,
  });

  return (
    <section className="relative overflow-hidden bg-[#181818]">
      <motion.div
        ref={sectionRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-5 pb-9 pt-10
        laptop:flex-row laptop:items-start laptop:justify-between laptop:px-20 laptop:py-[100px]"
      >
        <div className="relative w-full max-w-[335px] shrink-0 laptop:mt-[132px] laptop:w-[620px] laptop:max-w-none">
          <h2
            className="text-center text-[clamp(58px,8.5vw,122px)] font-extrabold uppercase leading-[0.9]
            text-[#fefefe] laptop:text-left"
          >
            <RevealWords text={t("steps.title")} baseDelay={0.1} />
          </h2>
          <motion.div
            variants={tag}
            className="pointer-events-none absolute left-[calc(50%-26px)] top-[33px] w-[123px]
            laptop:left-[120px] laptop:top-[203px] laptop:w-[159px]"
          >
            <Image
              src="/images/landing/steps/tag-line.svg"
              alt=""
              width={154}
              height={44}
              className="h-auto w-full rotate-[7.77deg]"
            />
            <p className="absolute inset-0 flex items-center justify-center text-base font-medium leading-5 text-[#fefefe] laptop:text-[20px] laptop:leading-6">
              {t("steps.tag")}
            </p>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={0.35} className="shrink-0">
          <StepCard
            currentStep={currentStep}
            cycle={cycle}
            intervalMs={intervalMs}
            isRotating={isInView}
            onSelectStep={selectStep}
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={0.55}
          className="flex max-w-[301px] flex-col gap-2 text-center laptop:mt-[95px] laptop:w-[195px]
          laptop:gap-3 laptop:text-left"
        >
          <p className="text-[20px] font-medium leading-6 text-[#fefefe]">
            {t("steps.asideTitle")}
          </p>
          <p className="text-base font-normal leading-5 text-[#fefefe]">
            {t("steps.asideText")}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LandingSteps;
