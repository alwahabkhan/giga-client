import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertCircle, ChevronRight, FileText, MessageSquarePlus } from "lucide-react";
import { Card, Row, SectionTitle, StatusBadge, SubScreen } from "@/components/app/ui";
import { pkr } from "@/lib/data";
import { findInstallment, formatDue, remaining } from "@/lib/portfolio";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/installment/$id")({
  loader: ({ params }) => {
    const match = findInstallment(params.id);
    if (!match) throw notFound();
    return match;
  },
  head: ({ loaderData }) => seo(loaderData ? `Installment ${loaderData.installment.no}` : "Installment", "Installment details for one unit."),
  component: InstallmentDetail,
});

function InstallmentDetail() {
  const { project, unit, installment } = Route.useLoaderData();
  const left = remaining(installment);
  return (
    <SubScreen title={`Installment ${String(installment.no).padStart(2, "0")}`} subtitle={`${project.name} · Unit ${unit.number}`} back={`/units/${unit.id}`}>
      <Card className="mt-2 p-5 text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{project.name}</p>
        <p className="mt-1 text-[15px] font-semibold text-primary">Unit {unit.number}</p>
        <p className="font-mono text-[12px] text-muted-foreground">Booking {unit.bookingRef}</p>
        <p className="mt-4 text-[12px] text-muted-foreground">Installment amount</p>
        <p className="mt-1 font-display text-[28px] font-semibold text-primary">{pkr(installment.amount)}</p>
        <div className="mt-3 flex justify-center"><StatusBadge status={installment.status} /></div>
      </Card>
      {installment.status === "Overdue" && (
        <Card className="mt-3 flex gap-3 bg-destructive/8 shadow-none">
          <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
          <p className="text-[12.5px] leading-relaxed text-foreground">This installment is past its due date. Please contact your Giga Group representative to arrange payment.</p>
        </Card>
      )}
      <SectionTitle>Details</SectionTitle>
      <Card className="py-1">
        <Row label="Installment" value={installment.id} mono />
        <Row label="Project" value={project.name} />
        <Row label="Unit" value={`${unit.number} · ${unit.tower}`} />
        <Row label="Booking" value={unit.bookingRef} mono />
        <Row label="Amount" value={pkr(installment.amount)} />
        <Row label="Paid amount" value={pkr(installment.paidAmount)} />
        <Row label="Remaining" value={pkr(left)} />
        <Row label="Due date" value={formatDue(installment.due)} />
        <Row label="Payment date" value={installment.paidOn ? formatDue(installment.paidOn) : "—"} />
        <Row label="Payment status" value={<StatusBadge status={installment.status} />} />
        <Row label="Verification" value={<StatusBadge status={installment.verification} />} />
      </Card>
      <SectionTitle>Related receipt</SectionTitle>
      {installment.receipt ? (
        <Link to="/receipts" search={{ open: installment.receipt }} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground"><FileText className="h-5 w-5" /></span>
          <div className="flex-1"><p className="font-mono text-[13px] font-semibold text-primary">{installment.receipt}</p><p className="text-[11.5px] text-muted-foreground">Tap to preview receipt</p></div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Link>
      ) : (
        <Card className="text-[13px] text-muted-foreground">No receipt submitted for this installment yet.</Card>
      )}
      <Link to="/query" className="mt-5 flex items-center justify-center gap-2 text-[13px] font-semibold text-accent-foreground">
        <MessageSquarePlus className="h-4 w-4" /> Ask a question about this installment
      </Link>
    </SubScreen>
  );
}
