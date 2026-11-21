import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Building2, ChevronRight, FileText, Receipt } from "lucide-react";
import { Card, SectionTitle, StatusBadge, TabScreen } from "@/components/app/ui";
import { installments, pkr, projects, type InstStatus } from "@/lib/data";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

const filters = ["All", "Paid", "Pending", "Upcoming", "Overdue"] as const;
type F = (typeof filters)[number];

export const Route = createFileRoute("/account")({
  validateSearch: (s: Record<string, unknown>): { status?: InstStatus } =>
    filters.includes(s.status as F) && s.status !== "All" ? { status: s.status as InstStatus } : {},
  head: () => seo("My Account", "Payments, installment schedule and receipts for your Giga Group investment."),
  component: Account,
});

function Account() {
  const { status } = Route.useSearch();
  const navigate = useNavigate({ from: "/account" });
  const p = projects[0];
  const pct = Math.round((p.paid / p.total) * 100);
  const list = installments.filter((i) => !status || i.status === status);
  const next = installments.find((i) => i.status === "Upcoming")!;
  const r = 34, c = 2 * Math.PI * r;

  return (
    <TabScreen title="My Account" subtitle={`${p.name} · ${p.ref}`}>
      <div className="bg-navy-gradient rounded-2xl p-5 text-primary-foreground shadow-float">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0">
            <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
              <circle cx="40" cy="40" r={r} fill="none" strokeWidth="7" className="stroke-primary-foreground/15" />
              <circle cx="40" cy="40" r={r} fill="none" strokeWidth="7" strokeLinecap="round" className="stroke-teal" strokeDasharray={c} strokeDashoffset={c - (c * pct) / 100} />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-[15px] font-bold">{pct}%</span>
          </div>
          <div>
            <p className="text-[12px] text-primary-foreground/65">Total Investment</p>
            <p className="font-display text-[22px] font-semibold">{pkr(p.total)}</p>
            <p className="text-[11.5px] text-primary-foreground/65">Payment progress</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-primary-foreground/10 pt-4">
          <div><p className="text-[10.5px] text-primary-foreground/60">Received</p><p className="text-[12.5px] font-bold text-teal">{pkr(p.paid)}</p></div>
          <div><p className="text-[10.5px] text-primary-foreground/60">Remaining</p><p className="text-[12.5px] font-bold">{pkr(p.total - p.paid)}</p></div>
          <div><p className="text-[10.5px] text-primary-foreground/60">Next · {next.due.slice(0, 6)}</p><p className="text-[12.5px] font-bold">{pkr(next.amount)}</p></div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {[
          { to: "/statement", l: "Statement", i: FileText },
          { to: "/receipts", l: "Receipts", i: Receipt },
          { to: "/projects", l: "Projects", i: Building2 },
        ].map(({ to, l, i: I }) => (
          <Link key={to} to={to} className="flex items-center gap-2 rounded-xl bg-card px-3 py-3 shadow-card">
            <I className="h-4 w-4 text-teal" /><span className="text-[12.5px] font-semibold text-primary">{l}</span>
          </Link>
        ))}
      </div>

      <SectionTitle>Installment schedule</SectionTitle>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
        {filters.map((f) => {
          const active = (status ?? "All") === f;
          return (
            <button key={f} onClick={() => navigate({ search: f === "All" ? {} : { status: f } })} className={cn("shrink-0 rounded-full px-4 py-2 text-[12.5px] font-semibold transition", active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground shadow-card")}>
              {f}
            </button>
          );
        })}
      </div>
      <div className="mt-3 space-y-2.5">
        {list.length === 0 && <Card className="text-center text-[13px] text-muted-foreground">No installments with this status.</Card>}
        {list.map((i) => (
          <Link key={i.id} to="/installment/$id" params={{ id: i.id }} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card transition active:scale-[0.99]">
            <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-[14px] font-semibold", { Paid: "bg-success/12 text-success", Pending: "bg-warning/15 text-warning", Upcoming: "bg-info/12 text-info", Overdue: "bg-destructive/12 text-destructive" }[i.status])}>
              {i.id}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-primary">{pkr(i.amount)}</p>
              <p className="text-[11.5px] text-muted-foreground">Due {i.due}{i.paidOn ? ` · Paid ${i.paidOn}` : ""}</p>
            </div>
            <StatusBadge status={i.status} />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
      </div>
      <p className="mt-6 text-center text-[11px] text-muted-foreground">Payments are made through Giga Group's official channels. This app shows your records only.</p>
    </TabScreen>
  );
}
