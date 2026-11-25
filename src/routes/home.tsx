import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarClock, CheckCircle2, FileText, MapPin, MessageSquarePlus, MessagesSquare, Receipt, Wallet, Workflow } from "lucide-react";
import logo from "@/assets/logo-gold.png";
import { BellButton, BottomNav, Card, SectionTitle } from "@/components/app/ui";
import { activity, pkr, projects } from "@/lib/data";
import { allInstallments, allUnits, countStatuses, formatDue, nextDue, portfolioFigures, remaining } from "@/lib/portfolio";
import { useStore } from "@/lib/store";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

const statusTone: Record<string, string> = {
  Paid: "bg-success",
  "Partially Paid": "bg-warning",
  Due: "bg-gold",
  Upcoming: "bg-info",
  Overdue: "bg-destructive",
};
const statusText: Record<string, string> = {
  Paid: "text-success",
  "Partially Paid": "text-warning",
  Due: "text-gold-deep",
  Upcoming: "text-info",
  Overdue: "text-destructive",
};

export const Route = createFileRoute("/home")({
  head: () => seo("Home", "Your Giga Group investment overview at a glance."),
  component: Home,
});

function Home() {
  const { profile } = useStore();
  const portfolio = portfolioFigures();
  const holdings = allUnits();
  const featured = projects[0];
  const counts = countStatuses(allInstallments().map(({ installment }) => installment));
  const next = nextDue(holdings);

  return (
    <div className="pb-safe-nav min-h-screen bg-background">
      <section className="relative h-[350px] overflow-hidden rounded-b-[40px] bg-[#0a223b]">
        <div className="relative px-5 pt-[max(env(safe-area-inset-top),18px)]">
          <div className="flex items-center justify-between">
            <img src={logo} alt="Giga Group" className="-ml-2 h-[52px] w-[68px] object-cover object-center mix-blend-screen" />
            <div className="flex items-center gap-2">
              <BellButton light />
              <Link
                to="/profile"
                aria-label="Profile"
                className="grid h-10 w-10 place-items-center rounded-full bg-gold text-[13px] font-bold text-black ring-2 ring-white/30"
              >
                {profile.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </Link>
            </div>
          </div>
          <p className="mt-16 text-[13px] text-white/70">Welcome back</p>
          <h1 className="font-display text-[34px] font-semibold leading-none text-white">{profile.name.split(" ")[0]}</h1>
          <p className="mt-2 text-[13px] font-medium text-gold">{holdings.length} Units · {projects.length} Projects</p>
          <p className="mt-1 flex items-center gap-1.5 text-[13px] text-white/75">
            <Wallet className="h-3.5 w-3.5 text-gold" />
            {pkr(portfolio.total)} invested · {portfolio.pct}% paid
          </p>
        </div>
      </section>

      <div className="relative z-10 -mt-24 px-5">
        <Card className="border border-gold/25 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Total Investment</p>
              <p className="mt-1 font-display text-[28px] font-semibold leading-none text-primary">{pkr(portfolio.total)}</p>
            </div>
            <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-gold">{portfolio.pct}% paid</span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gold" style={{ width: `${portfolio.pct}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-muted px-2.5 py-3">
              <p className="text-[10px] text-muted-foreground">Paid</p>
              <p className="mt-1 text-[12px] font-bold text-primary">{pkr(portfolio.paid).replace("PKR ", "")}</p>
            </div>
            <div className="rounded-xl bg-muted px-2.5 py-3">
              <p className="text-[10px] text-muted-foreground">Outstanding</p>
              <p className="mt-1 text-[12px] font-bold text-primary">{pkr(portfolio.outstanding).replace("PKR ", "")}</p>
            </div>
            <div className="rounded-xl bg-muted px-2.5 py-3">
              <p className="text-[10px] text-muted-foreground">Next due</p>
              <p className="mt-1 text-[12px] font-bold text-primary">{next ? pkr(remaining(next.installment)).replace("PKR ", "") : "—"}</p>
            </div>
          </div>
          {next ? (
            <Link to="/units/$unitId" params={{ unitId: next.unit.id }} className="mt-3 flex items-center gap-3 rounded-xl border border-gold/30 bg-accent/60 p-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-gold">
                <CalendarClock className="h-[18px] w-[18px]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-muted-foreground">Next due · Unit {next.unit.number}</p>
                <p className="truncate text-[13.5px] font-semibold text-primary">{next.project.name}</p>
                <p className="truncate text-[12px] text-muted-foreground">{pkr(remaining(next.installment))} · {formatDue(next.installment.due)}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-gold-deep" />
            </Link>
          ) : (
            <p className="mt-3 rounded-xl bg-muted px-3 py-3 text-center text-[13px] text-muted-foreground">No upcoming installments</p>
          )}
        </Card>

        <SectionTitle>Quick actions</SectionTitle>
        <div className="grid grid-cols-4 gap-2.5">
          {[
            { to: "/account", l: "Payments", i: Wallet },
            { to: "/statement", l: "Statement", i: FileText },
            { to: "/approvals", l: "Approvals", i: Workflow },
            { to: "/query", l: "Query", i: MessageSquarePlus },
          ].map(({ to, l, i: I }) => (
            <Link key={to} to={to} className="flex flex-col items-center gap-2 rounded-2xl bg-primary px-1 py-3.5 text-white shadow-card transition active:scale-95">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-gold ring-1 ring-gold/40">
                <I className="h-[18px] w-[18px]" />
              </span>
              <span className="text-center text-[11px] font-semibold leading-tight text-white">{l}</span>
            </Link>
          ))}
        </div>

        <SectionTitle action={<Link to="/projects" className="text-[12.5px] font-semibold text-gold-deep">View all</Link>}>
          Projects
        </SectionTitle>
        <Link to="/projects/$id" params={{ id: featured.id }} className="block overflow-hidden rounded-2xl bg-card shadow-card">
          <img src={featured.image} alt={featured.name} className="h-44 w-full object-cover" />
          <div className="flex items-start justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-primary">{featured.name}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[12px] text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
                <span className="truncate">{featured.location}</span>
              </p>
            </div>
            <p className="shrink-0 text-[12px] font-semibold text-gold-deep">{featured.units.length} Units</p>
          </div>
        </Link>

        <SectionTitle action={<Link to="/account" className="text-[12.5px] font-semibold text-gold-deep">Schedule</Link>}>
          Payment overview
        </SectionTitle>
        <Card>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[12px] text-muted-foreground">{holdings.length} units · {projects.length} projects</p>
              <p className="mt-0.5 text-[15px] font-semibold text-primary">Portfolio payments</p>
            </div>
            <p className="font-display text-[20px] font-semibold text-primary">{portfolio.pct}%</p>
          </div>
          <div className="mt-3 flex h-2.5 gap-1 overflow-hidden rounded-full">
            {counts.map(({ status, count }) => (
              <div key={status} className={cn("rounded-full", statusTone[status])} style={{ flex: Math.max(count, 0.15) }} />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-5 text-center">
            {counts.map(({ status, count }) => (
              <Link key={status} to="/account" search={{ status }} className="flex flex-col items-center">
                <span className={cn("font-display text-[18px] font-semibold", statusText[status])}>{count}</span>
                <span className="text-[10px] leading-tight text-muted-foreground">{status}</span>
              </Link>
            ))}
          </div>
        </Card>

        <SectionTitle action={<Link to="/notifications" className="text-[12.5px] font-semibold text-gold-deep">See all</Link>}>
          Recent activity
        </SectionTitle>
        <Card className="py-1">
          {activity.map((a) => {
            const I = { query: MessagesSquare, approval: Workflow, payment: Receipt, verified: CheckCircle2 }[a.kind];
            return (
              <div key={a.title} className="flex items-center gap-3 border-b border-border/70 py-3 last:border-0">
                <span className={cn("grid h-9 w-9 place-items-center rounded-full", a.kind === "verified" ? "bg-success/12 text-success" : "bg-primary text-gold")}>
                  <I className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-primary">{a.title}</p>
                  <p className="truncate text-[12px] text-muted-foreground">{a.body}</p>
                </div>
                <span className="text-[11px] text-muted-foreground">{a.time}</span>
              </div>
            );
          })}
        </Card>
        <p className="mt-6 text-center text-[11px] text-muted-foreground">All figures are illustrative demo data.</p>
      </div>
      <BottomNav />
    </div>
  );
}
