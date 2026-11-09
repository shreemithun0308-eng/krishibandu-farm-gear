import type { Booking } from "./store";
import type { Listing } from "./data";

export type BookingStatus = "pending" | "confirmed" | "declined";

export function ownerRequests(bookings: Booking[], equipment: Listing[]) {
  const owned = new Set(equipment.map((l) => l.id));
  return bookings.filter((b) => owned.has(b.listingId));
}

export function decideBooking(bookings: Booking[], equipment: Listing[], id: string, status: "confirmed" | "declined") {
  const owned = new Set(equipment.map((l) => l.id));
  return bookings.map((b) => b.id === id && owned.has(b.listingId) && (b.status ?? "pending") === "pending" ? { ...b, status } : b);
}