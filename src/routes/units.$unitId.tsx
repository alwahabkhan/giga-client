import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Card, Row, SectionTitle, StatusBadge, SubScreen } from "@/components/app/ui";
import { pkr, type InstStatus } from "@/lib/data";
import { findUnit, formatDue, nextDue, remaining, unitFigures } from "@/lib/portfolio";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

const filters = ["All", "Paid", "Partially Paid", "Due", "Upcoming", "Overdue"] as const;
type F = (typeof filters)[number];

export const Route = createFileRoute("/units/$unitId")({
  validateSearch: (s: Record<string, unknown>): { status?: InstStatus } =>
    filters.includes(s.status as F) && s.status !== "All" ? { status: s.status as InstStatus } : {},
  loader: ({ params }) => {
    const match = findUnit(params.unitId);
    if (!match) throw notFound();
    return match;
  },
  head: ({ loaderData }) =>
    seo(
      loaderData ? `Unit ${loaderData.unit.number}` : "Unit",
      loaderData ? `${loaderData.project.name} · ${loaderData.unit.bookingRef}` : "Unit booking and installments",
    ),
  component: UnitDetail,
});

function UnitDetail() {
  const { project, unit } = Route.useLoaderData();
  const { status } = Route.useSearch();
  const navigate = useNavigate({ from: "/units/$unitId" });
  const figures = unitFigures(unit);
  const due = nextDue([{ project, unit }]);
  const list = unit.installments.filter((installment) => !status || installment.status === status);
  const r = 34;
  const c = 2 * Math.PI * r;

  return (
    <SubScreen title={project.name} subtitle={`Unit ${unit.number} · ${unit.bookingRef}`} back={`/projects/${project.id}`}>
      <div className="bg-navy-gradient mt-2 rounded-2xl p-5 text-primary-foreground shadow-float">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0">
            <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
              <circle cx="40" cy="40" r={r} fill="none" strokeWidth="7" className="stroke-primary-foreground/15" />
              <circle cx="40" cy="40" r={r} fill="none" strokeWidth="7" strokeLinecap="round" className="stroke-teal" strokeDasharray={c} strokeDashoffset={c - (c * figures.pct) / 100} />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-[15px] font-bold">{figures.pct}%</span>
          </div>
          <div>
            <p className="text-[12px] text-primary-foreground/65">Unit investment</p>
            <p className="font-display text-[22px] font-semibold">{pkr(figures.total)}</p>
            <p className="text-[11.5px] text-primary-foreground/65">Unit {unit.number} only</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-primary-foreground/10 pt-4">
          <div><p className="text-[10.5px] text-primary-foreground/60">Paid</p><p className="text-[12.5px] font-bold text-teal">{pkr(figures.paid)}</p></div>
          <div><p className="text-[10.5px] text-primary-foreground/60">Remaining</p><p className="text-[12.5px] font-bold">{pkr(figures.outstanding)}</p></div>
          <div><p className="text-[10.5px] text-primary-foreground/60">Next due</p><p className="text-[12.5px] font-bold">{due ? pkr(remaining(due.installment)) : "—"}</p></div>
        </div>
      </div>

      {due ? (
        <p className="mt-3 text-[12.5px] text-muted-foreground">Next due {pkr(remaining(due.installment))} · {formatDue(due.installment.due)}</p>
      ) : (
        <p className="mt-3 text-[12.5px] text-muted-foreground">No upcoming installments</p>
      )}

      <SectionTitle>Booking details</SectionTitle>
      <Card className="py-1">
        <Row label="Booking reference" value={unit.bookingRef} mono />
        <Row label="Unit" value={unit.number} />
        <Row label="Tower" value={unit.tower} />
        <Row label="Booking date" value={formatDue(unit.bookingDate)} />
        <Row label="Total investment" value={pkr(figures.total)} />
        <Row label="Total paid" value={<span className="text-success">{pkr(figures.paid)}</span>} />
        <Row label="Remaining amount" value={pkr(figures.outstanding)} />
      </Card>

      <SectionTitle>Installment schedule</SectionTitle>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
        {filters.map((filter) => {
          const active = (status ?? "All") === filter;
          return (
            <button key={filter} onClick={() => navigate({ search: filter === "All" ? {} : { status: filter } })} className={cn("shrink-0 rounded-full px-4 py-2 text-[12.5px] font-semibold transition", active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground shadow-card")}>
              {filter}
            </button>
          );
        })}
      </div>
      <div className="mt-3 space-y-2.5">
        {list.length === 0 && <Card className="text-center text-[13px] text-muted-foreground">No installments with this status.</Card>}
        {list.map((installment) => (
          <Link key={installment.id} to="/installment/$id" params={{ id: installment.id }} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card transition active:scale-[0.99]">
            <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-[13px] font-semibold", statusChip[installment.status])}>
              {String(installment.no).padStart(2, "0")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-primary">{pkr(installment.amount)}</p>
              <p className="text-[11.5px] text-muted-foreground">
                Due {formatDue(installment.due)}
                {installment.paidAmount > 0 ? ` · Paid ${pkr(installment.paidAmount)}` : ""}
                {remaining(installment) > 0 && installment.paidAmount > 0 ? ` · Left ${pkr(remaining(installment))}` : ""}
              </p>
            </div>
            <StatusBadge status={installment.status} />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </SubScreen>
  );
}

const statusChip: Record<InstStatus, string> = {
  Paid: "bg-success/12 text-success",
  "Partially Paid": "bg-warning/15 text-warning",
  Due: "bg-gold/25 text-gold-deep",
  Upcoming: "bg-info/12 text-info",
  Overdue: "bg-destructive/12 text-destructive",
};
