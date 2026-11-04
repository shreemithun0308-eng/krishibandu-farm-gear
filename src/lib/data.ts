import tractor from "@/assets/tractor.jpg";
import rotavator from "@/assets/rotavator.jpg";
import harvester from "@/assets/harvester.jpg";
import tiller from "@/assets/tiller.jpg";
import sprayer from "@/assets/sprayer.jpg";
import seeddrill from "@/assets/seeddrill.jpg";
import trailer from "@/assets/trailer.jpg";

export const CATEGORIES = ["Tractors", "Tilling", "Harvesting", "Sprayers", "Transport", "Other"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_IMAGE: Record<Category, string> = {
  Tractors: tractor,
  Tilling: rotavator,
  Harvesting: harvester,
  Sprayers: sprayer,
  Transport: trailer,
  Other: seeddrill,
};

export type Listing = {
  id: string;
  name: string;
  nameKn: string;
  category: Category;
  owner: string;
  area: string;
  pricePerHour: number | null;
  pricePerDay: number;
  available: boolean;
  image: string;
  power: string;
  operator: boolean;
  description: string;
  descriptionKn: string;
  userAdded?: boolean;
  phone?: string;
};

export const SAMPLE_LISTINGS: Listing[] = [
  { id: "kb-1", name: "Mahindra 575 DI Tractor", nameKn: "ಮಹೀಂದ್ರಾ 575 DI ಟ್ರ್ಯಾಕ್ಟರ್", category: "Tractors", owner: "Ramesh Gowda", area: "Doddaballapur, Bengaluru Rural", pricePerHour: 800, pricePerDay: 5500, available: true, image: tractor, power: "45 HP", operator: true, description: "Well-maintained 45 HP tractor suitable for ploughing, puddling and haulage. Comes with an experienced driver.", descriptionKn: "ಉಳುಮೆ, ಕೆಸರು ಗದ್ದೆ ಮತ್ತು ಸಾಗಣೆಗೆ ಸೂಕ್ತವಾದ 45 HP ಟ್ರ್ಯಾಕ್ಟರ್. ಅನುಭವಿ ಚಾಲಕನೊಂದಿಗೆ." },
  { id: "kb-2", name: "Sonalika Rotavator 6 ft", nameKn: "ಸೋನಾಲಿಕಾ ರೋಟವೇಟರ್ 6 ಅಡಿ", category: "Tilling", owner: "Manjunath K", area: "Hoskote, Bengaluru Rural", pricePerHour: 600, pricePerDay: 4000, available: true, image: rotavator, power: "6 ft, 42 blades", operator: true, description: "Rotavator for fine seedbed preparation. Rented along with a tractor and operator.", descriptionKn: "ಬೀಜದ ಹಾಸಿಗೆ ತಯಾರಿಗೆ ರೋಟವೇಟರ್. ಟ್ರ್ಯಾಕ್ಟರ್ ಮತ್ತು ಚಾಲಕನೊಂದಿಗೆ." },
  { id: "kb-3", name: "Kamco KMB 200 Power Tiller", nameKn: "ಕಾಮ್ಕೊ ಪವರ್ ಟಿಲ್ಲರ್", category: "Tilling", owner: "Lakshmamma S", area: "Mandya", pricePerHour: 350, pricePerDay: 2200, available: false, image: tiller, power: "12 HP diesel", operator: false, description: "Compact power tiller ideal for paddy puddling and small plots. Easy to handle.", descriptionKn: "ಭತ್ತದ ಗದ್ದೆ ಮತ್ತು ಸಣ್ಣ ಹೊಲಗಳಿಗೆ ಸೂಕ್ತವಾದ ಪವರ್ ಟಿಲ್ಲರ್." },
  { id: "kb-4", name: "Combine Harvester (Paddy)", nameKn: "ಕಂಬೈನ್ ಹಾರ್ವೆಸ್ಟರ್ (ಭತ್ತ)", category: "Harvesting", owner: "Shivakumar Patil", area: "Gangavathi, Koppal", pricePerHour: 2400, pricePerDay: 18000, available: true, image: harvester, power: "14 ft cutter bar", operator: true, description: "Self-propelled harvester for paddy and ragi. Includes operator and helper.", descriptionKn: "ಭತ್ತ ಮತ್ತು ರಾಗಿಗೆ ಸ್ವಯಂಚಾಲಿತ ಹಾರ್ವೆಸ್ಟರ್. ಚಾಲಕ ಮತ್ತು ಸಹಾಯಕ ಸೇರಿದೆ." },
  { id: "kb-5", name: "9-Row Seed Drill", nameKn: "9 ಸಾಲಿನ ಬೀಜ ಬಿತ್ತನೆ ಯಂತ್ರ", category: "Other", owner: "Basavaraj H", area: "Tumakuru", pricePerHour: null, pricePerDay: 1800, available: true, image: seeddrill, power: "9 tines", operator: false, description: "Tractor-drawn seed drill for ragi, groundnut and pulses. Uniform row spacing.", descriptionKn: "ರಾಗಿ, ಶೇಂಗಾ ಮತ್ತು ಬೇಳೆಕಾಳುಗಳಿಗೆ ಬೀಜ ಬಿತ್ತನೆ ಯಂತ್ರ." },
  { id: "kb-6", name: "Tractor Boom Sprayer 600 L", nameKn: "ಟ್ರ್ಯಾಕ್ಟರ್ ಬೂಮ್ ಸ್ಪ್ರೇಯರ್ 600 ಲೀ", category: "Sprayers", owner: "Nagaraj Reddy", area: "Kolar", pricePerHour: 500, pricePerDay: 3200, available: true, image: sprayer, power: "600 L tank, 12 m boom", operator: true, description: "Wide boom sprayer covering large fields quickly. Operator provided.", descriptionKn: "ದೊಡ್ಡ ಹೊಲಗಳನ್ನು ವೇಗವಾಗಿ ಆವರಿಸುವ ಬೂಮ್ ಸ್ಪ್ರೇಯರ್." },
  { id: "kb-7", name: "Tractor Trolley Trailer (5 T)", nameKn: "ಟ್ರ್ಯಾಕ್ಟರ್ ಟ್ರಾಲಿ (5 ಟನ್)", category: "Transport", owner: "Prakash M", area: "Ramanagara", pricePerHour: 450, pricePerDay: 3000, available: true, image: trailer, power: "5 tonne capacity", operator: true, description: "Tractor with trolley for carrying sugarcane, fodder, or produce to market.", descriptionKn: "ಕಬ್ಬು, ಮೇವು ಅಥವಾ ಉತ್ಪನ್ನ ಸಾಗಿಸಲು ಟ್ರಾಲಿಯೊಂದಿಗೆ ಟ್ರ್ಯಾಕ್ಟರ್." },
  { id: "kb-8", name: "Swaraj 744 FE Tractor", nameKn: "ಸ್ವರಾಜ್ 744 FE ಟ್ರ್ಯಾಕ್ಟರ್", category: "Tractors", owner: "Anand Hegde", area: "Chikkaballapur", pricePerHour: 900, pricePerDay: 6000, available: false, image: tractor, power: "48 HP", operator: true, description: "Powerful tractor for heavy cultivation. Booked this week in demo data.", descriptionKn: "ಭಾರಿ ಉಳುಮೆಗೆ ಶಕ್ತಿಶಾಲಿ ಟ್ರ್ಯಾಕ್ಟರ್." },
  { id: "kb-9", name: "Knapsack Power Sprayer", nameKn: "ಬೆನ್ನಿನ ಪವರ್ ಸ್ಪ್ರೇಯರ್", category: "Sprayers", owner: "Geetha R", area: "Mysuru", pricePerHour: 80, pricePerDay: 400, available: true, image: sprayer, power: "16 L, petrol", operator: false, description: "Light petrol sprayer for vegetables and small orchards.", descriptionKn: "ತರಕಾರಿ ಮತ್ತು ಸಣ್ಣ ತೋಟಗಳಿಗೆ ಹಗುರ ಸ್ಪ್ರೇಯರ್." },
];

export function sortAndFilter(
  listings: Listing[],
  opts: { q: string; category: Category | "All"; sort: "rel" | "low" | "high"; onlyAvailable: boolean },
) {
  const q = opts.q.trim().toLowerCase();
  let out = listings.filter((l) => {
    if (opts.category !== "All" && l.category !== opts.category) return false;
    if (opts.onlyAvailable && !l.available) return false;
    if (!q) return true;
    return [l.name, l.nameKn, l.category, l.area, l.owner].some((f) => f.toLowerCase().includes(q));
  });
  if (opts.sort === "low") out = [...out].sort((a, b) => a.pricePerDay - b.pricePerDay);
  if (opts.sort === "high") out = [...out].sort((a, b) => b.pricePerDay - a.pricePerDay);
  return out;
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export function makeBookingId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `KB-DEMO-${n}`;
}
