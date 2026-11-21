import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertCircle, ChevronRight, FileText, MessageSquarePlus } from "lucide-react";
import { Card, Row, SectionTitle, StatusBadge, SubScreen } from "@/components/app/ui";
import { installments, pkr, projects } from "@/lib/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/installment/$id")({
  loader: ({ params }) => {
    const i = installments.find((x) => x.id === params.id);
    if (!i) throw notFound();
    return i;
  },
  head: ({ loaderData }) => seo(`Installment ${loaderData?.id ?? ""}`, "Installment details and verification status."),
  component: InstallmentDetail,
});

function InstallmentDetail() {
  const i = Route.useLoaderData();
  return (
    <SubScreen title={`Installment ${i.id}`} subtitle={projects[0].name} back="/account">
      <Card className="mt-2 p-5 text-center">
        <p className="text-[12px] text-muted-foreground">Installment Amount</p>
        <p className="mt-1 font-display text-[28px] font-semibold text-primary">{pkr(i.amount)}</p>
        <div className="mt-3 flex justify-center"><StatusBadge status={i.status} /></div>
      </Card>
      {i.status === "Overdue" && (
        <Card className="mt-3 flex gap-3 bg-destructive/8 shadow-none">
          <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
          <p className="text-[12.5px] leading-relaxed text-foreground">This installment is past its due date. Please contact your Giga Group representative to arrange payment.</p>
        </Card>
      )}
      <SectionTitle>Details</SectionTitle>
      <Card className="py-1">
        <Row label="Installment Reference" value={`GG-2026-00125-I${i.id}`} mono />
        <Row label="Amount" value={pkr(i.amount)} />
        <Row label="Due Date" value={i.due} />
        <Row label="Payment Date" value={i.paidOn ?? "—"} />
        <Row label="Verification Status" value={<StatusBadge status={i.verification} />} />
      </Card>
      <SectionTitle>Related receipt</SectionTitle>
      {i.receipt ? (
        <Link to="/receipts" search={{ open: i.receipt }} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground"><FileText className="h-5 w-5" /></span>
          <div className="flex-1"><p className="font-mono text-[13px] font-semibold text-primary">{i.receipt}</p><p className="text-[11.5px] text-muted-foreground">Tap to preview receipt</p></div>
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
