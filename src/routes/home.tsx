import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarClock, CheckCircle2, FileText, MapPin, MessageSquarePlus, MessagesSquare, Receipt, Wallet, Workflow } from "lucide-react";
import logo from "@/assets/logo-gold.png";
import { BellButton, BottomNav, Card, SectionTitle } from "@/components/app/ui";
import { activity, installments, pkr, projects } from "@/lib/data";
import { useStore } from "@/lib/store";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/home")({
  head: () => seo("Home", "Your Giga Group investment overview at a glance."),
  component: Home,
});

function Home() {
  const { profile } = useStore();
  const p = projects[0];
  const outstanding = p.total - p.paid;
  const pct = Math.round((p.paid / p.total) * 100);
  const counts = (["Paid", "Pending", "Upcoming", "Overdue"] as const).map((s) => ({ s, n: installments.filter((i) => i.status === s).length }));
  const next = installments.find((i) => i.status === "Upcoming")!;

  return (
    <div className="pb-safe-nav min-h-screen bg-background">
      <section className="relative h-[430px] overflow-hidden">
        <img src={p.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/30 to-background" />
        <div className="relative px-5 pt-[max(env(safe-area-inset-top),18px)]">
          <div className="flex items-center justify-between">
            <img src={logo} alt="Giga Group" className="-ml-3 h-[76px] w-[100px] object-cover object-center mix-blend-screen" />
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
          <p className="mt-3 text-[13px] text-white/70">Welcome back</p>
          <h1 className="font-display text-[34px] font-semibold leading-none text-white">{profile.name.split(" ")[0]}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-[13px] text-white/75">
            <MapPin className="h-3.5 w-3.5 text-gold" />
            {p.name} · {p.location}
          </p>
        </div>
      </section>

      <div className="relative z-10 -mt-24 px-5">
        <Card className="border border-gold/25 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Total Investment</p>
              <p className="mt-1 font-display text-[28px] font-semibold leading-none text-primary">{pkr(p.total)}</p>
            </div>
            <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-gold">{pct}% paid</span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-muted px-2.5 py-3">
              <p className="text-[10px] text-muted-foreground">Paid</p>
              <p className="mt-1 text-[12px] font-bold text-primary">{pkr(p.paid).replace("PKR ", "")}</p>
            </div>
            <div className="rounded-xl bg-muted px-2.5 py-3">
              <p className="text-[10px] text-muted-foreground">Outstanding</p>
              <p className="mt-1 text-[12px] font-bold text-primary">{pkr(outstanding).replace("PKR ", "")}</p>
            </div>
            <div className="rounded-xl bg-muted px-2.5 py-3">
              <p className="text-[10px] text-muted-foreground">Next due</p>
              <p className="mt-1 text-[12px] font-bold text-primary">{pkr(next.amount).replace("PKR ", "")}</p>
            </div>
          </div>
          <Link to="/installment/$id" params={{ id: next.id }} className="mt-3 flex items-center gap-3 rounded-xl border border-gold/30 bg-accent/60 p-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-gold">
              <CalendarClock className="h-[18px] w-[18px]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-muted-foreground">Next installment</p>
              <p className="truncate text-[13.5px] font-semibold text-primary">
                {pkr(next.amount)} · {next.due}
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gold-deep" />
          </Link>
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
        <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-0 pb-1">
          {projects.map((item) => (
            <Link key={item.id} to="/projects/$id" params={{ id: item.id }} className="w-[88%] shrink-0 snap-start overflow-hidden rounded-2xl bg-card shadow-card">
              <img src={item.image} alt={item.name} className="h-44 w-full object-cover" />
              <div className="flex h-[76px] items-start justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-primary">{item.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[12px] text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
                    <span className="truncate">{item.location}</span>
                  </p>
                </div>
                <p className="shrink-0 font-mono text-[11px] font-semibold text-gold-deep">{item.ref}</p>
              </div>
            </Link>
          ))}
        </div>

        <SectionTitle action={<Link to="/account" className="text-[12.5px] font-semibold text-gold-deep">Schedule</Link>}>
          Payment overview
        </SectionTitle>
        <Card>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[12px] text-muted-foreground">Reference {p.ref}</p>
              <p className="mt-0.5 text-[15px] font-semibold text-primary">{p.name}</p>
            </div>
            <p className="font-display text-[20px] font-semibold text-primary">{pct}%</p>
          </div>
          <div className="mt-3 flex h-2.5 gap-1 overflow-hidden rounded-full">
            {installments.map((i) => (
              <div key={i.id} className={cn("flex-1 rounded-full", { Paid: "bg-success", Pending: "bg-warning", Upcoming: "bg-info", Overdue: "bg-destructive" }[i.status])} />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-4 text-center">
            {counts.map(({ s, n }) => (
              <Link key={s} to="/account" search={{ status: s }} className="flex flex-col items-center">
                <span className={cn("font-display text-[20px] font-semibold", { Paid: "text-success", Pending: "text-warning", Upcoming: "text-info", Overdue: "text-destructive" }[s])}>{n}</span>
                <span className="text-[11px] text-muted-foreground">{s}</span>
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
