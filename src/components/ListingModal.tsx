import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, MapPin, User, X, ShieldAlert, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { inr, makeBookingId, type Listing } from "@/lib/data";
import { useLang, type TKey } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { validateBooking, whatsappLink, type BookingForm } from "@/lib/validation";
import { Availability } from "./ListingCard";
import { DemoBadge } from "./Layout";
import { Button } from "@/components/ui/button";

export function ListingModal() {
  const { listings, selectedId, openListing } = useStore();
  const listing = listings.find((l) => l.id === selectedId) ?? null;
  const [step, setStep] = useState<"detail" | "book" | "done">("detail");
  const [doneId, setDoneId] = useState("");
  useEffect(() => { if (selectedId) setStep("detail"); }, [selectedId]);

  return (
    <Dialog.Root open={!!listing} onOpenChange={(o) => !o && openListing(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-3xl bg-card shadow-card sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl">
          {listing && (
            <>
              <Dialog.Close className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-card/90 shadow" aria-label="Close">
                <X className="h-5 w-5" />
              </Dialog.Close>
              {step === "detail" && <Detail listing={listing} onBook={() => setStep("book")} />}
              {step === "book" && (
                <BookForm listing={listing} onBack={() => setStep("detail")} onDone={(id) => { setDoneId(id); setStep("done"); }} />
              )}
              {step === "done" && <Done id={doneId} />}
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Detail({ listing, onBook }: { listing: Listing; onBook: () => void }) {
  const { t, lang } = useLang();
  const wa = whatsappLink(listing.phone, `Hi, I saw your ${listing.name} on Krishibandu. Is it available for rent?`);
  return (
    <div>
      <div className="relative aspect-[16/9]">
        <img src={listing.image} alt={listing.name} className="h-full w-full object-cover sm:rounded-t-3xl rounded-t-3xl" />
        <DemoBadge className="absolute left-4 top-4" />
      </div>
      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{t(listing.category)}</span> · <Availability available={listing.available} />
          </div>
          <Dialog.Title className="mt-1 font-display text-2xl font-semibold">{lang === "kn" ? listing.nameKn : listing.name}</Dialog.Title>
          <Dialog.Description className="mt-2 text-muted-foreground">{lang === "kn" ? listing.descriptionKn : listing.description}</Dialog.Description>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-muted p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("rate")}</div>
            {listing.pricePerHour && <div className="mt-1">{inr(listing.pricePerHour)}{t("perHour")}</div>}
            <div className="text-xl font-bold text-primary">{inr(listing.pricePerDay)}{t("perDay")}</div>
          </div>
          <div className="rounded-2xl bg-muted p-4 text-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("specs")}</div>
            <dl className="mt-1 space-y-1">
              <div className="flex justify-between gap-2"><dt>{t("power")}</dt><dd className="font-medium">{listing.power}</dd></div>
              <div className="flex justify-between gap-2"><dt>{t("operator")}</dt><dd className="font-medium">{listing.operator ? t("yes") : t("no")}</dd></div>
            </dl>
          </div>
        </div>
        <div className="space-y-1.5 text-sm">
          <p className="flex items-center gap-2"><User className="h-4 w-4 text-primary" /> {t("owner")}: <strong>{listing.owner}</strong></p>
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {listing.area}</p>
          {wa ? (
            <div className="pt-1">
              <Button asChild variant="outline" className="h-auto whitespace-normal rounded-full border-success text-success hover:bg-secondary hover:text-success">
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> {t("whatsappOwner")}
              </a>
              </Button>
              <p className="mt-1 text-xs text-muted-foreground">{t("whatsappNote")}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">{t("contact")}: {t("contactHidden")}</p>
          )}
        </div>
        {!listing.available && <p className="rounded-xl bg-accent-soft p-3 text-sm">{t("unavailableNote")}</p>}
        <button onClick={onBook} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground transition hover:bg-primary-deep">
          {t("requestBooking")}
        </button>
      </div>
    </div>
  );
}

function FieldError({ k }: { k?: TKey | undefined }) {
  const { t } = useLang();
  if (!k) return null;
  return <p role="alert" className="mt-1 text-sm text-destructive">{t(k)}</p>;
}

function BookForm({ listing, onBack, onDone }: { listing: Listing; onBack: () => void; onDone: (id: string) => void }) {
  const { t, lang } = useLang();
  const { addBooking } = useStore();
  const [f, setF] = useState<BookingForm>({
    startDate: "", duration: "1", unit: listing.pricePerHour ? "hours" : "days", delivery: "deliver", name: "", phone: "", note: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, TKey>>>({});
  const set = (k: keyof BookingForm, v: string) => setF((p) => ({ ...p, [k]: v }));
  const dur = Number(f.duration) || 0;
  const rate = f.unit === "hours" ? (listing.pricePerHour ?? 0) : listing.pricePerDay;
  const estimate = rate * dur;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateBooking(f, new Date());
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const id = makeBookingId();
    addBooking({
      id, listingId: listing.id, listingName: listing.name, listingNameKn: listing.nameKn, image: listing.image,
      startDate: f.startDate, duration: dur, unit: f.unit, delivery: f.delivery,
      name: f.name.trim(), phone: f.phone.trim(), note: f.note.trim().slice(0, 300), estimate, createdAt: new Date().toISOString(),
    });
    toast.success(t("confirmed"), { description: `${t("bookingId")}: ${id}` });
    onDone(id);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-4 p-5 sm:p-6">
      <button type="button" onClick={onBack} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> {t("back")}
      </button>
      <Dialog.Title className="font-display text-2xl font-semibold">{t("requestBooking")}</Dialog.Title>
      <Dialog.Description className="text-muted-foreground">{lang === "kn" ? listing.nameKn : listing.name} · {listing.owner}</Dialog.Description>
      <div className="flex gap-2 rounded-xl bg-accent-soft p-3 text-sm"><ShieldAlert className="h-5 w-5 shrink-0 text-accent" /> {t("demoNotice")}</div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-date" className="mb-1 block text-sm font-medium">{t("startDate")} *</label>
          <input id="bk-date" type="date" className="input-field" value={f.startDate} onChange={(e) => set("startDate", e.target.value)} aria-invalid={!!errors.startDate} />
          <FieldError k={errors.startDate} />
        </div>
        <div>
          <label htmlFor="bk-dur" className="mb-1 block text-sm font-medium">{t("duration")} *</label>
          <div className="flex gap-2">
            <input id="bk-dur" type="number" min={1} max={30} className="input-field" value={f.duration} onChange={(e) => set("duration", e.target.value)} aria-invalid={!!errors.duration} />
            <select aria-label={t("duration")} className="input-field max-w-32" value={f.unit} onChange={(e) => set("unit", e.target.value)}>
              {listing.pricePerHour && <option value="hours">{t("hours")}</option>}
              <option value="days">{t("days")}</option>
            </select>
          </div>
          <FieldError k={errors.duration} />
        </div>
      </div>

      <fieldset>
        <legend className="mb-1 text-sm font-medium">{t("delivery")}</legend>
        <div className="grid grid-cols-2 gap-2">
          {(["deliver", "pickup"] as const).map((d) => (
            <label key={d} className={`cursor-pointer rounded-xl border p-3 text-sm font-medium transition ${f.delivery === d ? "border-primary bg-secondary" : ""}`}>
              <input type="radio" name="delivery" value={d} checked={f.delivery === d} onChange={() => set("delivery", d)} className="sr-only" />
              {t(d)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-name" className="mb-1 block text-sm font-medium">{t("farmerName")} *</label>
          <input id="bk-name" className="input-field" maxLength={60} value={f.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} />
          <FieldError k={errors.name} />
        </div>
        <div>
          <label htmlFor="bk-phone" className="mb-1 block text-sm font-medium">{t("phone")} *</label>
          <input id="bk-phone" type="tel" inputMode="numeric" className="input-field" maxLength={14} placeholder="98XXXXXXXX" value={f.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} />
          <FieldError k={errors.phone} />
        </div>
      </div>
      <div>
        <label htmlFor="bk-note" className="mb-1 block text-sm font-medium">{t("note")}</label>
        <textarea id="bk-note" rows={2} maxLength={300} className="input-field" value={f.note} onChange={(e) => set("note", e.target.value)} />
      </div>
      <div className="flex items-center justify-between rounded-xl bg-muted p-3">
        <span className="text-sm">{t("estimate")}</span>
        <strong className="text-lg text-primary">{inr(estimate)}</strong>
      </div>
      <button type="submit" className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground transition hover:bg-primary-deep">
        {t("sendRequest")}
      </button>
    </form>
  );
}

function Done({ id }: { id: string }) {
  const { t } = useLang();
  const { openListing } = useStore();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 p-8 text-center">
      <CheckCircle2 className="h-16 w-16 text-success" />
      <Dialog.Title className="font-display text-2xl font-semibold">{t("confirmed")}</Dialog.Title>
      <div className="rounded-2xl border-2 border-dashed border-primary px-6 py-3">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{t("bookingId")}</div>
        <div className="font-mono text-xl font-bold">{id}</div>
      </div>
      <Dialog.Description className="max-w-sm text-sm text-muted-foreground">{t("demoNotice")}</Dialog.Description>
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <button onClick={() => { openListing(null); navigate({ to: "/bookings" }); }} className="flex-1 rounded-full bg-primary py-3 font-semibold text-primary-foreground">{t("viewBookings")}</button>
        <button onClick={() => openListing(null)} className="flex-1 rounded-full border py-3 font-semibold">{t("close")}</button>
      </div>
    </div>
  );
}
