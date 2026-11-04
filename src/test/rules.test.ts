import { describe, expect, it } from "vitest";
import { validateBooking, validateListing } from "@/lib/validation";
import { SAMPLE_LISTINGS, sortAndFilter } from "@/lib/data";

const base = { startDate: "2026-11-10", duration: "2", unit: "days" as const, delivery: "deliver" as const, name: "Ravi", phone: "9876543210", note: "" };
const today = new Date(2026, 10, 4);

describe("booking rules", () => {
  it("accepts a valid request", () => expect(validateBooking(base, today)).toEqual({}));
  it("rejects past dates", () => expect(validateBooking({ ...base, startDate: "2026-11-01" }, today).startDate).toBe("errDate"));
  it("rejects invalid phone", () => expect(validateBooking({ ...base, phone: "12345" }, today).phone).toBe("errPhone"));
  it("requires name", () => expect(validateBooking({ ...base, name: " " }, today).name).toBe("errRequired"));
});

describe("listing rules", () => {
  it("rejects price under ₹100", () =>
    expect(validateListing({ name: "x", category: "Tractors", price: "50", location: "y", phone: "9876543210" }).price).toBe("errPrice"));
});

describe("browse filtering", () => {
  it("sorts by price low to high", () => {
    const r = sortAndFilter(SAMPLE_LISTINGS, { q: "", category: "All", sort: "low", onlyAvailable: false });
    expect(r[0]?.pricePerDay).toBe(400);
  });
  it("filters by location", () => {
    const r = sortAndFilter(SAMPLE_LISTINGS, { q: "mandya", category: "All", sort: "rel", onlyAvailable: false });
    expect(r.map((l) => l.id)).toEqual(["kb-3"]);
  });
});
