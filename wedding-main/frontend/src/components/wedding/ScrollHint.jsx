import React from "react";
import { motion } from "framer-motion";

export const ScrollHint = ({ label = "Scroll" }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2, duration: 1 }}
    className="flex flex-col items-center pb-8 -mt-4"
    aria-hidden="true"
  >
    <p className="text-umber/50 text-[10px] tracking-[0.4em] uppercase mb-2 font-serif-elegant">
      {label}
    </p>
    <motion.div
      animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      className="w-px h-10 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent"
    />
  </motion.div>
);

export default ScrollHint;
