import { describe, expect, it } from "vitest";
import { decideBooking, ownerRequests } from "@/lib/owner-bookings";
import { SAMPLE_LISTINGS } from "@/lib/data";
import type { Booking } from "@/lib/store";

const equipment = SAMPLE_LISTINGS.slice(0, 1).map((l) => ({ ...l, id: "owner-tractor", userAdded: true }));
const request: Booking = { id: "KB-1", listingId: "owner-tractor", listingName: "Tractor", listingNameKn: "ಟ್ರ್ಯಾಕ್ಟರ್", image: "", startDate: "2026-11-10", duration: 2, unit: "days", delivery: "pickup", name: "Ravi", phone: "9876543210", note: "", estimate: 4000, createdAt: "2026-11-09" };
describe("owner decisions", () => {
  it("shows requests only for the owner's equipment", () => expect(ownerRequests([request, { ...request, id: "KB-2", listingId: "sample" }], equipment).map((b) => b.id)).toEqual(["KB-1"]));
  it("accepts a pending request", () => expect(decideBooking([request], equipment, "KB-1", "confirmed")[0]?.status).toBe("confirmed"));
  it("declines a pending request", () => expect(decideBooking([request], equipment, "KB-1", "declined")[0]?.status).toBe("declined"));
  it("does not decide bookings for other equipment", () => expect(decideBooking([request], [], "KB-1", "confirmed")[0]?.status).toBeUndefined());
  it("does not change an already confirmed booking", () => expect(decideBooking([{ ...request, status: "confirmed" }], equipment, "KB-1", "declined")[0]?.status).toBe("confirmed"));
});