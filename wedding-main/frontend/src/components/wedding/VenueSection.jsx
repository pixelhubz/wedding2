import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar } from "lucide-react";
import { WEDDING } from "@/constants/testIds";
import { useWedding } from "@/context/WeddingContext";
import { OrnateDivider } from "./OrnateDivider";

export const VenueSection = () => {
  const { config } = useWedding();
  const { venue, ceremony } = config;
  return (
    <section
      data-testid={WEDDING.venueSection}
      className="relative w-full py-20 sm:py-28 px-6 flex flex-col items-center text-center paper-texture"
    >
      <p className="text-umber/70 text-xs tracking-[0.4em] uppercase mb-3 font-serif-elegant">
        The sacred venue
      </p>
      <OrnateDivider symbol="❦" className="mb-8" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="w-full max-w-md rounded-md bg-ivory-soft p-7 sm:p-9 border"
        style={{
          borderColor: "rgba(212,175,55,0.45)",
          boxShadow:
            "0 28px 60px -24px rgba(120,90,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.6)",
        }}
      >
        <h2 className="font-serif-elegant text-2xl sm:text-3xl text-umber tracking-wide">
          {venue.name}
        </h2>
        <p className="font-script text-rose-gold text-3xl mt-1 leading-none">{venue.area}</p>

        <OrnateDivider symbol="•" className="my-6" />

        <ul className="space-y-3 text-left">
          <li className="flex items-center gap-3 text-umber">
            <Calendar className="w-4 h-4 text-gold-light shrink-0" />
            <span className="font-serif-elegant text-sm sm:text-base tracking-wide">
              {ceremony.dayDisplay}, {ceremony.dateDisplay}
            </span>
          </li>
          <li className="flex items-center gap-3 text-umber">
            <Clock className="w-4 h-4 text-gold-light shrink-0" />
            <span className="font-serif-elegant text-sm sm:text-base tracking-wide">
              {ceremony.timeDisplay}
            </span>
          </li>
          <li className="flex items-start gap-3 text-umber">
            <MapPin className="w-4 h-4 text-gold-light shrink-0 mt-1" />
            <span className="font-serif-elegant text-sm sm:text-base tracking-wide">
              {venue.fullAddress}
            </span>
          </li>
        </ul>

        <a
          data-testid={WEDDING.mapButton}
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-deep text-ivory font-serif-elegant tracking-[0.2em] text-xs uppercase min-h-[48px] hover:bg-[#7A6000] transition-colors"
          style={{ boxShadow: "0 8px 20px -8px rgba(120,90,0,0.6)" }}
        >
          <MapPin className="w-4 h-4" />
          Open in Google Maps
        </a>
      </motion.div>
    </section>
  );
};

export default VenueSection;
