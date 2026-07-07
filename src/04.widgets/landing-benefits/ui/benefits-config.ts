export type BenefitRowConfig = {
  key: "exhibition" | "capsules" | "telemetry" | "domain" | "impact";
  photoSrc: string;
  photoClassName: string;
  overlaySrc: string;
  overlayMobileSrc: string;
};

const IMAGES_DIR = "/images/landing/benefits";

export const ROW_HIGHLIGHT_MS = 2500;

export const BENEFIT_ROWS: BenefitRowConfig[] = [
  {
    key: "exhibition",
    photoSrc: `${IMAGES_DIR}/exhibition-photo.png`,
    photoClassName: "object-cover object-[50%_45%]",
    overlaySrc: `${IMAGES_DIR}/exhibition-overlay.png`,
    overlayMobileSrc: `${IMAGES_DIR}/exhibition-overlay-mob.png`,
  },
  {
    key: "capsules",
    photoSrc: `${IMAGES_DIR}/capsules-photo.png`,
    photoClassName: "object-cover object-[50%_45%]",
    overlaySrc: `${IMAGES_DIR}/capsules-overlay.png`,
    overlayMobileSrc: `${IMAGES_DIR}/capsules-overlay-mob.png`,
  },
  {
    key: "telemetry",
    photoSrc: `${IMAGES_DIR}/telemetry-photo.png`,
    photoClassName: "object-cover",
    overlaySrc: `${IMAGES_DIR}/telemetry-overlay.png`,
    overlayMobileSrc: `${IMAGES_DIR}/telemetry-overlay-mob.png`,
  },
  {
    key: "domain",
    photoSrc: `${IMAGES_DIR}/domain-photo.png`,
    photoClassName: "object-cover",
    overlaySrc: `${IMAGES_DIR}/exhibition-overlay.png`,
    overlayMobileSrc: `${IMAGES_DIR}/domain-overlay-mob.png`,
  },
  {
    key: "impact",
    photoSrc: `${IMAGES_DIR}/impact-photo.png`,
    photoClassName: "object-cover",
    overlaySrc: `${IMAGES_DIR}/exhibition-overlay.png`,
    overlayMobileSrc: `${IMAGES_DIR}/impact-overlay-mob.png`,
  },
];
