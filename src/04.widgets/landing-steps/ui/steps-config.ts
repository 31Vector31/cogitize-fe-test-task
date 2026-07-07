import type { CSSProperties } from "react";

export type StepSticker = {
  id: string;
  frameClassName: string;
  rotateClassName: string;
  outerSrc: string;
  innerSrc: string;
};

export type StepConfig = {
  key: "step1" | "step2" | "step3";
  background: string;
  patternColor: string;
  patternRects: CSSProperties[];
  stickers: StepSticker[];
};

const STICKERS_DIR = "/images/landing/steps";

export const STEP_ROTATION_MS = 5000;
export const MOBILE_STEP_ROTATION_MS = 2000;

export const STEPS: StepConfig[] = [
  {
    key: "step1",
    background: "#ffd909",
    patternColor: "#ffd000",
    patternRects: [
      { left: "0%", top: "0%", width: "29.92%", height: "64.95%" },
      { left: "14.96%", top: "64.95%", width: "36.06%", height: "35.22%" },
      { left: "65.6%", top: "64.95%", width: "36.06%", height: "35.22%" },
      { left: "65.6%", top: "43.02%", width: "28%", height: "35.22%" },
      { left: "51.02%", top: "0%", width: "16.49%", height: "64.95%" },
    ],
    stickers: [
      {
        id: "start-left",
        frameClassName:
          "left-[9px] top-[99px] h-[74px] w-[117px] tablet:-left-[35px] tablet:top-[133px] tablet:h-[108px] tablet:w-[171px]",
        rotateClassName: "-rotate-[4.38deg]",
        outerSrc: `${STICKERS_DIR}/start-b-1.svg`,
        innerSrc: `${STICKERS_DIR}/start-b-2.svg`,
      },
      {
        id: "start-right",
        frameClassName:
          "left-[200px] top-[130px] h-[74px] w-[117px] tablet:left-[322px] tablet:top-[293px] tablet:h-[108px] tablet:w-[171px]",
        rotateClassName: "rotate-[9deg]",
        outerSrc: `${STICKERS_DIR}/start-a-1.svg`,
        innerSrc: `${STICKERS_DIR}/start-a-2.svg`,
      },
    ],
  },
  {
    key: "step2",
    background: "#bf57f3",
    patternColor: "#c65efa",
    patternRects: [
      { left: "0%", top: "24.26%", width: "23.99%", height: "82.46%" },
      { left: "66.36%", top: "65.57%", width: "36.48%", height: "44.73%" },
      { left: "45.84%", top: "77.7%", width: "25.18%", height: "26.23%" },
      { left: "36.58%", top: "0%", width: "19.48%", height: "56.89%" },
      { left: "51.54%", top: "0%", width: "50.83%", height: "26.23%" },
    ],
    stickers: [
      {
        id: "add-left",
        frameClassName:
          "left-0 top-[98px] h-[71px] w-[88px] tablet:left-[5px] tablet:top-[123px] tablet:h-[102px] tablet:w-[127px]",
        rotateClassName: "-rotate-[10.42deg]",
        outerSrc: `${STICKERS_DIR}/add-a-1.svg`,
        innerSrc: `${STICKERS_DIR}/add-a-2.svg`,
      },
      {
        id: "add-right",
        frameClassName:
          "-right-[22px] top-[159px] h-[71px] w-[88px] tablet:-right-[12px] tablet:top-[183px] tablet:h-[102px] tablet:w-[127px]",
        rotateClassName: "rotate-[4.58deg]",
        outerSrc: `${STICKERS_DIR}/add-b-1.svg`,
        innerSrc: `${STICKERS_DIR}/add-b-2.svg`,
      },
    ],
  },
  {
    key: "step3",
    background: "#ffd000",
    patternColor: "#ffd909",
    patternRects: [
      { left: "0%", top: "24.26%", width: "30.27%", height: "82.5%" },
      { left: "66.36%", top: "65.57%", width: "36.48%", height: "44.73%" },
      { left: "66.36%", top: "12.13%", width: "28.33%", height: "44.73%" },
      { left: "51.54%", top: "0%", width: "16.86%", height: "103.9%" },
      { left: "15.14%", top: "-3.44%", width: "36.48%", height: "44.73%" },
    ],
    stickers: [
      {
        id: "share",
        frameClassName:
          "left-[193px] top-[102px] h-[70px] w-[117px] tablet:left-[188px] tablet:top-[182px] tablet:h-[106px] tablet:w-[177px]",
        rotateClassName: "rotate-[7.69deg]",
        outerSrc: `${STICKERS_DIR}/share-1.svg`,
        innerSrc: `${STICKERS_DIR}/share-2.svg`,
      },
    ],
  },
];
