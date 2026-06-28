import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause } from "lucide-react";
import { WEDDING } from "@/constants/testIds";
import { useWedding } from "@/context/WeddingContext";

export const BGMPlayer = ({ autoStart = false }) => {
  const { config } = useWedding();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (autoStart) play();
  }, [autoStart]);

  const play = async () => {
    try {
      const el = audioRef.current;
      if (!el) return;
      el.volume = 0.55;
      await el.play();
      setPlaying(true);
    } catch {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3500);
    }
  };

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      await play();
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={config.music.url} loop preload="auto" />
      <div className="fixed bottom-20 right-4 sm:right-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              className="px-3 py-1.5 rounded-full bg-ivory-soft border text-[10px] tracking-[0.2em] uppercase text-umber"
              style={{ borderColor: "rgba(212,175,55,0.5)" }}
            >
              Tap to play music
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          data-testid={WEDDING.bgmToggle}
          type="button"
          aria-label={playing ? "Pause background music" : "Play background music"}
          onClick={toggle}
          whileTap={{ scale: 0.93 }}
          className="relative w-12 h-12 rounded-full flex items-center justify-center wax-seal text-ivory shadow-lg"
        >
          <span
            aria-hidden
            className={`absolute inset-0 rounded-full ${playing ? "spin-slow" : ""}`}
            style={{
              background:
                "conic-gradient(from 90deg, rgba(255,250,220,0.0) 0deg, rgba(255,250,220,0.35) 60deg, rgba(255,250,220,0.0) 120deg)",
              mixBlendMode: "screen",
            }}
          />
          {playing ? (
            <Pause className="w-5 h-5 relative" fill="currentColor" />
          ) : (
            <Music className="w-5 h-5 relative" />
          )}
          {playing && (
            <span
              aria-hidden
              className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-rose-gold border-2 border-ivory float-soft"
            />
          )}
        </motion.button>
      </div>
    </>
  );
};

export default BGMPlayer;
