import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { StatusBadge, TabScreen } from "@/components/app/ui";
import { approvals } from "@/lib/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/approvals/")({
  head: () => seo("Approvals", "Track where your requests are in Giga Group's approval process."),
  component: Approvals,
});

export function approvalState(a: (typeof approvals)[number]) {
  const done = a.stages.filter((s) => s.status === "Completed").length;
  const current = a.stages.find((s) => s.status === "In Progress");
  return { done, current, status: current ? "In Progress" : done === a.stages.length ? "Completed" : "Pending" };
}

function Approvals() {
  return (
    <TabScreen title="Approvals" subtitle="Track your submitted requests">
      <div className="space-y-3">
        {approvals.map((a) => {
          const st = approvalState(a);
          return (
            <Link key={a.id} to="/approvals/$id" params={{ id: a.id }} className="block rounded-2xl bg-card p-4 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[11.5px] text-muted-foreground">{a.ref}</p>
                  <p className="mt-0.5 text-[15px] font-semibold text-primary">{a.type}</p>
                </div>
                <StatusBadge status={st.status} />
              </div>
              <div className="mt-4 flex gap-1">
                {a.stages.map((s) => (
                  <div key={s.name} className={"h-1.5 flex-1 rounded-full " + (s.status === "Completed" ? "bg-success" : s.status === "In Progress" ? "bg-teal" : "bg-border")} />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-[12px]">
                <span className="text-muted-foreground">
                  {st.current ? <>Now at <b className="text-primary">{st.current.name}</b></> : `${st.done}/${a.stages.length} stages complete`}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          );
        })}
      </div>
      <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">Approval stages shown are illustrative and will be confirmed by Giga Group.</p>
    </TabScreen>
  );
}
