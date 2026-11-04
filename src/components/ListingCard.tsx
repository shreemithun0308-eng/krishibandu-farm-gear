import { MapPin, User } from "lucide-react";
import type { Listing } from "@/lib/data";
import { inr } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { DemoBadge } from "./Layout";

export function Availability({ available }: { available: boolean }) {
  const { t } = useLang();
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${available ? "bg-secondary text-success" : "bg-muted text-muted-foreground"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${available ? "bg-success" : "bg-muted-foreground"}`} />
      {available ? t("available") : t("booked")}
    </span>
  );
}

export function ListingCard({ listing }: { listing: Listing }) {
  const { t, lang } = useLang();
  const { openListing } = useStore();
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={listing.image} alt={listing.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <DemoBadge className="absolute left-3 top-3" />
        <span className="absolute right-3 top-3 rounded-full bg-card/90 px-2.5 py-0.5 text-xs font-medium">{t(listing.category)}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-snug">{lang === "kn" ? listing.nameKn : listing.name}</h3>
          <Availability available={listing.available} />
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><User className="h-4 w-4" /> {listing.owner}</p>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {listing.area}</p>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            {listing.pricePerHour && (
              <div className="text-sm text-muted-foreground">{inr(listing.pricePerHour)}{t("perHour")}</div>
            )}
            <div className="text-lg font-bold text-primary">{inr(listing.pricePerDay)}<span className="text-sm font-medium text-muted-foreground">{t("perDay")}</span></div>
          </div>
          <button onClick={() => openListing(listing.id)} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep">
            {t("viewDetails")}
          </button>
        </div>
      </div>
    </article>
  );
}
