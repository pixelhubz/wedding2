import React from "react";
import { motion } from "framer-motion";
import { useWedding } from "@/context/WeddingContext";
import { OrnateDivider } from "./OrnateDivider";

export const ParentsSection = () => {
  const { config } = useWedding();
  const { family } = config;

  return (
    <section
      data-testid="parents-section"
      className="relative w-full pb-16 sm:pb-20 px-6 flex flex-col items-center text-center paper-texture"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <OrnateDivider symbol="✿" className="mb-8" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-umber/70 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-serif-elegant mb-6"
      >
        Daughter &amp; Son of
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 w-full max-w-md">
        <FamilyCard
          label="Bride's Parents"
          father={family.brideParents.father}
          mother={family.brideParents.mother}
          delay={0.1}
        />
        <FamilyCard
          label="Groom's Parents"
          father={family.groomParents.father}
          mother={family.groomParents.mother}
          delay={0.25}
        />
      </div>
    </section>
  );
};

const FamilyCard = ({ label, father, mother, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, delay }}
    className="flex flex-col items-center"
  >
    <p className="font-script text-2xl text-rose-gold leading-none">{label}</p>
    <div className="mt-3 w-10 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    <p className="mt-4 font-serif-elegant text-umber text-base sm:text-lg tracking-wide leading-snug">
      {father}
    </p>
    <p className="mt-1 text-gold-light text-xs tracking-[0.3em] uppercase">&amp;</p>
    <p className="mt-1 font-serif-elegant text-umber text-base sm:text-lg tracking-wide leading-snug">
      {mother}
    </p>
  </motion.div>
);

export default ParentsSection;
