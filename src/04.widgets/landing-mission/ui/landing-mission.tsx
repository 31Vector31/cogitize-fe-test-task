"use client";

import { RevealWords } from "@/07.shared";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const IMAGES_DELAY = 0.55;

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -8 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 220, damping: 16, delay },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const draw: Variants = {
  hidden: { scaleX: 0 },
  visible: (delay: number) => ({
    scaleX: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

const LandingMission = () => {
  const t = useTranslations("landing");

  return (
    <section className="relative overflow-hidden bg-[#efeeed]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto w-full max-w-[1440px]"
      >
        <div className="relative z-10 px-5 pt-10 tablet:pt-24">
          <p className="text-center text-base font-normal leading-normal text-[#181818] tablet:text-[20px] tablet:leading-6">
            <RevealWords text={t("mission.caption")} />
          </p>
          <h2
            className="mx-auto mt-[30px] max-w-[930px] text-center text-[58px] font-extrabold uppercase
            leading-[0.8] tracking-[-0.01em] text-[#050505] tablet:mt-6 tablet:text-[clamp(44px,9.2vw,132px)]"
          >
            <RevealWords text={t("mission.title")} baseDelay={0.12} />
          </h2>
          <motion.div
            variants={pop}
            custom={IMAGES_DELAY + 0.15}
            className="pointer-events-none absolute left-[30px] top-[70px] w-[108px]
            tablet:left-[29.2%] tablet:top-[126px] tablet:w-[176px]"
          >
            <Image
              src="/images/landing/mission/sticker-ellipse.svg"
              alt=""
              width={176}
              height={52}
              className="absolute inset-0 h-full w-full rotate-2"
            />
            <div
              className="mx-auto h-[27px] w-[100px] rotate-2 bg-[#bf57f3]
              [mask-image:url(/images/landing/mission/mask-our-mission.png)] [mask-size:100%_100%]
              tablet:h-[44px] tablet:w-[163px]"
            />
          </motion.div>
        </div>

        <div className="relative mt-[70px] tablet:-mt-[29px]">
          <div className="relative left-1/2 flex w-screen -translate-x-1/2 flex-row tablet:items-end">
            <motion.div
              variants={fadeUp}
              custom={IMAGES_DELAY}
              className="relative h-[353px] w-[50.4%] tablet:h-[473px] tablet:w-[49.25%]"
            >
              <Image
                src="/images/landing/mission/photo-blur.png"
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 49vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={IMAGES_DELAY + 0.1}
              className="relative h-[353px] w-[49.6%] tablet:h-[396px] tablet:w-[50.75%]"
            >
              <Image
                src="/images/landing/mission/photo-warm.png"
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 51vw"
                className="object-cover"
              />
            </motion.div>

            <div
              className="absolute bottom-[50px] left-5 z-10 flex w-[339px] max-w-[calc(100%-36px)] flex-col gap-3
              tablet:bottom-9 tablet:w-[364px] tablet:max-w-[calc(100%-40px)] tablet:left-20"
            >
              <div className="flex flex-col gap-1">
                <p className="relative w-fit text-base font-medium leading-normal text-[#181818] tablet:text-[20px] tablet:leading-6">
                  <motion.span
                    variants={draw}
                    custom={IMAGES_DELAY + 0.5}
                    className="absolute -left-[5px] -top-[10px] block h-[32px] w-[186px] max-w-none origin-left rotate-[4.23deg]
                      tablet:-left-[4px] tablet:-top-[11px] tablet:h-[36px] tablet:w-[221px] tablet:rotate-4"
                  >
                    <Image
                      src="/images/landing/mission/highlight-1.svg"
                      alt=""
                      width={221}
                      height={36}
                      className="h-full w-full"
                    />
                  </motion.span>
                  <motion.span
                    variants={fadeUp}
                    custom={IMAGES_DELAY + 0.35}
                    className="relative block"
                  >
                    {t("mission.tribeTitle1")}
                  </motion.span>
                </p>
                <p className="relative w-fit text-base font-medium leading-normal text-[#181818] tablet:text-[20px] tablet:leading-6">
                  <motion.span
                    variants={draw}
                    custom={IMAGES_DELAY + 0.6}
                    className="absolute -left-[6px] -top-[5px] block h-[29px] w-[174px] max-w-none origin-left rotate-[4.31deg]
                      tablet:-left-[5px] tablet:h-[33px] tablet:w-[198px] tablet:rotate-[4.78deg]"
                  >
                    <Image
                      src="/images/landing/mission/highlight-2.svg"
                      alt=""
                      width={198}
                      height={33}
                      className="h-full w-full"
                    />
                  </motion.span>
                  <motion.span
                    variants={fadeUp}
                    custom={IMAGES_DELAY + 0.4}
                    className="relative block"
                  >
                    {t("mission.tribeTitle2")}
                  </motion.span>
                </p>
              </div>
              <motion.p
                variants={fadeUp}
                custom={IMAGES_DELAY + 0.45}
                className="text-[20px] font-medium leading-6 text-[#fefefe]"
              >
                {t("mission.tribeText")}
              </motion.p>
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute -top-[284px] left-1/2 h-[300px] w-[900px] -translate-x-1/2
            tablet:-top-[473px] tablet:h-[609px] tablet:w-[3372px]"
          >
            <Image
              src="/images/landing/mission/ellipse.svg"
              alt=""
              fill
              className="h-full w-full"
            />
          </div>

          <motion.div
            variants={pop}
            custom={IMAGES_DELAY + 0.25}
            className="absolute -top-[60px] left-1/2 z-20 w-[227px] -translate-x-1/2
            tablet:-top-[45px] tablet:left-[5.5%] tablet:w-[197px] tablet:translate-x-0"
          >
            <div className="flex h-[199px] flex-col items-center gap-[10px] bg-[#fefefe] px-[2px] pb-2 pt-[2px] tablet:h-[207px] tablet:pb-4">
              <div className="relative min-h-px w-full flex-1">
                <Image
                  src="/images/landing/mission/photo-fairy.png"
                  alt=""
                  fill
                  sizes="(max-width: 767px) 227px, 197px"
                  className="object-cover"
                />
              </div>
              <div
                className="h-[33px] w-[173px] shrink-0 bg-[#edae00]
                [mask-image:url(/images/landing/mission/mask-action-mob.svg)] [mask-size:100%_100%]
                tablet:h-[61px] tablet:w-[154px] tablet:[mask-image:url(/images/landing/mission/mask-action.svg)]"
              />
            </div>
            <motion.div
              variants={pop}
              custom={IMAGES_DELAY + 0.55}
              className="absolute right-px top-[11px] w-[51px] tablet:-right-[18px] tablet:-top-px tablet:w-[70px]"
            >
              <Image
                src="/images/landing/mission/smiley-round.svg"
                alt=""
                width={70}
                height={70}
                className="h-auto w-full"
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={pop}
            custom={IMAGES_DELAY + 0.2}
            className="absolute -top-[294px] left-[73.2%] z-[5] hidden w-[193px] tablet:block"
          >
            <div className="flex h-[116px] flex-col bg-[#fefefe] px-[2px] pb-4 pt-[2px]">
              <div className="relative min-h-px w-full flex-1">
                <Image
                  src="/images/landing/mission/photo-duo.png"
                  alt=""
                  fill
                  sizes="193px"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={pop}
            custom={IMAGES_DELAY + 0.45}
            className="absolute -top-[189px] left-[81.3%] hidden h-[53px] w-[141px] bg-[#edae00]
            [mask-image:url(/images/landing/mission/mask-audience.png)] [mask-size:100%_100%] tablet:block"
          />

          <motion.div
            variants={pop}
            custom={IMAGES_DELAY + 0.65}
            className="absolute -top-[110px] left-[68.8%] w-[28px] tablet:-top-[49px] tablet:left-[78.3%] tablet:w-[34px]"
          >
            <Image
              src="/images/landing/mission/heart.svg"
              alt=""
              width={34}
              height={46}
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default LandingMission;
