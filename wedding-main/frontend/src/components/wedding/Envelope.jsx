import React, { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { WEDDING } from "@/constants/testIds";
import { useWedding } from "@/context/WeddingContext";

/**
 * Drag-to-open envelope hero.
 * Drag the flap UPWARD to break the seal and reveal the letter.
 */
export const Envelope = ({ onOpen }) => {
  const { config } = useWedding();
  const [opened, setOpened] = useState(false);
  const y = useMotionValue(0);

  // Map drag distance to flap rotation (upward drag = negative y).
  const flapRotate = useTransform(y, [-160, 0], [-170, 0], { clamp: true });
  const hintOpacity = useTransform(y, [-40, 0], [0, 1], { clamp: true });
  const envelopeShake = useTransform(y, [-160, 0], [-2, 0], { clamp: true });

  const handleDragEnd = () => {
    if (y.get() < -90) {
      open();
    } else {
      // Snap back
      y.set(0);
    }
  };

  const open = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => onOpen?.(), 900);
  };

  return (
    <section
      data-testid={WEDDING.envelope}
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-center paper-texture vignette overflow-hidden px-6"
    >
      <CornerOrnament className="absolute top-6 left-6" />
      <CornerOrnament className="absolute top-6 right-6 scale-x-[-1]" />
      <CornerOrnament className="absolute bottom-6 left-6 scale-y-[-1]" />
      <CornerOrnament className="absolute bottom-6 right-6 scale-x-[-1] scale-y-[-1]" />

      <p className="text-umber/70 text-xs tracking-[0.4em] uppercase mb-2 font-serif-elegant">
        A sacred invitation
      </p>
      <p className="font-script text-3xl gold-shimmer mb-8 leading-none">to our wedding</p>

      <AnimatePresence>
        {!opened && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -50, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div style={{ x: envelopeShake }} className="relative">
              {/* Envelope body */}
              <div
                className="relative w-[280px] h-[200px] sm:w-[320px] sm:h-[230px] rounded-sm"
                style={{
                  background:
                    "linear-gradient(160deg, #F7EFD8 0%, #EEDFA9 45%, #D4AF37 100%)",
                  boxShadow:
                    "0 30px 60px -20px rgba(120, 90, 0, 0.35), 0 8px 16px -8px rgba(60, 40, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.4)",
                  perspective: 1200,
                }}
              >
                {/* Inner letter peek */}
                <div className="absolute inset-3 rounded-sm bg-ivory-soft flex items-center justify-center overflow-hidden z-0">
                  <div className="text-center px-4">
                    <p className="font-script text-rose-gold text-2xl sm:text-3xl leading-none">
                      {config.couple.brideShort}
                    </p>
                    <p className="text-gold-light text-base my-1 font-serif-elegant italic">&amp;</p>
                    <p className="font-script text-rose-gold text-2xl sm:text-3xl leading-none">
                      {config.couple.groomShort}
                    </p>
                  </div>
                </div>

                {/* Side / bottom decorative folds */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(120,90,0,0.10) 0%, transparent 30%, transparent 70%, rgba(120,90,0,0.10) 100%)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute bottom-0 left-0 right-0 h-1/2 z-10"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(120,90,0,0.05) 0%, rgba(120,90,0,0.18) 100%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                />

                {/* Top flap — animated by drag */}
                <motion.div
                  data-testid={WEDDING.envelopeFlap}
                  drag="y"
                  dragConstraints={{ top: -160, bottom: 0 }}
                  dragElastic={0.12}
                  onDragEnd={handleDragEnd}
                  style={{
                    y,
                    rotateX: flapRotate,
                    transformOrigin: "top center",
                    transformStyle: "preserve-3d",
                  }}
                  className="absolute top-0 left-0 right-0 h-1/2 cursor-grab active:cursor-grabbing no-touch-scroll z-20"
                >
                  <div
                    className="w-full h-full relative"
                    style={{
                      background:
                        "linear-gradient(180deg, #E9D58A 0%, #D4AF37 60%, #B8860B 100%)",
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      filter: "drop-shadow(0 4px 6px rgba(120,90,0,0.25))",
                    }}
                  />
                  {/* Wax seal — also acts as tap-to-open */}
                  <button
                    type="button"
                    data-testid={WEDDING.envelopeOpen}
                    aria-label="Open invitation"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      open();
                    }}
                    className="absolute left-1/2 -translate-x-1/2 top-[55%] -translate-y-1/2 w-14 h-14 rounded-full wax-seal flex items-center justify-center select-none"
                  >
                    <span className="font-script text-white/95 text-2xl drop-shadow-sm leading-none">
                      A&amp;S
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(115deg, transparent 30%, rgba(255,250,220,0.55) 50%, transparent 70%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer-text 3s linear infinite",
                        mixBlendMode: "screen",
                      }}
                    />
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Hint */}
            <motion.div
              style={{ opacity: hintOpacity }}
              className="mt-6 flex flex-col items-center pointer-events-none"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="text-gold-light"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 19V5M12 5L5 12M12 5L19 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <p className="mt-2 text-umber/70 text-[10px] tracking-[0.4em] uppercase">
                {config.messages.coverHint}
              </p>
              <p className="mt-1 text-umber/40 text-[9px] tracking-[0.3em] uppercase">
                · or tap the seal ·
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-6"
        >
          <p className="font-script text-3xl text-rose-gold">we are tying the knot</p>
        </motion.div>
      )}
    </section>
  );
};

const CornerOrnament = ({ className = "" }) => (
  <svg
    className={`w-12 h-12 sm:w-16 sm:h-16 text-gold-light/60 ${className}`}
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 2 H30 M2 2 V30 M2 2 Q14 14 26 14 M2 2 Q14 14 14 26"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="14" cy="14" r="1.4" fill="currentColor" />
    <circle cx="22" cy="6" r="1" fill="currentColor" />
    <circle cx="6" cy="22" r="1" fill="currentColor" />
  </svg>
);

export default Envelope;
