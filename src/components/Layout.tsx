import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Info, Menu, Tractor, X, Mail, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export function DemoBanner() {
  const { t } = useLang();
  return (
    <div role="note" className="bg-accent text-accent-foreground text-xs sm:text-sm font-medium">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2">
        <Info className="h-4 w-4 shrink-0" aria-hidden />
        <span>{t("demoBanner")}</span>
      </div>
    </div>
  );
}

export function DemoBadge({ className = "" }: { className?: string }) {
  const { t } = useLang();
  return (
    <span className={`inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold tracking-wider text-accent-foreground ${className}`}>
      {t("demo")}
    </span>
  );
}

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className="inline-flex rounded-full border bg-card p-0.5 text-sm">
      {(["en", "kn"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 font-medium transition ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {l === "en" ? "English" : "ಕನ್ನಡ"}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useLang();
  const { bookings } = useStore();
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/", label: t("navHome") },
    { to: "/browse", label: t("navBrowse") },
    { to: "/bookings", label: t("navBookings"), count: bookings.length },
    { to: "/list-equipment", label: t("navList") },
    { to: "/owner", label: t("navOwner") },
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Tractor className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-primary-deep">Krishibandu</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
            >
              {l.label}
              {"count" in l && l.count > 0 && (
                <span className="ml-1.5 rounded-full bg-accent px-1.5 text-xs text-accent-foreground">{l.count}</span>
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle />
          <button
            className="grid h-10 w-10 place-items-center rounded-full border md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={t("menu")}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t bg-card md:hidden" aria-label="Mobile">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-medium"
                activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              >
                {l.label}
                {"count" in l && l.count > 0 && <span className="ml-2 rounded-full bg-accent px-1.5 text-xs text-accent-foreground">{l.count}</span>}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-16 bg-primary-deep text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl font-semibold">Krishibandu</div>
          <p className="mt-2 text-sm opacity-80">{t("footerTag")}</p>
        </div>
        <div className="text-sm">
          <div className="mb-2 flex items-center gap-2 font-semibold">{t("footerContact")} <DemoBadge /></div>
          <p className="flex items-center gap-2 opacity-80"><Phone className="h-4 w-4" /> +91 00000 00000</p>
          <p className="mt-1 flex items-center gap-2 opacity-80"><Mail className="h-4 w-4" /> hello@krishibandu.example</p>
        </div>
        <nav className="flex flex-col gap-1 text-sm opacity-90" aria-label="Footer">
          <Link to="/browse" className="hover:underline">{t("navBrowse")}</Link>
          <Link to="/bookings" className="hover:underline">{t("navBookings")}</Link>
          <Link to="/list-equipment" className="hover:underline">{t("navList")}</Link>
        </nav>
      </div>
      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs opacity-75">{t("disclaimer")}</p>
      </div>
    </footer>
  );
}
