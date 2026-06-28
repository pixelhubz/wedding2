import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "@/constants/testIds";
import { useWedding } from "@/context/WeddingContext";
import { OrnateDivider } from "./OrnateDivider";

const calc = (target) => {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, total: diff };
};

export const Countdown = () => {
  const { config } = useWedding();
  const target = new Date(config.ceremony.isoDateTime).getTime();
  const [t, setT] = useState(() => calc(target));

  useEffect(() => {
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = [
    { label: "Days", value: t.days, tid: WEDDING.countdownDays },
    { label: "Hours", value: t.hours, tid: WEDDING.countdownHours },
    { label: "Minutes", value: t.minutes, tid: WEDDING.countdownMinutes },
    { label: "Seconds", value: t.seconds, tid: WEDDING.countdownSeconds },
  ];

  return (
    <section
      data-testid={WEDDING.countdown}
      className="relative w-full py-20 sm:py-24 px-6 flex flex-col items-center text-center"
      style={{ backgroundColor: "#FBFBF9" }}
    >
      <p className="text-umber/70 text-xs tracking-[0.4em] uppercase mb-3 font-serif-elegant">
        Counting every moment
      </p>
      <OrnateDivider symbol="✦" className="mb-8" />

      {t.total === 0 ? (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-script text-5xl gold-shimmer"
        >
          The day is here ♡
        </motion.p>
      ) : (
        <div className="grid grid-cols-4 gap-3 sm:gap-5 w-full max-w-md">
          {cells.map((c) => (
            <Cell key={c.label} value={c.value} label={c.label} tid={c.tid} />
          ))}
        </div>
      )}
    </section>
  );
};

const Cell = ({ value, label, tid }) => (
  <div
    data-testid={tid}
    className="relative flex flex-col items-center justify-center aspect-square rounded-md bg-ivory border"
    style={{
      borderColor: "rgba(212,175,55,0.5)",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.7), 0 8px 18px -10px rgba(150,110,0,0.18)",
    }}
  >
    <span className="font-serif-elegant text-3xl sm:text-4xl text-gold-deep tabular-nums leading-none">
      {String(value).padStart(2, "0")}
    </span>
    <span className="mt-1.5 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-umber/70">
      {label}
    </span>
    <span aria-hidden className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-rose-gold/60" />
    <span aria-hidden className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-gold/60" />
  </div>
);

export default Countdown;
