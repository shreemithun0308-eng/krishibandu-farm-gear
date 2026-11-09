import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "kn";

const dict = {
  demoBanner: { en: "DEMO DATA — sample listings & bookings for a college project. No real owners or payments.", kn: "ಡೆಮೊ ಡೇಟಾ — ಕಾಲೇಜು ಯೋಜನೆಗಾಗಿ ಮಾದರಿ ಪಟ್ಟಿಗಳು ಮತ್ತು ಬುಕಿಂಗ್‌ಗಳು. ನಿಜವಾದ ಮಾಲೀಕರು ಅಥವಾ ಪಾವತಿಗಳಿಲ್ಲ." },
  demo: { en: "DEMO", kn: "ಡೆಮೊ" },
  navHome: { en: "Home", kn: "ಮುಖಪುಟ" },
  navBrowse: { en: "Browse", kn: "ಯಂತ್ರಗಳು" },
  navBookings: { en: "My bookings", kn: "ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು" },
  navList: { en: "List equipment", kn: "ಯಂತ್ರ ಸೇರಿಸಿ" },
  navOwner: { en: "Owner hub", kn: "ಮಾಲೀಕರ ಕೇಂದ್ರ" },
  ownerSub: { en: "Demo owner view — equipment and requests saved on this device only. No real booking is made.", kn: "ಡೆಮೊ ಮಾಲೀಕರ ನೋಟ — ಯಂತ್ರಗಳು ಮತ್ತು ವಿನಂತಿಗಳು ಈ ಸಾಧನದಲ್ಲಿ ಮಾತ್ರ ಉಳಿಯುತ್ತವೆ. ನಿಜವಾದ ಬುಕಿಂಗ್ ಆಗುವುದಿಲ್ಲ." },
  incoming: { en: "Booking requests", kn: "ಬಾಡಿಗೆ ವಿನಂತಿಗಳು" },
  pending: { en: "Pending", kn: "ಬಾಕಿ ಇದೆ" },
  acceptBooking: { en: "Accept request", kn: "ವಿನಂತಿ ಸ್ವೀಕರಿಸಿ" },
  declineBooking: { en: "Decline request", kn: "ವಿನಂತಿ ತಿರಸ್ಕರಿಸಿ" },
  statusConfirmed: { en: "Owner confirmed – demo", kn: "ಮಾಲೀಕರು ದೃಢಪಡಿಸಿದ್ದಾರೆ – ಡೆಮೊ" },
  statusDeclined: { en: "Owner declined – demo", kn: "ಮಾಲೀಕರು ತಿರಸ್ಕರಿಸಿದ್ದಾರೆ – ಡೆಮೊ" },
  noOwnerRequests: { en: "No requests for your equipment yet", kn: "ನಿಮ್ಮ ಯಂತ್ರಗಳಿಗೆ ಇನ್ನೂ ವಿನಂತಿಗಳಿಲ್ಲ" },
  noEquipment: { en: "No equipment listed yet", kn: "ಇನ್ನೂ ಯಂತ್ರಗಳನ್ನು ಸೇರಿಸಿಲ್ಲ" },
  navHow: { en: "How it works", kn: "ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ" },
  menu: { en: "Menu", kn: "ಮೆನು" },
  heroTitle: { en: "Rent the right machine. Get the work done.", kn: "ಸರಿಯಾದ ಯಂತ್ರ ಬಾಡಿಗೆಗೆ ಪಡೆಯಿರಿ. ಕೆಲಸ ಮುಗಿಸಿ." },
  heroSub: { en: "Find tractors, tillers, harvesters and more from owners near your village in Karnataka.", kn: "ಕರ್ನಾಟಕದಲ್ಲಿ ನಿಮ್ಮ ಹಳ್ಳಿಯ ಹತ್ತಿರದ ಮಾಲೀಕರಿಂದ ಟ್ರ್ಯಾಕ್ಟರ್, ಟಿಲ್ಲರ್, ಹಾರ್ವೆಸ್ಟರ್ ಮತ್ತು ಇನ್ನಷ್ಟು ಹುಡುಕಿ." },
  searchPh: { en: "Search tractor, rotavator, sprayer…", kn: "ಟ್ರ್ಯಾಕ್ಟರ್, ರೋಟವೇಟರ್, ಸ್ಪ್ರೇಯರ್ ಹುಡುಕಿ…" },
  location: { en: "Location", kn: "ಸ್ಥಳ" },
  search: { en: "Search", kn: "ಹುಡುಕಿ" },
  categories: { en: "Browse by category", kn: "ವರ್ಗದ ಪ್ರಕಾರ ನೋಡಿ" },
  featured: { en: "Featured equipment", kn: "ವಿಶೇಷ ಯಂತ್ರಗಳು" },
  seeAll: { en: "See all", kn: "ಎಲ್ಲಾ ನೋಡಿ" },
  all: { en: "All", kn: "ಎಲ್ಲಾ" },
  Tractors: { en: "Tractors", kn: "ಟ್ರ್ಯಾಕ್ಟರ್‌ಗಳು" },
  Tilling: { en: "Tilling", kn: "ಉಳುಮೆ" },
  Harvesting: { en: "Harvesting", kn: "ಕೊಯ್ಲು" },
  Sprayers: { en: "Sprayers", kn: "ಸಿಂಪಡಣೆ" },
  Transport: { en: "Transport", kn: "ಸಾಗಣೆ" },
  Other: { en: "Other", kn: "ಇತರೆ" },
  perHour: { en: "/hr", kn: "/ಗಂಟೆ" },
  perDay: { en: "/day", kn: "/ದಿನ" },
  available: { en: "Available", kn: "ಲಭ್ಯವಿದೆ" },
  booked: { en: "Booked", kn: "ಬುಕ್ ಆಗಿದೆ" },
  viewDetails: { en: "View details", kn: "ವಿವರ ನೋಡಿ" },
  owner: { en: "Owner", kn: "ಮಾಲೀಕರು" },
  sort: { en: "Sort", kn: "ವಿಂಗಡಿಸಿ" },
  sortRel: { en: "Recommended", kn: "ಶಿಫಾರಸು" },
  sortLow: { en: "Price: low to high", kn: "ಬೆಲೆ: ಕಡಿಮೆಯಿಂದ ಹೆಚ್ಚು" },
  sortHigh: { en: "Price: high to low", kn: "ಬೆಲೆ: ಹೆಚ್ಚಿನಿಂದ ಕಡಿಮೆ" },
  onlyAvail: { en: "Available only", kn: "ಲಭ್ಯವಿರುವುದು ಮಾತ್ರ" },
  results: { en: "machines found", kn: "ಯಂತ್ರಗಳು ಸಿಕ್ಕಿವೆ" },
  noResults: { en: "No machines match your search", kn: "ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಯಂತ್ರಗಳಿಲ್ಲ" },
  noResultsSub: { en: "Try another word, category or clear the filters.", kn: "ಬೇರೆ ಪದ ಅಥವಾ ವರ್ಗ ಪ್ರಯತ್ನಿಸಿ, ಅಥವಾ ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ." },
  clear: { en: "Clear filters", kn: "ಫಿಲ್ಟರ್ ತೆರವು" },
  browseTitle: { en: "Browse equipment", kn: "ಯಂತ್ರಗಳನ್ನು ನೋಡಿ" },
  specs: { en: "Specifications", kn: "ವಿವರಣೆ" },
  rate: { en: "Rental rate", kn: "ಬಾಡಿಗೆ ದರ" },
  contact: { en: "Owner contact", kn: "ಮಾಲೀಕರ ಸಂಪರ್ಕ" },
  contactHidden: { en: "Shared after the owner accepts (demo placeholder)", kn: "ಮಾಲೀಕರು ಒಪ್ಪಿದ ನಂತರ ಹಂಚಲಾಗುತ್ತದೆ (ಡೆಮೊ)" },
  whatsappOwner: { en: "Chat with owner on WhatsApp", kn: "ಮಾಲೀಕರೊಂದಿಗೆ ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ" },
  whatsappNote: { en: "Opens WhatsApp with the number entered when this machine was listed.", kn: "ಈ ಯಂತ್ರ ಸೇರಿಸುವಾಗ ನೀಡಿದ ಸಂಖ್ಯೆಗೆ ವಾಟ್ಸಾಪ್ ತೆರೆಯುತ್ತದೆ." },
  requestBooking: { en: "Request booking", kn: "ಬುಕಿಂಗ್ ವಿನಂತಿಸಿ" },
  unavailableNote: { en: "Currently booked — you can still send a demo request for later dates.", kn: "ಈಗ ಬುಕ್ ಆಗಿದೆ — ನಂತರದ ದಿನಾಂಕಗಳಿಗೆ ಡೆಮೊ ವಿನಂತಿ ಕಳುಹಿಸಬಹುದು." },
  close: { en: "Close", kn: "ಮುಚ್ಚಿ" },
  back: { en: "Back", kn: "ಹಿಂದೆ" },
  startDate: { en: "Start date", kn: "ಪ್ರಾರಂಭ ದಿನಾಂಕ" },
  duration: { en: "Duration", kn: "ಅವಧಿ" },
  hours: { en: "hours", kn: "ಗಂಟೆಗಳು" },
  days: { en: "days", kn: "ದಿನಗಳು" },
  delivery: { en: "Delivery / pickup", kn: "ತಲುಪಿಸುವಿಕೆ / ತೆಗೆದುಕೊಳ್ಳುವಿಕೆ" },
  deliver: { en: "Deliver to my farm", kn: "ನನ್ನ ಹೊಲಕ್ಕೆ ತಲುಪಿಸಿ" },
  pickup: { en: "I will pick up", kn: "ನಾನೇ ತೆಗೆದುಕೊಳ್ಳುತ್ತೇನೆ" },
  farmerName: { en: "Your name", kn: "ನಿಮ್ಮ ಹೆಸರು" },
  phone: { en: "Phone number", kn: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ" },
  note: { en: "Note (optional)", kn: "ಟಿಪ್ಪಣಿ (ಐಚ್ಛಿಕ)" },
  estimate: { en: "Estimated cost", kn: "ಅಂದಾಜು ವೆಚ್ಚ" },
  sendRequest: { en: "Send demo request", kn: "ಡೆಮೊ ವಿನಂತಿ ಕಳುಹಿಸಿ" },
  demoNotice: { en: "This is a demo request. It does not contact a real owner and no payment is taken.", kn: "ಇದು ಡೆಮೊ ವಿನಂತಿ. ಇದು ನಿಜವಾದ ಮಾಲೀಕರನ್ನು ಸಂಪರ್ಕಿಸುವುದಿಲ್ಲ, ಪಾವತಿ ಇಲ್ಲ." },
  confirmed: { en: "Demo request sent!", kn: "ಡೆಮೊ ವಿನಂತಿ ಕಳುಹಿಸಲಾಗಿದೆ!" },
  bookingId: { en: "Demo booking ID", kn: "ಡೆಮೊ ಬುಕಿಂಗ್ ಐಡಿ" },
  viewBookings: { en: "View my bookings", kn: "ನನ್ನ ಬುಕಿಂಗ್ ನೋಡಿ" },
  errRequired: { en: "This field is required", kn: "ಈ ಕ್ಷೇತ್ರ ಕಡ್ಡಾಯ" },
  errPhone: { en: "Enter a valid 10-digit Indian mobile number", kn: "ಸರಿಯಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ" },
  errDate: { en: "Choose today or a future date", kn: "ಇಂದು ಅಥವಾ ಮುಂದಿನ ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ" },
  errDuration: { en: "Enter a duration between 1 and 30", kn: "1 ರಿಂದ 30 ರ ನಡುವಿನ ಅವಧಿ ನಮೂದಿಸಿ" },
  errPrice: { en: "Enter a price between ₹100 and ₹1,00,000", kn: "₹100 ರಿಂದ ₹1,00,000 ನಡುವಿನ ಬೆಲೆ ನಮೂದಿಸಿ" },
  bookingsTitle: { en: "My bookings", kn: "ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು" },
  bookingsSub: { en: "Demo booking requests saved on this device only.", kn: "ಈ ಸಾಧನದಲ್ಲಿ ಮಾತ್ರ ಉಳಿಸಲಾದ ಡೆಮೊ ಬುಕಿಂಗ್ ವಿನಂತಿಗಳು." },
  statusSent: { en: "Request sent – demo", kn: "ವಿನಂತಿ ಕಳುಹಿಸಲಾಗಿದೆ – ಡೆಮೊ" },
  cancel: { en: "Cancel request", kn: "ವಿನಂತಿ ರದ್ದು" },
  cancelled: { en: "Demo request removed", kn: "ಡೆಮೊ ವಿನಂತಿ ತೆಗೆದುಹಾಕಲಾಗಿದೆ" },
  noBookings: { en: "No booking requests yet", kn: "ಇನ್ನೂ ಬುಕಿಂಗ್ ವಿನಂತಿಗಳಿಲ್ಲ" },
  noBookingsSub: { en: "Find a machine and send a demo request — it will show up here.", kn: "ಯಂತ್ರ ಹುಡುಕಿ ಡೆಮೊ ವಿನಂತಿ ಕಳುಹಿಸಿ — ಅದು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ." },
  listTitle: { en: "List your equipment", kn: "ನಿಮ್ಮ ಯಂತ್ರವನ್ನು ಸೇರಿಸಿ" },
  listSub: { en: "Earn from idle machines by renting them to farmers nearby. (Demo — saved on this device only.)", kn: "ಬಳಕೆಯಾಗದ ಯಂತ್ರಗಳನ್ನು ಹತ್ತಿರದ ರೈತರಿಗೆ ಬಾಡಿಗೆಗೆ ನೀಡಿ ಗಳಿಸಿ. (ಡೆಮೊ — ಈ ಸಾಧನದಲ್ಲಿ ಮಾತ್ರ.)" },
  machineName: { en: "Machine name", kn: "ಯಂತ್ರದ ಹೆಸರು" },
  category: { en: "Category", kn: "ವರ್ಗ" },
  pricePerDay: { en: "Price per day (₹)", kn: "ದಿನಕ್ಕೆ ಬೆಲೆ (₹)" },
  submitListing: { en: "Add demo listing", kn: "ಡೆಮೊ ಪಟ್ಟಿ ಸೇರಿಸಿ" },
  listed: { en: "Demo listing added! It now appears in Browse.", kn: "ಡೆಮೊ ಪಟ್ಟಿ ಸೇರಿಸಲಾಗಿದೆ! ಈಗ ಯಂತ್ರಗಳಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ." },
  yourListings: { en: "Your demo listings", kn: "ನಿಮ್ಮ ಡೆಮೊ ಪಟ್ಟಿಗಳು" },
  remove: { en: "Remove", kn: "ತೆಗೆದುಹಾಕಿ" },
  howTitle: { en: "How Krishibandu works", kn: "ಕೃಷಿಬಂಧು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ" },
  s1: { en: "Search", kn: "ಹುಡುಕಿ" }, s1d: { en: "Type the machine you need and your village or taluk.", kn: "ಬೇಕಾದ ಯಂತ್ರ ಮತ್ತು ನಿಮ್ಮ ಹಳ್ಳಿ/ತಾಲೂಕು ನಮೂದಿಸಿ." },
  s2: { en: "Compare", kn: "ಹೋಲಿಸಿ" }, s2d: { en: "Check price, distance and availability side by side.", kn: "ಬೆಲೆ, ದೂರ ಮತ್ತು ಲಭ್ಯತೆಯನ್ನು ಹೋಲಿಸಿ." },
  s3: { en: "Request", kn: "ವಿನಂತಿಸಿ" }, s3d: { en: "Pick a date and duration, send a booking request.", kn: "ದಿನಾಂಕ ಮತ್ತು ಅವಧಿ ಆಯ್ಕೆಮಾಡಿ, ವಿನಂತಿ ಕಳುಹಿಸಿ." },
  s4: { en: "Coordinate", kn: "ಸಂಯೋಜಿಸಿ" }, s4d: { en: "Agree on delivery or pickup with the owner directly.", kn: "ಮಾಲೀಕರೊಂದಿಗೆ ತಲುಪಿಸುವಿಕೆ ಅಥವಾ ತೆಗೆದುಕೊಳ್ಳುವಿಕೆ ಒಪ್ಪಿಕೊಳ್ಳಿ." },
  benefitsTitle: { en: "Why farmers choose Krishibandu", kn: "ರೈತರು ಕೃಷಿಬಂಧುವನ್ನು ಏಕೆ ಆರಿಸುತ್ತಾರೆ" },
  b1: { en: "Save money", kn: "ಹಣ ಉಳಿಸಿ" }, b1d: { en: "Rent by the hour or day instead of buying costly machines.", kn: "ದುಬಾರಿ ಯಂತ್ರ ಖರೀದಿಸುವ ಬದಲು ಗಂಟೆ ಅಥವಾ ದಿನಕ್ಕೆ ಬಾಡಿಗೆ ಪಡೆಯಿರಿ." },
  b2: { en: "Nearby owners", kn: "ಹತ್ತಿರದ ಮಾಲೀಕರು" }, b2d: { en: "Machines from your own district reach you faster.", kn: "ನಿಮ್ಮ ಜಿಲ್ಲೆಯ ಯಂತ್ರಗಳು ಬೇಗ ತಲುಪುತ್ತವೆ." },
  b3: { en: "Clear prices", kn: "ಸ್ಪಷ್ಟ ಬೆಲೆಗಳು" }, b3d: { en: "See hourly and daily rates upfront in rupees.", kn: "ಗಂಟೆ ಮತ್ತು ದಿನದ ದರಗಳನ್ನು ಮೊದಲೇ ರೂಪಾಯಿಯಲ್ಲಿ ನೋಡಿ." },
  b4: { en: "Earn from idle machines", kn: "ಬಳಕೆಯಾಗದ ಯಂತ್ರಗಳಿಂದ ಗಳಿಸಿ" }, b4d: { en: "Owners can list equipment and earn in the off-season.", kn: "ಮಾಲೀಕರು ಯಂತ್ರ ಪಟ್ಟಿ ಮಾಡಿ ಬಿಡುವಿನ ಕಾಲದಲ್ಲಿ ಗಳಿಸಬಹುದು." },
  faqTitle: { en: "Frequently asked questions", kn: "ಪದೇ ಪದೇ ಕೇಳುವ ಪ್ರಶ್ನೆಗಳು" },
  q1: { en: "Is this a real rental service?", kn: "ಇದು ನಿಜವಾದ ಬಾಡಿಗೆ ಸೇವೆಯೇ?" },
  a1: { en: "No. Krishibandu here is a college project demo. All listings, owners and bookings are sample data.", kn: "ಇಲ್ಲ. ಇದು ಕಾಲೇಜು ಯೋಜನೆಯ ಡೆಮೊ. ಎಲ್ಲಾ ಪಟ್ಟಿಗಳು, ಮಾಲೀಕರು ಮತ್ತು ಬುಕಿಂಗ್‌ಗಳು ಮಾದರಿ ಡೇಟಾ." },
  q2: { en: "Do I pay online?", kn: "ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಪಾವತಿಸಬೇಕೇ?" },
  a2: { en: "No payment is taken in this demo. In a real version, farmers would pay the owner after agreeing terms.", kn: "ಈ ಡೆಮೊದಲ್ಲಿ ಪಾವತಿ ಇಲ್ಲ. ನಿಜವಾದ ಆವೃತ್ತಿಯಲ್ಲಿ ಒಪ್ಪಂದದ ನಂತರ ಮಾಲೀಕರಿಗೆ ಪಾವತಿಸಲಾಗುತ್ತದೆ." },
  q3: { en: "Who brings the machine?", kn: "ಯಂತ್ರವನ್ನು ಯಾರು ತರುತ್ತಾರೆ?" },
  a3: { en: "You choose delivery to your farm or pickup when requesting. Many tractors come with an operator.", kn: "ವಿನಂತಿಸುವಾಗ ತಲುಪಿಸುವಿಕೆ ಅಥವಾ ತೆಗೆದುಕೊಳ್ಳುವಿಕೆ ಆಯ್ಕೆಮಾಡಿ. ಅನೇಕ ಟ್ರ್ಯಾಕ್ಟರ್‌ಗಳು ಚಾಲಕನೊಂದಿಗೆ ಬರುತ್ತವೆ." },
  q4: { en: "Where is my data stored?", kn: "ನನ್ನ ಡೇಟಾ ಎಲ್ಲಿ ಉಳಿಯುತ್ತದೆ?" },
  a4: { en: "Only in your browser on this device. Nothing is sent to a server.", kn: "ಈ ಸಾಧನದ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತ್ರ. ಸರ್ವರ್‌ಗೆ ಏನನ್ನೂ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ." },
  footerTag: { en: "Machinery rental for Karnataka's farmers.", kn: "ಕರ್ನಾಟಕದ ರೈತರಿಗೆ ಯಂತ್ರ ಬಾಡಿಗೆ." },
  footerContact: { en: "Contact (demo placeholder)", kn: "ಸಂಪರ್ಕ (ಡೆಮೊ)" },
  disclaimer: { en: "Disclaimer: This website is a student demo. Listings, prices, owners and availability are fictional. No real bookings or payments are made.", kn: "ಹಕ್ಕು ನಿರಾಕರಣೆ: ಇದು ವಿದ್ಯಾರ್ಥಿ ಡೆಮೊ. ಪಟ್ಟಿಗಳು, ಬೆಲೆಗಳು, ಮಾಲೀಕರು ಮತ್ತು ಲಭ್ಯತೆ ಕಾಲ್ಪನಿಕ. ನಿಜವಾದ ಬುಕಿಂಗ್ ಅಥವಾ ಪಾವತಿ ಇಲ್ಲ." },
  ctaOwner: { en: "Own a tractor or tiller?", kn: "ಟ್ರ್ಯಾಕ್ಟರ್ ಅಥವಾ ಟಿಲ್ಲರ್ ಇದೆಯೇ?" },
  ctaOwnerSub: { en: "List it in two minutes and help farmers nearby.", kn: "ಎರಡು ನಿಮಿಷದಲ್ಲಿ ಸೇರಿಸಿ ಹತ್ತಿರದ ರೈತರಿಗೆ ಸಹಾಯ ಮಾಡಿ." },
  operator: { en: "Operator", kn: "ಚಾಲಕ" },
  power: { en: "Power / size", kn: "ಶಕ್ತಿ / ಗಾತ್ರ" },
  area: { en: "Area", kn: "ಪ್ರದೇಶ" },
  yes: { en: "Included", kn: "ಸೇರಿದೆ" },
  no: { en: "Not included", kn: "ಇಲ್ಲ" },
} as const;

export type TKey = keyof typeof dict;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string };
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("kb-lang");
    if (saved === "kn" || saved === "en") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "kn" ? "kn" : "en";
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("kb-lang", l);
  };
  const t = (k: TKey) => dict[k][lang];
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const c = useContext(LangContext);
  if (!c) throw new Error("useLang outside provider");
  return c;
}
