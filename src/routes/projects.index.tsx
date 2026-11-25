import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { SubScreen } from "@/components/app/ui";
import { pkr, projects } from "@/lib/data";
import { projectFigures } from "@/lib/portfolio";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/")({
  head: () => seo("My Investments", "All your Giga Group project accounts."),
  component: Projects,
});

function Projects() {
  const unitCount = projects.reduce((sum, project) => sum + project.units.length, 0);
  return (
    <SubScreen title="My investments" subtitle={`${projects.length} projects · ${unitCount} units`} back="/home">
      <div className="mt-2 space-y-4">
        {projects.map((project) => {
          const figures = projectFigures(project);
          return (
            <Link key={project.id} to="/projects/$id" params={{ id: project.id }} className="block overflow-hidden rounded-2xl bg-card shadow-card">
              <div className="relative h-36">
                <img src={project.image} alt={project.name} loading="lazy" width={1024} height={768} className={cn("h-full w-full object-cover", project.frame)} />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[10.5px] font-bold text-gold">{project.units.length} Units</span>
              </div>
              <div className="p-4">
                <p className="text-[15px] font-semibold text-primary">{project.name}</p>
                <p className="flex items-center gap-1 text-[12px] text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{project.location}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[11.5px]">
                  <div>
                    <p className="text-muted-foreground">Investment</p>
                    <p className="font-semibold text-primary">{pkr(figures.total)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Paid</p>
                    <p className="font-semibold text-success">{pkr(figures.paid)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Outstanding</p>
                    <p className="font-semibold text-primary">{pkr(figures.outstanding)}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full bg-teal" style={{ width: `${figures.pct}%` }} /></div>
                  <span className="text-[11px] font-semibold text-accent-foreground">{figures.pct}% paid</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </SubScreen>
  );
}
