import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { WEDDING } from "@/constants/testIds";
import { useWedding } from "@/context/WeddingContext";
import { OrnateDivider } from "./OrnateDivider";

const REVEAL_THRESHOLD = 0.35;

export const ScratchDate = () => {
  const { config } = useWedding();
  const { ceremony, messages } = config;
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#B8860B");
    gradient.addColorStop(0.25, "#D4AF37");
    gradient.addColorStop(0.5, "#F5E6A8");
    gradient.addColorStop(0.75, "#D4AF37");
    gradient.addColorStop(1, "#997A00");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = "#8B6B00";
    for (let i = 0; i < 24; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (rect.height / 24) * i + Math.random() * 4);
      ctx.lineTo(rect.width, (rect.height / 24) * i + Math.random() * 4);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = "rgba(60,40,0,0.55)";
    ctx.font = "500 13px Marcellus, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(messages.scratchHint.toUpperCase(), rect.width / 2, rect.height / 2 - 12);
    ctx.font = "400 11px Marcellus, serif";
    ctx.fillText("✦ ✦ ✦", rect.width / 2, rect.height / 2 + 12);
  }, [messages.scratchHint]);

  useEffect(() => {
    setupCanvas();
    const onResize = () => setupCanvas();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setupCanvas]);

  const getEventPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const point = e.touches?.[0] || e.changedTouches?.[0] || e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  };

  const scratch = (x, y) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 36;

    if (lastPosRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
    lastPosRef.current = { x, y };
  };

  const checkRevealProgress = () => {
    if (revealed) return;
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const sampleW = 60;
    const sampleH = 40;
    const tmp = document.createElement("canvas");
    tmp.width = sampleW;
    tmp.height = sampleH;
    const tctx = tmp.getContext("2d");
    tctx.drawImage(canvas, 0, 0, rect.width * dpr, rect.height * dpr, 0, 0, sampleW, sampleH);
    const data = tctx.getImageData(0, 0, sampleW, sampleH).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 32) clear++;
    }
    const ratio = clear / (sampleW * sampleH);
    if (ratio >= REVEAL_THRESHOLD) reveal();
  };

  const reveal = () => {
    if (revealed) return;
    setRevealed(true);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transition = "opacity 600ms ease";
      canvas.style.opacity = "0";
    }
    burstPetals();
  };

  const burstPetals = () => {
    const rect = cardRef.current?.getBoundingClientRect();
    const origin = rect
      ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
      : { x: 0.5, y: 0.5 };
    const colors = ["#F1D4D4", "#B76E79", "#D4AF37", "#F5E6A8", "#FBE3E3"];
    const defaults = {
      origin,
      colors,
      ticks: 220,
      gravity: 0.45,
      decay: 0.92,
      scalar: 1.1,
      shapes: ["circle"],
    };
    confetti({ ...defaults, particleCount: 80, spread: 90, startVelocity: 38 });
    setTimeout(() => confetti({ ...defaults, particleCount: 50, spread: 120, startVelocity: 28, scalar: 0.9 }), 220);
    setTimeout(() => confetti({ ...defaults, particleCount: 40, spread: 160, startVelocity: 22, scalar: 0.7 }), 480);
  };

  const handleStart = (e) => {
    e.preventDefault();
    isDrawingRef.current = true;
    lastPosRef.current = null;
    const { x, y } = getEventPos(e);
    scratch(x, y);
  };
  const handleMove = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    const { x, y } = getEventPos(e);
    scratch(x, y);
  };
  const handleEnd = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault?.();
    isDrawingRef.current = false;
    lastPosRef.current = null;
    checkRevealProgress();
  };

  return (
    <section className="relative w-full py-20 sm:py-28 px-6 flex flex-col items-center text-center paper-texture">
      <p className="text-umber/70 text-xs tracking-[0.4em] uppercase mb-3 font-serif-elegant">
        Save the date
      </p>
      <OrnateDivider symbol="❀" className="mb-6" />

      <div
        ref={cardRef}
        data-testid={WEDDING.scratchCard}
        className="relative w-full max-w-[340px] aspect-[16/10] rounded-md overflow-hidden select-none"
        style={{
          boxShadow:
            "0 24px 48px -16px rgba(120, 90, 0, 0.25), inset 0 0 0 1px rgba(212,175,55,0.45)",
        }}
      >
        <div className="absolute inset-0 bg-ivory-soft flex flex-col items-center justify-center px-4">
          <p className="text-umber/70 text-[10px] tracking-[0.4em] uppercase">
            {ceremony.dayDisplay}
          </p>
          <div className="flex items-baseline gap-3 mt-1">
            <span className="font-script text-5xl sm:text-6xl text-rose-gold leading-none">
              {ceremony.day}
            </span>
            <div className="text-left">
              <p className="font-serif-elegant tracking-[0.3em] text-gold uppercase text-sm">
                {ceremony.monthShort}
              </p>
              <p className="font-serif-elegant tracking-[0.2em] text-umber text-xs">
                {ceremony.year}
              </p>
            </div>
          </div>
          <p
            data-testid={WEDDING.dateReveal}
            className="mt-3 text-umber font-serif-elegant text-sm tracking-[0.18em]"
          >
            {ceremony.timeDisplay}
          </p>
        </div>

        <canvas
          ref={canvasRef}
          data-testid={WEDDING.scratchCanvas}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing no-touch-scroll"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          style={{ display: revealed ? "none" : "block" }}
        />
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 font-script text-3xl text-rose-gold"
          >
            with all our love…
          </motion.p>
        )}
      </AnimatePresence>

      {!revealed && (
        <button
          type="button"
          onClick={reveal}
          className="mt-5 text-[11px] tracking-[0.3em] uppercase text-gold-deep underline-offset-4 hover:underline"
        >
          ✦ or tap here to reveal ✦
        </button>
      )}
    </section>
  );
};

export default ScratchDate;
