"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment } from "react";

const word: Variants = {
  hidden: { y: "120%" },
  visible: (delay: number) => ({
    y: "0%",
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay },
  }),
};

type RevealWordsProps = {
  text: string;
  baseDelay?: number;
  stagger?: number;
};

const RevealWords = ({
  text,
  baseDelay = 0,
  stagger = 0.055,
}: RevealWordsProps) => {
  return (
    <>
      {text.split(" ").map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              variants={word}
              custom={baseDelay + index * stagger}
              className="inline-block"
            >
              {part}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
};

export default RevealWords;
