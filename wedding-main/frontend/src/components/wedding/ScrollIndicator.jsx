import React from "react";
import { motion, useScroll } from "framer-motion";
import { WEDDING } from "@/constants/testIds";

export const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      data-testid={WEDDING.scrollIndicator}
      className="scroll-progress"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollIndicator;
