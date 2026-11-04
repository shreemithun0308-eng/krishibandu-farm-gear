import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { SAMPLE_LISTINGS, type Listing } from "./data";

export type Booking = {
  id: string;
  listingId: string;
  listingName: string;
  listingNameKn: string;
  image: string;
  startDate: string;
  duration: number;
  unit: "hours" | "days";
  delivery: "deliver" | "pickup";
  name: string;
  phone: string;
  note: string;
  estimate: number;
  createdAt: string;
};

type Ctx = {
  listings: Listing[];
  userListings: Listing[];
  addListing: (l: Listing) => void;
  removeListing: (id: string) => void;
  bookings: Booking[];
  addBooking: (b: Booking) => void;
  removeBooking: (id: string) => void;
  location: string;
  setLocation: (s: string) => void;
  selectedId: string | null;
  openListing: (id: string | null) => void;
};

const StoreContext = createContext<Ctx | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [location, setLocationState] = useState("Bengaluru, Karnataka");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUserListings(load("kb-listings", []));
    setBookings(load("kb-bookings", []));
    setLocationState(load("kb-location", "Bengaluru, Karnataka"));
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("kb-listings", JSON.stringify(userListings)); }, [userListings, ready]);
  useEffect(() => { if (ready) localStorage.setItem("kb-bookings", JSON.stringify(bookings)); }, [bookings, ready]);
  useEffect(() => { if (ready) localStorage.setItem("kb-location", JSON.stringify(location)); }, [location, ready]);

  const listings = useMemo(() => [...userListings, ...SAMPLE_LISTINGS], [userListings]);

  return (
    <StoreContext.Provider
      value={{
        listings,
        userListings,
        addListing: (l) => setUserListings((p) => [l, ...p]),
        removeListing: (id) => setUserListings((p) => p.filter((x) => x.id !== id)),
        bookings,
        addBooking: (b) => setBookings((p) => [b, ...p]),
        removeBooking: (id) => setBookings((p) => p.filter((x) => x.id !== id)),
        location,
        setLocation: setLocationState,
        selectedId,
        openListing: setSelectedId,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const c = useContext(StoreContext);
  if (!c) throw new Error("useStore outside provider");
  return c;
}
