"use client";

import { useMediaQuery } from "@/07.shared";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { useRowHighlight } from "../model";
import BenefitRow from "./benefit-row";
import { BENEFIT_ROWS, ROW_HIGHLIGHT_MS } from "./benefits-config";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay },
  }),
};

const LandingBenefits = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { activeRow, hoverRow, leaveRow } = useRowHighlight({
    rowsCount: BENEFIT_ROWS.length,
    intervalMs: ROW_HIGHLIGHT_MS,
    isActive: isInView,
  });

  return (
    <section className="relative overflow-hidden bg-[#181818]">
      <motion.div
        ref={sectionRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto w-full max-w-[1440px] py-10 tablet:py-[100px]"
      >
        <div className="flex w-full flex-col tablet:border-b tablet:border-[#242424]">
          {BENEFIT_ROWS.map((row, index) => (
            <motion.div key={row.key} variants={fadeUp} custom={0.1 + index * 0.12}>
              <BenefitRow
                row={row}
                isRowActive={activeRow === index}
                isStaticallyDecorated={isMobile}
                onHover={() => hoverRow(index)}
                onLeave={() => leaveRow(index)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default LandingBenefits;
