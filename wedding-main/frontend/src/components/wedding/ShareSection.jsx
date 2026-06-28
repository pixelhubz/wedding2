import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { WEDDING } from "@/constants/testIds";
import { useWedding } from "@/context/WeddingContext";
import { OrnateDivider } from "./OrnateDivider";

export const ShareSection = () => {
  const { config } = useWedding();
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = `${config.shareText} ${url}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        /* noop */
      }
      document.body.removeChild(ta);
    }
  };

  return (
    <section className="relative w-full py-20 sm:py-24 px-6 flex flex-col items-center text-center">
      <p className="font-script text-4xl gold-shimmer leading-none">share the love</p>
      <OrnateDivider symbol="♡" className="mt-4 mb-8" />

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <motion.a
          data-testid={WEDDING.shareWhatsapp}
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.96 }}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gold-deep text-ivory font-serif-elegant tracking-[0.2em] text-xs uppercase min-h-[48px]"
          style={{ boxShadow: "0 8px 20px -8px rgba(120,90,0,0.6)" }}
        >
          <WhatsAppIcon className="w-4 h-4" />
          Share on WhatsApp
        </motion.a>

        <motion.button
          data-testid={WEDDING.shareCopy}
          type="button"
          onClick={copyLink}
          whileTap={{ scale: 0.96 }}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ivory text-umber font-serif-elegant tracking-[0.2em] text-xs uppercase min-h-[48px] border"
          style={{ borderColor: "rgba(212,175,55,0.6)" }}
        >
          {copied ? <Check className="w-4 h-4 text-gold-deep" /> : <Copy className="w-4 h-4 text-gold-deep" />}
          {copied ? "Link copied" : "Copy link"}
        </motion.button>
      </div>

      {/* Closing gratitude */}
      <div className="mt-16 sm:mt-20 text-center max-w-sm">
        <OrnateDivider symbol="❦" className="mb-6" />
        <p
          data-testid="closing-note"
          className="font-script text-3xl sm:text-4xl text-rose-gold leading-snug"
        >
          With love &amp; gratitude
        </p>
        <p className="mt-3 font-serif-elegant text-umber text-sm tracking-[0.18em] uppercase">
          {config.couple.brideShort}&apos;s Family
        </p>
        <p className="mt-1 text-gold-light text-xs tracking-[0.3em] uppercase">&amp;</p>
        <p className="font-serif-elegant text-umber text-sm tracking-[0.18em] uppercase">
          {config.couple.groomShort}&apos;s Family
        </p>
      </div>

      <div className="mt-12 text-center">
        <p className="font-script text-3xl text-rose-gold leading-none">
          {config.couple.brideShort} &amp; {config.couple.groomShort}
        </p>
        <p className="mt-2 text-umber/60 text-[10px] tracking-[0.4em] uppercase font-serif-elegant">
          {config.ceremony.dateDisplay} · {config.venue.area}
        </p>
      </div>
    </section>
  );
};

const WhatsAppIcon = ({ className = "" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19.11 17.42c-.27-.13-1.59-.78-1.84-.87-.25-.09-.43-.13-.6.13-.18.27-.69.87-.85 1.04-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.16-1.33-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.82-1.99-.22-.52-.44-.45-.6-.46h-.51c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.22 0 1.31.95 2.58 1.08 2.76.13.18 1.87 2.85 4.53 4 .63.27 1.13.43 1.51.56.64.2 1.21.17 1.67.1.51-.08 1.59-.65 1.81-1.27.22-.62.22-1.15.16-1.27-.07-.11-.25-.18-.52-.31zM16.02 4C9.39 4 4 9.39 4 16c0 2.12.55 4.18 1.6 6.01L4 28l6.13-1.59A11.94 11.94 0 0 0 16.02 28C22.64 28 28 22.62 28 16S22.64 4 16.02 4zm0 21.85c-1.79 0-3.54-.48-5.06-1.39l-.36-.22-3.64.95.97-3.55-.24-.37A9.83 9.83 0 0 1 6.18 16c0-5.43 4.41-9.85 9.84-9.85S25.86 10.57 25.86 16s-4.42 9.85-9.84 9.85z" />
  </svg>
);

export default ShareSection;
