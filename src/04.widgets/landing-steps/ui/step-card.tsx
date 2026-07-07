"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { STEPS, type StepSticker } from "./steps-config";

const SWIPE_THRESHOLD = 50;

type StepCardProps = {
  currentStep: number;
  cycle: number;
  intervalMs: number;
  isRotating: boolean;
  onSelectStep: (step: number) => void;
};

const Sticker = ({ sticker, delay }: { sticker: StepSticker; delay: number }) => {
  return (
    <div
      className={`pointer-events-none absolute flex items-center justify-center ${sticker.frameClassName}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ type: "spring", stiffness: 260, damping: 17, delay }}
        className={`relative w-[93%] ${sticker.rotateClassName}`}
      >
        <Image
          src={sticker.outerSrc}
          alt=""
          width={160}
          height={84}
          className="h-auto w-full"
        />
        <Image
          src={sticker.innerSrc}
          alt=""
          width={152}
          height={77}
          className="absolute left-1/2 top-1/2 h-auto w-[95.3%] -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
    </div>
  );
};

const StepCard = ({
  currentStep,
  cycle,
  intervalMs,
  isRotating,
  onSelectStep,
}: StepCardProps) => {
  const t = useTranslations("landing");
  const step = STEPS[currentStep];

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      onSelectStep((currentStep + 1) % STEPS.length);
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      onSelectStep((currentStep - 1 + STEPS.length) % STEPS.length);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={handleDragEnd}
      className="relative h-[445px] w-[335px] cursor-grab touch-pan-y border-[5px] border-b-[20px] border-solid
      border-[#fefefe] transition-colors duration-500 active:cursor-grabbing tablet:h-[635px] tablet:w-[431px]"
      style={{ backgroundColor: step.background }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={step.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {step.patternRects.map((rect, index) => (
              <div
                key={index}
                className="absolute"
                style={{ ...rect, backgroundColor: step.patternColor }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative flex flex-col gap-4 p-[15px] tablet:gap-3">
        <div className="flex w-full items-center gap-3">
          {STEPS.map((item, index) => (
            <button
              key={item.key}
              type="button"
              aria-label={t("steps.goToStep", { number: index + 1 })}
              aria-current={index === currentStep}
              onClick={() => onSelectStep(index)}
              className="relative h-[5px] flex-1 cursor-pointer overflow-hidden rounded-[20px] bg-[#fefefe]"
            >
              {index < currentStep && (
                <span className="absolute inset-0 rounded-[20px] bg-[#464646]" />
              )}
              {index === currentStep &&
                (isRotating ? (
                  <motion.span
                    key={`${cycle}-${currentStep}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: intervalMs / 1000,
                      ease: "linear",
                    }}
                    className="absolute inset-0 origin-left rounded-[20px] bg-[#464646]"
                  />
                ) : (
                  <span className="absolute inset-0 rounded-[20px] bg-[#464646]" />
                ))}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#0c0c0c]">
            <Image
              src="/images/landing/steps/gifty-logo.png"
              alt=""
              width={34}
              height={8}
              className="h-auto w-[34px]"
            />
          </span>
          <span className="text-[20px] font-medium leading-6 text-[#050505]">
            {t("steps.brand")}
          </span>
        </div>
      </div>

      <div className="absolute left-[15px] right-[15px] top-[182px] tablet:top-[275px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <p className="text-base font-medium leading-5 text-[#181818] tablet:text-[20px] tablet:leading-6">
              {`0${currentStep + 1}`}
            </p>
            <h3
              className="mt-4 max-w-[346px] text-[28px] font-medium leading-8 tracking-[-0.03em] text-[#050505]
              tablet:text-[44px] tablet:leading-[48px]"
            >
              {t(`steps.${step.key}.title`)}
            </h3>
            <p className="mt-6 text-[20px] font-normal leading-6 text-[#181818] tablet:mt-10 tablet:text-[24px] tablet:leading-7">
              {t(`steps.${step.key}.text`)}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {step.stickers.map((sticker, index) => (
          <Sticker
            key={`${step.key}-${sticker.id}`}
            sticker={sticker}
            delay={0.2 + index * 0.15}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default StepCard;
