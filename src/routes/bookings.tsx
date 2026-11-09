import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, ClipboardList, Trash2, Truck, Clock } from "lucide-react";
import { toast } from "sonner";
import { inr } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { DemoBadge } from "@/components/Layout";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "My bookings — Krishibandu (demo)" },
      { name: "description", content: "View and cancel your demo machinery booking requests saved on this device." },
      { property: "og:title", content: "My bookings — Krishibandu" },
      { property: "og:description", content: "Your demo equipment rental requests." },
    ],
  }),
  component: Bookings,
});

function Bookings() {
  const { t, lang } = useLang();
  const { bookings, removeBooking } = useStore();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold sm:text-4xl">{t("bookingsTitle")}</h1>
        <DemoBadge />
      </div>
      <p className="mt-2 text-muted-foreground">{t("bookingsSub")}</p>

      {bookings.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed bg-card p-12 text-center">
          <ClipboardList className="h-12 w-12 text-muted-foreground" />
          <h2 className="mt-3 text-xl font-semibold">{t("noBookings")}</h2>
          <p className="mt-1 text-muted-foreground">{t("noBookingsSub")}</p>
          <Link to="/browse" className="mt-4 rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground">{t("navBrowse")}</Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {bookings.map((b) => (
            <li key={b.id} className="flex flex-col gap-4 overflow-hidden rounded-2xl border bg-card shadow-card sm:flex-row">
              <img src={b.image} alt="" className="h-40 w-full object-cover sm:h-auto sm:w-44" />
              <div className="flex flex-1 flex-col gap-2 p-4 sm:pl-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-display text-lg font-semibold">{lang === "kn" ? b.listingNameKn : b.listingName}</h2>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${b.status === "confirmed" ? "bg-secondary text-success" : b.status === "declined" ? "bg-destructive/10 text-destructive" : "bg-accent-soft"}`}>{t(b.status === "confirmed" ? "statusConfirmed" : b.status === "declined" ? "statusDeclined" : "statusSent")}</span>
                </div>
                <p className="font-mono text-sm text-muted-foreground">{b.id}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-primary" />{b.startDate}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" />{b.duration} {t(b.unit)}</span>
                  <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-primary" />{t(b.delivery)}</span>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="text-sm">{t("estimate")}: <strong className="text-primary">{inr(b.estimate)}</strong></span>
                  <button
                    onClick={() => { removeBooking(b.id); toast(t("cancelled"), { description: b.id }); }}
                    className="flex items-center gap-1.5 rounded-full border border-destructive/40 px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" /> {t("cancel")}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
