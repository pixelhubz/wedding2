import React from "react";
import { motion } from "framer-motion";
import { WEDDING } from "@/constants/testIds";
import { useWedding } from "@/context/WeddingContext";
import { OrnateDivider } from "./OrnateDivider";

export const CoupleSection = () => {
  const { config } = useWedding();
  const { couple } = config;
  return (
    <section
      data-testid={WEDDING.coupleSection}
      className="relative w-full py-20 sm:py-28 px-6 flex flex-col items-center text-center paper-texture"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="text-umber/70 text-xs tracking-[0.4em] uppercase mb-6 font-serif-elegant"
      >
        Together with our families
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-script text-6xl sm:text-7xl gold-shimmer leading-[1.05]"
      >
        {couple.brideShort}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.25, duration: 0.7 }}
        className="my-4 sm:my-6 flex items-center justify-center"
      >
        <span className="font-serif-elegant text-3xl sm:text-4xl text-rose-gold italic">&amp;</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-script text-6xl sm:text-7xl gold-shimmer leading-[1.05]"
      >
        {couple.groomShort}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8"
      >
        <OrnateDivider />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-8 text-umber font-serif-elegant tracking-[0.2em] text-sm uppercase"
      >
        {couple.bride}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-2 text-umber font-serif-elegant tracking-[0.2em] text-sm uppercase"
      >
        {couple.groom}
      </motion.p>
    </section>
  );
};

export default CoupleSection;
