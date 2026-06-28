import React from "react";
import { motion } from "framer-motion";
import { WEDDING } from "@/constants/testIds";
import { useWedding } from "@/context/WeddingContext";
import { OrnateDivider } from "./OrnateDivider";

export const MessageSection = () => {
  const { config } = useWedding();
  const { messages } = config;
  return (
    <section
      data-testid={WEDDING.messageSection}
      className="relative w-full py-20 sm:py-28 px-7 flex flex-col items-center text-center"
      style={{ backgroundColor: "#FBFBF9" }}
    >
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9 }}
        className="font-script text-5xl sm:text-6xl gold-shimmer leading-none"
      >
        {messages.mantraScript}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-3 text-rose-gold/90 text-base sm:text-lg tracking-[0.2em]"
        lang="ml"
      >
        {messages.mantraMalayalam}
      </motion.p>

      <OrnateDivider className="my-8" symbol="✦" />

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.9 }}
        className="text-umber font-serif-elegant text-base sm:text-lg leading-relaxed max-w-sm"
      >
        {messages.invitationOpener},
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.45, duration: 0.9 }}
        className="mt-4 text-umber/90 font-body text-lg sm:text-xl italic leading-relaxed max-w-md"
      >
        {messages.invitationBody}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.9 }}
        className="mt-8 text-gold font-serif-elegant tracking-[0.18em] text-sm uppercase"
      >
        {messages.invitationCloser}
      </motion.p>
    </section>
  );
};

export default MessageSection;
