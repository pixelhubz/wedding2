import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Envelope } from "@/components/wedding/Envelope";
import { CoupleSection } from "@/components/wedding/CoupleSection";
import { ParentsSection } from "@/components/wedding/ParentsSection";
import { MessageSection } from "@/components/wedding/MessageSection";
import { ScratchDate } from "@/components/wedding/ScratchDate";
import { Countdown } from "@/components/wedding/Countdown";
import { VenueSection } from "@/components/wedding/VenueSection";
import { ShareSection } from "@/components/wedding/ShareSection";
import { BGMPlayer } from "@/components/wedding/BGMPlayer";
import { ScrollIndicator } from "@/components/wedding/ScrollIndicator";
import { ScrollHint } from "@/components/wedding/ScrollHint";
import { WeddingProvider, useWedding } from "@/context/WeddingContext";
import { WEDDING } from "@/constants/testIds";

const InviteShell = () => {
  const [opened, setOpened] = useState(false);
  const letterRef = useRef(null);
  const { loading } = useWedding();

  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        letterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 600);
    }
  }, [opened]);

  if (loading) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center bg-ivory">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 rounded-full border-2 border-[#D4AF37]/30 border-t-[#997A00] animate-spin"
            data-testid="invite-loading"
          />
          <p className="font-script text-2xl text-rose-gold">loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="invite-frame relative bg-ivory overflow-x-hidden">
      <ScrollIndicator />

      <Envelope onOpen={() => setOpened(true)} />

      <AnimatePresence>
        {opened && (
          <motion.div
            ref={letterRef}
            data-testid={WEDDING.letterContent}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <CoupleSection />
            <ParentsSection />
            <ScrollHint label="Our story begins" />
            <MessageSection />
            <ScratchDate />
            <Countdown />
            <VenueSection />
            <ShareSection />
          </motion.div>
        )}
      </AnimatePresence>

      <BGMPlayer autoStart={opened} />
    </div>
  );
};

export default function WeddingInvite() {
  return (
    <WeddingProvider>
      <InviteShell />
    </WeddingProvider>
  );
}
