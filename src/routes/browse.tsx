import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Search, SearchX } from "lucide-react";
import { z } from "zod";
import { CATEGORIES, sortAndFilter, type Category } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { ListingCard } from "@/components/ListingCard";
import { DemoBadge } from "@/components/Layout";

const searchSchema = z.object({
  q: z.string().max(80).optional().catch(undefined),
  cat: z.enum(CATEGORIES).optional().catch(undefined),
  sort: z.enum(["rel", "low", "high"]).optional().catch(undefined),
  avail: z.boolean().optional().catch(undefined),
});

export const Route = createFileRoute("/browse")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Browse farm equipment — Krishibandu (demo)" },
      { name: "description", content: "Search and filter sample tractors, tillers, harvesters, sprayers and trailers for rent in Karnataka." },
      { property: "og:title", content: "Browse farm equipment — Krishibandu" },
      { property: "og:description", content: "Filter demo machinery listings by category, location and price." },
    ],
  }),
  component: Browse,
});

function Browse() {
  const { t } = useLang();
  const { listings } = useStore();
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/browse" });
  const q = s.q ?? "";
  const cat: Category | "All" = s.cat ?? "All";
  const sort = s.sort ?? "rel";
  const avail = s.avail ?? false;
  const update = (patch: Partial<typeof s>) => navigate({ search: (p) => ({ ...p, ...patch }), replace: true });

  const results = useMemo(() => sortAndFilter(listings, { q, category: cat, sort, onlyAvailable: avail }), [listings, q, cat, sort, avail]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold sm:text-4xl">{t("browseTitle")}</h1>
        <DemoBadge />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <label className="flex items-center gap-2 rounded-2xl border bg-card px-3">
          <Search className="h-5 w-5 text-muted-foreground" aria-hidden />
          <span className="sr-only">{t("search")}</span>
          <input value={q} maxLength={80} onChange={(e) => update({ q: e.target.value || undefined })} placeholder={t("searchPh")} className="w-full bg-transparent py-3 outline-none" />
        </label>
        <label className="flex items-center gap-2 rounded-2xl border bg-card px-3 text-sm">
          <span className="text-muted-foreground">{t("sort")}</span>
          <select value={sort} onChange={(e) => update({ sort: e.target.value as "rel" | "low" | "high" })} className="bg-transparent py-3 font-medium outline-none">
            <option value="rel">{t("sortRel")}</option>
            <option value="low">{t("sortLow")}</option>
            <option value="high">{t("sortHigh")}</option>
          </select>
        </label>
        <label className="flex cursor-pointer items-center gap-2 rounded-2xl border bg-card px-4 py-3 text-sm font-medium">
          <input type="checkbox" checked={avail} onChange={(e) => update({ avail: e.target.checked || undefined })} className="h-4 w-4 accent-[var(--primary)]" />
          {t("onlyAvail")}
        </label>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2" role="group" aria-label={t("category")}>
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            aria-pressed={cat === c}
            onClick={() => update({ cat: c === "All" ? undefined : c })}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}
          >
            {c === "All" ? t("all") : t(c)}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">{results.length} {t("results")}</p>

      {results.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed bg-card p-12 text-center">
          <SearchX className="h-12 w-12 text-muted-foreground" />
          <h2 className="mt-3 text-xl font-semibold">{t("noResults")}</h2>
          <p className="mt-1 text-muted-foreground">{t("noResultsSub")}</p>
          <button onClick={() => navigate({ search: {}, replace: true })} className="mt-4 rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground">{t("clear")}</button>
        </div>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  );
}
