import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X, Plus, Tractor, Inbox, Trash2, CalendarDays, Clock, User, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DemoBadge } from "@/components/Layout";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { ownerRequests } from "@/lib/owner-bookings";
import { inr } from "@/lib/data";

export const Route = createFileRoute("/owner")({
  head: () => ({ meta: [
    { title: "Owner hub — Krishibandu (demo)" },
    { name: "description", content: "Manage your demo farm equipment and accept or decline booking requests on this device." },
    { property: "og:title", content: "Owner hub — Krishibandu" },
    { property: "og:description", content: "Demo equipment management and owner booking confirmations." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Owner,
});

function Owner() {
  const { t, lang } = useLang();
  const { userListings, bookings, decideRequest, removeListing } = useStore();
  const requests = ownerRequests(bookings, userListings);
  const pending = requests.filter((b) => !b.status || b.status === "pending").length;
  return <main className="mx-auto max-w-6xl px-4 py-10">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3"><h1 className="text-3xl font-semibold sm:text-4xl">{t("navOwner")}</h1><DemoBadge /></div>
      <Button asChild className="rounded-full"><Link to="/list-equipment"><Plus />{t("navList")}</Link></Button>
    </div>
    <p className="mt-3 max-w-2xl text-muted-foreground">{t("ownerSub")}</p>
    <div className="mt-8 grid grid-cols-3 divide-x border-y py-5">
      {[[t("yourListings"), userListings.length], [t("pending"), pending], [t("statusConfirmed"), requests.filter((b) => b.status === "confirmed").length]].map(([label, value]) => <div key={label} className="px-3 first:pl-0"><div className="text-3xl font-semibold text-primary">{value}</div><div className="mt-1 text-sm text-muted-foreground">{label}</div></div>)}
    </div>
    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold"><Inbox className="h-5 w-5 text-primary" />{t("incoming")}</h2>
        {!requests.length ? <div className="mt-6 border-y border-dashed py-12 text-center text-muted-foreground"><Inbox className="mx-auto mb-3 h-10 w-10" /><p>{t("noOwnerRequests")}</p></div> : <ul className="mt-5 space-y-4">{requests.map((b) => <li key={b.id} className="rounded-lg border bg-card p-4 shadow-card">
          <div className="flex items-start gap-3"><img src={b.image} alt="" className="h-16 w-20 shrink-0 rounded-md object-cover" /><div className="min-w-0"><h3 className="font-display text-lg font-semibold">{lang === "kn" ? b.listingNameKn : b.listingName}</h3><p className="font-mono text-xs text-muted-foreground">{b.id}</p></div></div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm"><span className="flex items-center gap-1.5"><User className="h-4 w-4 text-primary" />{b.name}</span><span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-primary" />{b.startDate}</span><span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" />{b.duration} {t(b.unit)}</span><span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-primary" />{t(b.delivery)}</span></div>
          {b.note && <p className="mt-3 break-words text-sm text-muted-foreground">{b.note}</p>}
          <p className="mt-3 text-sm">{t("estimate")}: <strong className="text-primary">{inr(b.estimate)}</strong></p>
          <div className="mt-4 flex flex-wrap items-center gap-2">{!b.status || b.status === "pending" ? <><Button onClick={() => { decideRequest(b.id, "confirmed"); toast.success(t("statusConfirmed")); }}><Check />{t("acceptBooking")}</Button><Button variant="outline" onClick={() => { decideRequest(b.id, "declined"); toast(t("statusDeclined")); }}><X />{t("declineBooking")}</Button></> : <span className={`text-sm font-semibold ${b.status === "confirmed" ? "text-success" : "text-destructive"}`}>{t(b.status === "confirmed" ? "statusConfirmed" : "statusDeclined")}</span>}<DemoBadge /></div>
        </li>)}</ul>}
      </section>
      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold"><Tractor className="h-5 w-5 text-primary" />{t("yourListings")}</h2>
        {!userListings.length ? <div className="mt-6 border-y border-dashed py-12 text-center"><Tractor className="mx-auto mb-3 h-10 w-10 text-muted-foreground" /><p className="text-muted-foreground">{t("noEquipment")}</p><Button asChild variant="link" className="mt-2"><Link to="/list-equipment"><Plus />{t("navList")}</Link></Button></div> : <ul className="mt-5 divide-y border-y">{userListings.map((l) => <li key={l.id} className="flex items-center gap-3 py-4"><img src={l.image} alt="" className="h-16 w-20 shrink-0 rounded-md object-cover" /><div className="min-w-0 flex-1"><h3 className="break-words font-semibold">{lang === "kn" ? l.nameKn : l.name}</h3><p className="text-sm text-muted-foreground">{l.area}</p><p className="text-sm font-semibold text-primary">{inr(l.pricePerDay)}{t("perDay")}</p></div><Button variant="ghost" size="icon" className="shrink-0 text-destructive" aria-label={`${t("remove")} ${l.name}`} title={t("remove")} onClick={() => removeListing(l.id)}><Trash2 /></Button></li>)}</ul>}
      </section>
    </div>
  </main>;
}