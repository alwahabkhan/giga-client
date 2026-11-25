import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, ChevronLeft, Home, Inbox, MessageSquarePlus, User, Wallet, Workflow, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("grid h-9 w-9 place-items-center rounded-xl", light ? "bg-white/10 ring-1 ring-gold/50" : "bg-primary")}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path d="M4 20V9l8-5 8 5v11" className="stroke-gold" strokeWidth="2" strokeLinejoin="round" />
          <path d="M9 20v-6h6v6" className={light ? "stroke-white" : "stroke-primary-foreground"} strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>
      <span className={cn("font-display text-[15px] font-semibold tracking-tight", light ? "text-primary-foreground" : "text-primary")}>
        Giga Group
      </span>
    </div>
  );
}

const tabs: { to: string; label: string; icon: LucideIcon; match: string[] }[] = [
  { to: "/home", label: "Home", icon: Home, match: ["/home", "/projects", "/units"] },
  { to: "/account", label: "Account", icon: Wallet, match: ["/account", "/installment", "/statement", "/receipts"] },
  { to: "/approvals", label: "Approvals", icon: Workflow, match: ["/approvals"] },
  { to: "/query", label: "Query", icon: MessageSquarePlus, match: ["/query"] },
  { to: "/inbox", label: "Inbox", icon: Inbox, match: ["/inbox"] },
  { to: "/profile", label: "Profile", icon: User, match: ["/profile"] },
];

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t bg-card/95 px-2 pb-[max(env(safe-area-inset-bottom),10px)] pt-2 backdrop-blur">
      <ul className="grid grid-cols-6">
        {tabs.map((t) => {
          const active = t.match.some((m) => path.startsWith(m));
          const Icon = t.icon;
          return (
            <li key={t.to}>
              <Link to={t.to} className="flex flex-col items-center gap-1 py-1.5">
                <span className={cn("grid h-8 w-10 place-items-center rounded-full transition-colors", active ? "bg-primary text-gold" : "text-muted-foreground")}>
                  <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.2 : 1.7} />
                </span>
                <span className={cn("text-[10px] font-medium", active ? "text-primary" : "text-muted-foreground")}>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function BellButton({ light }: { light?: boolean }) {
  const { notices } = useStore();
  const unread = notices.filter((n) => !n.read).length;
  return (
    <Link
      to="/notifications"
      aria-label="Notifications"
      className={cn("relative grid h-10 w-10 place-items-center rounded-full", light ? "bg-primary-foreground/10 text-primary-foreground" : "bg-card text-primary shadow-card")}
    >
      <Bell className="h-[19px] w-[19px]" />
      {unread > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-black">{unread}</span>
      )}
    </Link>
  );
}

export function TabScreen({ title, subtitle, children, action }: { title: string; subtitle?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="pb-safe-nav min-h-screen">
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background/90 px-5 pb-3 pt-[max(env(safe-area-inset-top),18px)] backdrop-blur">
        <div>
          <h1 className="text-[22px] font-semibold text-primary">{title}</h1>
          {subtitle && <p className="text-[13px] text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {action}
          <BellButton />
        </div>
      </header>
      <div className="px-5">{children}</div>
      <BottomNav />
    </div>
  );
}

export function SubScreen({ title, subtitle, children, back, right, noNav, footer }: { title: string; subtitle?: string; children: ReactNode; back?: string; right?: ReactNode; noNav?: boolean; footer?: ReactNode }) {
  const navigate = useNavigate();
  return (
    <div className={cn("min-h-screen", noNav ? "pb-8" : "pb-safe-nav")}>
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-transparent bg-background/90 px-4 pb-3 pt-[max(env(safe-area-inset-top),16px)] backdrop-blur">
        <button
          aria-label="Back"
          onClick={() => (back ? navigate({ to: back }) : window.history.back())}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-card text-primary shadow-card"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[17px] font-semibold text-primary">{title}</h1>
          {subtitle && <p className="truncate text-[12px] text-muted-foreground">{subtitle}</p>}
        </div>
        {right}
      </header>
      <div className="px-5">{children}</div>
      {footer}
      {!noNav && <BottomNav />}
    </div>
  );
}

export function Card({ className, children, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-2xl bg-card p-4 shadow-card", className)} {...p}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 mt-7 flex items-center justify-between">
      <h2 className="text-[15px] font-semibold text-primary">{children}</h2>
      {action}
    </div>
  );
}

const tones: Record<string, string> = {
  Paid: "bg-success/12 text-success",
  Verified: "bg-success/12 text-success",
  Completed: "bg-success/12 text-success",
  Resolved: "bg-success/12 text-success",
  "Identity Verified": "bg-success/12 text-success",
  Active: "bg-success/12 text-success",
  Credit: "bg-success/12 text-success",
  Pending: "bg-warning/15 text-warning",
  "Under Verification": "bg-warning/15 text-warning",
  "Awaiting Response": "bg-warning/15 text-warning",
  "Under Review": "bg-warning/15 text-warning",
  Upcoming: "bg-info/12 text-info",
  Due: "bg-gold/25 text-gold-deep",
  "Partially Paid": "bg-warning/15 text-warning",
  "In Progress": "bg-info/12 text-info",
  New: "bg-teal/15 text-accent-foreground",
  Overdue: "bg-destructive/12 text-destructive",
  "Not Submitted": "bg-muted text-muted-foreground",
  Closed: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold", tones[status] ?? "bg-muted text-muted-foreground", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function Row({ label, value, mono }: { label: string; value: ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/70 py-3 last:border-0">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span className={cn("text-right text-[13.5px] font-semibold text-foreground", mono && "font-mono tracking-tight")}>{value}</span>
    </div>
  );
}

export function PrimaryButton({ className, variant = "teal", ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "teal" | "navy" | "outline" }) {
  return (
    <button
      className={cn(
        "flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold transition-all active:scale-[0.98] disabled:opacity-50",
        variant === "teal" && "bg-gold text-black shadow-float",
        variant === "navy" && "bg-primary text-primary-foreground",
        variant === "outline" && "border border-border bg-card text-primary",
        className,
      )}
      {...p}
    />
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-semibold text-foreground">{label}</span>
      {children}
    </label>
  );
}

export const inputCls =
  "h-12 w-full rounded-xl border border-input bg-card px-4 text-[14.5px] text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-gold focus:ring-4 focus:ring-gold/20";

export function DemoNote({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">{children}</p>;
}
