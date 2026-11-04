import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Search, MapPin, GitCompare, Send, Handshake, IndianRupee, Users, Receipt, Coins, ChevronDown } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { CATEGORIES, CATEGORY_IMAGE } from "@/lib/data";
import { useLang, type TKey } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { ListingCard } from "@/components/ListingCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Krishibandu — Rent the right farm machine (demo)" },
      { name: "description", content: "Rent tractors, rotavators, harvesters and sprayers from nearby owners in Karnataka. Student demo with sample data." },
      { property: "og:title", content: "Krishibandu — Rent the right farm machine" },
      { property: "og:description", content: "Farm machinery rental demo for Karnataka farmers. English / ಕನ್ನಡ." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useLang();
  const { listings, location, setLocation } = useStore();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/browse", search: { q: q.trim().slice(0, 80) || undefined } });
  };

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="" width={1600} height={912} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:pt-28">
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-primary-foreground sm:text-6xl">{t("heroTitle")}</h1>
          {lang === "en" && <p className="mt-3 text-lg font-medium text-accent-soft">ಸರಿಯಾದ ಯಂತ್ರ ಬಾಡಿಗೆಗೆ ಪಡೆಯಿರಿ. ಕೆಲಸ ಮುಗಿಸಿ.</p>}
          <p className="mt-4 max-w-xl text-primary-foreground/90">{t("heroSub")}</p>
          <form onSubmit={go} className="mt-8 grid max-w-3xl gap-2 rounded-3xl bg-card p-2 shadow-card sm:grid-cols-[1fr_auto_auto]">
            <label className="flex items-center gap-2 rounded-2xl px-3">
              <Search className="h-5 w-5 text-muted-foreground" aria-hidden />
              <span className="sr-only">{t("search")}</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} maxLength={80} placeholder={t("searchPh")} className="w-full bg-transparent py-3 outline-none" />
            </label>
            <label className="flex items-center gap-2 rounded-2xl bg-muted px-3">
              <MapPin className="h-5 w-5 text-primary" aria-hidden />
              <span className="sr-only">{t("location")}</span>
              <input value={location} onChange={(e) => setLocation(e.target.value.slice(0, 60))} className="w-full bg-transparent py-3 outline-none sm:w-44" />
            </label>
            <button className="rounded-2xl bg-accent px-6 py-3 font-semibold text-accent-foreground transition hover:brightness-95">{t("search")}</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold sm:text-3xl">{t("categories")}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link key={c} to="/browse" search={{ cat: c }} className="group relative aspect-square overflow-hidden rounded-2xl shadow-card">
              <img src={CATEGORY_IMAGE[c]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-hero-overlay" />
              <span className="absolute bottom-3 left-3 font-semibold text-primary-foreground">{t(c)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold sm:text-3xl">{t("featured")}</h2>
          <Link to="/browse" className="flex items-center gap-1 font-semibold text-primary">{t("seeAll")} <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.filter((l) => l.available).slice(0, 3).map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>

      <HowItWorks />
      <Benefits />
      <Faq />

      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-primary p-8 text-primary-foreground sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold">{t("ctaOwner")}</h2>
            <p className="mt-1 opacity-90">{t("ctaOwnerSub")}</p>
          </div>
          <Link to="/list-equipment" className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground">{t("navList")}</Link>
        </div>
      </section>
    </>
  );
}

function HowItWorks() {
  const { t } = useLang();
  const steps: { icon: typeof Search; k: TKey; d: TKey }[] = [
    { icon: Search, k: "s1", d: "s1d" }, { icon: GitCompare, k: "s2", d: "s2d" },
    { icon: Send, k: "s3", d: "s3d" }, { icon: Handshake, k: "s4", d: "s4d" },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-semibold sm:text-3xl">{t("howTitle")}</h2>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.k} className="relative rounded-2xl border bg-card p-5">
            <span className="absolute right-4 top-3 font-display text-4xl font-bold text-secondary">{i + 1}</span>
            <s.icon className="h-8 w-8 text-accent" aria-hidden />
            <h3 className="mt-3 text-lg font-semibold">{t(s.k)}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t(s.d)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Benefits() {
  const { t } = useLang();
  const items: { icon: typeof Search; k: TKey; d: TKey }[] = [
    { icon: IndianRupee, k: "b1", d: "b1d" }, { icon: Users, k: "b2", d: "b2d" },
    { icon: Receipt, k: "b3", d: "b3d" }, { icon: Coins, k: "b4", d: "b4d" },
  ];
  return (
    <section className="bg-secondary py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold sm:text-3xl">{t("benefitsTitle")}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((b) => (
            <div key={b.k}>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground"><b.icon className="h-6 w-6" /></span>
              <h3 className="mt-3 text-lg font-semibold">{t(b.k)}</h3>
              <p className="mt-1 text-sm text-secondary-foreground/80">{t(b.d)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useLang();
  const qs: [TKey, TKey][] = [["q1", "a1"], ["q2", "a2"], ["q3", "a3"], ["q4", "a4"]];
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <h2 className="text-2xl font-semibold sm:text-3xl">{t("faqTitle")}</h2>
      <div className="mt-6 divide-y rounded-2xl border bg-card">
        {qs.map(([q, a]) => (
          <details key={q} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
              {t(q)} <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
            </summary>
            <p className="mt-2 text-muted-foreground">{t(a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
