import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES, CATEGORY_IMAGE, inr, type Category } from "@/lib/data";
import { useLang, type TKey } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { validateListing, type ListingForm } from "@/lib/validation";
import { DemoBadge } from "@/components/Layout";

export const Route = createFileRoute("/list-equipment")({
  head: () => ({
    meta: [
      { title: "List your equipment — Krishibandu (demo)" },
      { name: "description", content: "Add your tractor, tiller or other farm machine as a demo rental listing." },
      { property: "og:title", content: "List your equipment — Krishibandu" },
      { property: "og:description", content: "Owners can list idle machines for nearby farmers (demo)." },
    ],
  }),
  component: ListEquipment,
});

const empty: ListingForm = { name: "", category: "", price: "", location: "", phone: "" };

function ListEquipment() {
  const { t } = useLang();
  const { addListing, userListings, removeListing } = useStore();
  const [f, setF] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof ListingForm, TKey>>>({});
  const [done, setDone] = useState(false);
  const set = (k: keyof ListingForm, v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateListing(f);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const cat = f.category as Category;
    const name = f.name.trim().slice(0, 60);
    addListing({
      id: `user-${Date.now()}`, name, nameKn: name, category: cat, owner: "You (demo)",
      area: f.location.trim().slice(0, 60), pricePerHour: null, pricePerDay: Math.round(Number(f.price)),
      available: true, image: CATEGORY_IMAGE[cat], power: "—", operator: false,
      description: "Listed by you in this demo.", descriptionKn: "ಈ ಡೆಮೊದಲ್ಲಿ ನೀವು ಸೇರಿಸಿದ ಯಂತ್ರ.", userAdded: true, phone: f.phone.trim(),
    });
    toast.success(t("listed"));
    setF(empty);
    setDone(true);
  };

  const Err = ({ k }: { k: keyof ListingForm }) => errors[k] ? <p role="alert" className="mt-1 text-sm text-destructive">{t(errors[k]!)}</p> : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold sm:text-4xl">{t("listTitle")}</h1>
        <DemoBadge />
      </div>
      <p className="mt-2 text-muted-foreground">{t("listSub")}</p>

      {done && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-success/40 bg-secondary p-4">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-success" />
          <div>
            <p className="font-semibold">{t("listed")}</p>
            <Link to="/browse" className="text-sm font-semibold text-primary underline">{t("navBrowse")}</Link>
          </div>
        </div>
      )}

      <form onSubmit={submit} noValidate className="mt-6 grid gap-4 rounded-3xl border bg-card p-6 shadow-card sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="le-name" className="mb-1 block text-sm font-medium">{t("machineName")} *</label>
          <input id="le-name" maxLength={60} className="input-field" value={f.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor="le-cat" className="mb-1 block text-sm font-medium">{t("category")} *</label>
          <select id="le-cat" className="input-field" value={f.category} onChange={(e) => set("category", e.target.value)} aria-invalid={!!errors.category}>
            <option value="">—</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{t(c)}</option>)}
          </select>
          <Err k="category" />
        </div>
        <div>
          <label htmlFor="le-price" className="mb-1 block text-sm font-medium">{t("pricePerDay")} *</label>
          <input id="le-price" type="number" min={100} max={100000} className="input-field" value={f.price} onChange={(e) => set("price", e.target.value)} aria-invalid={!!errors.price} />
          <Err k="price" />
        </div>
        <div>
          <label htmlFor="le-loc" className="mb-1 block text-sm font-medium">{t("location")} *</label>
          <input id="le-loc" maxLength={60} placeholder="Hassan, Karnataka" className="input-field" value={f.location} onChange={(e) => set("location", e.target.value)} aria-invalid={!!errors.location} />
          <Err k="location" />
        </div>
        <div>
          <label htmlFor="le-phone" className="mb-1 block text-sm font-medium">{t("phone")} *</label>
          <input id="le-phone" type="tel" inputMode="numeric" maxLength={14} placeholder="98XXXXXXXX" className="input-field" value={f.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} />
          <Err k="phone" />
        </div>
        <button type="submit" className="rounded-full bg-primary py-3 font-semibold text-primary-foreground transition hover:bg-primary-deep sm:col-span-2">{t("submitListing")}</button>
      </form>

      {userListings.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">{t("yourListings")}</h2>
          <ul className="mt-4 divide-y rounded-2xl border bg-card">
            {userListings.map((l) => (
              <li key={l.id} className="flex items-center gap-3 p-3">
                <img src={l.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="font-semibold">{l.name}</div>
                  <div className="text-sm text-muted-foreground">{t(l.category)} · {l.area} · {inr(l.pricePerDay)}{t("perDay")}</div>
                </div>
                <button onClick={() => removeListing(l.id)} className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10" aria-label={`${t("remove")} ${l.name}`}>
                  <Trash2 className="h-4 w-4" /> <span className="hidden sm:inline">{t("remove")}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
