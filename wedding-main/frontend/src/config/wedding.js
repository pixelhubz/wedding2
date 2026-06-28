// Fallback static config (used if the backend /api/wedding endpoint is unreachable).
// In production, content is served dynamically from MongoDB via FastAPI.
export const weddingConfig = {
  couple: {
    bride: "Aswathy Sreekumar",
    groom: "Sanjay Suresh",
    brideShort: "Aswathy",
    groomShort: "Sanjay",
  },
  family: {
    brideParents: {
      father: "Sreekumar P",
      mother: "Usha Sreekumar",
    },
    groomParents: {
      father: "Suresh A R",
      mother: "Renjini Suresh",
    },
  },
  ceremony: {
    isoDateTime: "2026-08-21T10:00:00+05:30",
    dateDisplay: "21 August 2026",
    dayDisplay: "Friday",
    timeDisplay: "10:00 AM – 10:15 AM",
    monthShort: "Aug",
    day: "21",
    year: "2026",
  },
  venue: {
    name: "Kunnathoor Devi Temple",
    area: "Kuttamperoor",
    fullAddress: "Kunnathoor Devi Temple, Kuttamperoor, Kerala",
    mapsUrl: "https://maps.app.goo.gl/oacr9vV8mYDg7scZ6?g_st=aw",
  },
  music: {
    url: "https://customer-assets.emergentagent.com/job_200cfdde-0318-4528-9004-cf2c6cf56e67/artifacts/irjyt1ye__Sreeragamo_Bgm_Violin_Cover_Malayalam_Ringtone_%28by%20Fringster.com%29.mp3",
    title: "Sreeragamo · Violin Cover",
  },
  messages: {
    mantraScript: "Mangalyam",
    mantraMalayalam: "മംഗല്യം",
    invitationOpener: "With the blessings of our families",
    invitationBody:
      "we joyfully invite you to share in the sacred moment as two souls become one, woven together in love, prayer, and a thousand quiet promises.",
    invitationCloser: "Your presence is our greatest blessing.",
    coverHint: "Pull the flap to open",
    scratchHint: "Scratch to reveal the date",
    closingNote: "With love & gratitude, Aswathy's Family & Sanjay's Family",
  },
  shareText:
    "We're getting married! 💍\n\nAswathy & Sanjay\n21 August 2026\nKunnathoor Devi Temple, Kuttamperoor\n\nView our invitation:",
};
