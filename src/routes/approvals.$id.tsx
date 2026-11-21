import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Clock, Loader2 } from "lucide-react";
import { Card, Row, SectionTitle, StatusBadge, SubScreen } from "@/components/app/ui";
import { approvals } from "@/lib/data";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { approvalState } from "./approvals.index";

export const Route = createFileRoute("/approvals/$id")({
  loader: ({ params }) => {
    const a = approvals.find((x) => x.id === params.id);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) => seo(loaderData?.ref ?? "Approval", loaderData?.type ?? "Approval timeline"),
  component: ApprovalDetail,
});

function ApprovalDetail() {
  const a = Route.useLoaderData();
  const st = approvalState(a);
  return (
    <SubScreen title={a.type} subtitle={a.ref} back="/approvals">
      <div className="bg-navy-gradient mt-2 rounded-2xl p-5 text-primary-foreground shadow-float">
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-primary-foreground/65">Current status</span>
          <span className="rounded-full bg-teal px-2.5 py-1 text-[11px] font-bold text-teal-foreground">{st.status}</span>
        </div>
        <p className="mt-2 font-display text-[20px] font-semibold">{st.current?.name ?? "All stages complete"}</p>
        <p className="text-[12.5px] text-primary-foreground/70">{st.current ? `With ${st.current.dept}` : "Your request has been approved"}</p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-primary-foreground/15">
          <div className="h-full rounded-full bg-teal" style={{ width: `${(st.done / a.stages.length) * 100}%` }} />
        </div>
        <p className="mt-2 text-[11.5px] text-primary-foreground/65">{st.done} of {a.stages.length} stages completed</p>
      </div>

      <Card className="mt-4 py-1">
        <Row label="Request Type" value={a.type} />
        <Row label="Submitted" value={a.submitted} />
        <Row label="Last Updated" value={a.updated} />
      </Card>

      <SectionTitle>Approval timeline</SectionTitle>
      <Card className="p-5">
        {a.stages.map((s, i) => {
          const done = s.status === "Completed", active = s.status === "In Progress";
          return (
            <div key={s.name} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full", done && "bg-success text-primary-foreground", active && "bg-teal text-teal-foreground ring-4 ring-teal/20", !done && !active && "border-2 border-border bg-card text-muted-foreground")}>
                  {done ? <Check className="h-4 w-4" /> : active ? <Loader2 className="h-4 w-4 animate-spin" /> : <Clock className="h-3.5 w-3.5" />}
                </div>
                {i < a.stages.length - 1 && <div className={cn("my-1 w-0.5 flex-1 min-h-6", done ? "bg-success" : "bg-border")} />}
              </div>
              <div className={cn("mb-5 flex-1", active && "-mt-1 rounded-xl bg-accent p-3")}>
                <div className="flex items-center justify-between gap-2">
                  <p className={cn("text-[14px] font-semibold", !done && !active ? "text-muted-foreground" : "text-primary")}>{i + 1}. {s.name}</p>
                  <StatusBadge status={s.status} />
                </div>
                <p className="mt-0.5 text-[12px] text-muted-foreground">{s.dept}{s.date ? ` · ${s.date}` : ""}</p>
              </div>
            </div>
          );
        })}
      </Card>
      <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">Stages and departments are illustrative and will be confirmed by Giga Group.</p>
      <Link to="/query" className="mt-4 block text-center text-[13px] font-semibold text-accent-foreground">Have a question about this request?</Link>
    </SubScreen>
  );
}
