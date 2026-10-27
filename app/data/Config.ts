export type DayHours = {
  day: String;
  open: String;
  close: String;
  closed?: boolean;
};

export const cafe = {
  name: "Cardamom-Cafe",
  tagline: "Slow chai. Fast friends",
  description:
    "A neighbourhood cafe in Koregaon Park serving hand-pulled chai, filter kaapi, fresh bakes and comfort bites. Order ahead on WhatsApp and skip the queue",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  phoneDisplay: "+91 98765 43210",
  email: "hello@cardamomandco.in",
  instagram: "https://instagram.com/cardamomandco",
  instagramHandle: "@cardamomandco",
  address: ["Shop 4, Lane 6, North Main Road", "Koregaon Park, Pune 411001"],
  mapQuery: "Koregaon Park Lane 6, Pune, Maharashtra 411001",
  currency: "₹",
  timezone: "Asia/Kolkata",
  hours: [
    { day: "Monday", open: "08:00", close: "22:00" },
    { day: "Tuesday", open: "08:00", close: "22:00" },
    { day: "Wednesday", open: "08:00", close: "22:00" },
    { day: "Thursday", open: "08:00", close: "22:00" },
    { day: "Friday", open: "08:00", close: "23:30" },
    { day: "Saturday", open: "08:00", close: "23:30" },
    { day: "Sunday", open: "09:00", close: "23:00" },
  ] as DayHours[],

};
