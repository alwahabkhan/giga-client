import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { SubScreen } from "@/components/app/ui";
import { pkr, projects } from "@/lib/data";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/")({
  head: () => seo("My Investments", "All your Giga Group project accounts."),
  component: Projects,
});

function Projects() {
  return (
    <SubScreen title="My investments" subtitle={`${projects.length} project accounts`} back="/home">
      <div className="mt-2 space-y-4">
        {projects.map((p) => {
          const pct = Math.round((p.paid / p.total) * 100);
          return (
            <Link key={p.id} to="/projects/$id" params={{ id: p.id }} className="block overflow-hidden rounded-2xl bg-card shadow-card">
              <div className="relative h-36">
                <img src={p.image} alt={p.name} loading="lazy" width={1024} height={768} className={cn("h-full w-full object-cover", p.frame)} />
                {p.demo && <span className="absolute left-3 top-3 rounded-full bg-warning px-2 py-0.5 text-[10.5px] font-bold text-navy-deep">Illustrative demo record</span>}
              </div>
              <div className="p-4">
                <p className="text-[15px] font-semibold text-primary">{p.name}</p>
                <p className="flex items-center gap-1 text-[12px] text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{p.location}</p>
                <div className="mt-3 flex items-center justify-between text-[12px]">
                  <span className="font-mono text-muted-foreground">{p.ref}</span>
                  <span className="font-semibold text-primary">{pkr(p.total)}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full bg-teal" style={{ width: `${pct}%` }} /></div>
              </div>
            </Link>
          );
        })}
      </div>
    </SubScreen>
  );
}
