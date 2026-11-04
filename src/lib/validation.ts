import type { TKey } from "./i18n";

export type BookingForm = {
  startDate: string;
  duration: string;
  unit: "hours" | "days";
  delivery: "deliver" | "pickup";
  name: string;
  phone: string;
  note: string;
};

export const PHONE_RE = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export function validatePhone(p: string) {
  return PHONE_RE.test(p.trim().replace(/\s/g, ""));
}

export function validateBooking(f: BookingForm, today: Date) {
  const e: Partial<Record<keyof BookingForm, TKey>> = {};
  if (!f.startDate) e.startDate = "errRequired";
  else {
    const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const [y, m, d] = f.startDate.split("-").map(Number);
    if (new Date(y, m - 1, d) < t0) e.startDate = "errDate";
  }
  const dur = Number(f.duration);
  if (!Number.isInteger(dur) || dur < 1 || dur > 30) e.duration = "errDuration";
  if (!f.name.trim()) e.name = "errRequired";
  if (!f.phone.trim()) e.phone = "errRequired";
  else if (!validatePhone(f.phone)) e.phone = "errPhone";
  return e;
}

export type ListingForm = { name: string; category: string; price: string; location: string; phone: string };

export function validateListing(f: ListingForm) {
  const e: Partial<Record<keyof ListingForm, TKey>> = {};
  if (!f.name.trim()) e.name = "errRequired";
  if (!f.category) e.category = "errRequired";
  const p = Number(f.price);
  if (!f.price) e.price = "errRequired";
  else if (!Number.isFinite(p) || p < 100 || p > 100000) e.price = "errPrice";
  if (!f.location.trim()) e.location = "errRequired";
  if (!f.phone.trim()) e.phone = "errRequired";
  else if (!validatePhone(f.phone)) e.phone = "errPhone";
  return e;
}
