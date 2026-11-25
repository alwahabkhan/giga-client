import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Building2, CalendarClock, ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { BottomNav, Card, SectionTitle } from "@/components/app/ui";
import { Dialog, DialogClose, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { pkr, projects } from "@/lib/data";
import { formatDue, nextDue, projectFigures, remaining, unitFigures } from "@/lib/portfolio";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const project = projects.find((item) => item.id === params.id);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => seo(loaderData?.name ?? "Project", loaderData ? `${loaderData.name}, ${loaderData.location}` : "Project details"),
  component: ProjectDetail,
});

function ProjectDetail() {
  const project = Route.useLoaderData();
  const [photo, setPhoto] = useState<string | null>(null);
  const figures = projectFigures(project);
  const due = nextDue(project.units.map((unit) => ({ project, unit })));

  return (
    <div className="pb-safe-nav min-h-screen">
      <div className="relative h-[340px]">
        <img src={project.image} alt={project.name} width={1024} height={768} className={cn("h-full w-full object-cover", project.frame)} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-navy-deep/30" />
        <Link to="/projects" aria-label="Back" className="absolute left-4 top-[max(env(safe-area-inset-top),16px)] grid h-10 w-10 place-items-center rounded-full bg-card/90 text-primary">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div className="absolute bottom-12 left-5 right-5 text-primary-foreground">
          <p className="text-[12px] font-medium uppercase tracking-widest text-teal">{project.units.length} units</p>
          <h1 className="text-[24px] font-semibold">{project.name}</h1>
          <p className="mt-1 flex items-center gap-1 text-[13px] text-primary-foreground/80"><MapPin className="h-4 w-4" />{project.location}</p>
        </div>
      </div>
      <div className="relative z-10 -mt-8 px-5">
        <Card className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Project investment</p>
          <div className="mt-1 flex items-end justify-between">
            <p className="font-display text-[22px] font-semibold text-primary">{pkr(figures.total)}</p>
            <p className="text-[12px] font-semibold text-accent-foreground">{figures.pct}% paid</p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-teal" style={{ width: `${figures.pct}%` }} /></div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-muted py-2.5">
              <p className="text-[10px] text-muted-foreground">Paid</p>
              <p className="mt-1 text-[12px] font-semibold text-success">{pkr(figures.paid)}</p>
            </div>
            <div className="rounded-xl bg-muted py-2.5">
              <p className="text-[10px] text-muted-foreground">Remaining</p>
              <p className="mt-1 text-[12px] font-semibold text-primary">{pkr(figures.outstanding)}</p>
            </div>
            <div className="rounded-xl bg-muted py-2.5">
              <Building2 className="mx-auto h-4 w-4 text-teal" />
              <p className="mt-1 text-[12px] font-semibold text-primary">{project.units.length} units</p>
            </div>
          </div>
          {due ? (
            <Link to="/units/$unitId" params={{ unitId: due.unit.id }} className="mt-4 flex items-center gap-3 rounded-xl border border-gold/30 bg-accent/60 p-3">
              <CalendarClock className="h-[18px] w-[18px] text-gold-deep" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-muted-foreground">Next due in this project</p>
                <p className="truncate text-[13px] font-semibold text-primary">Unit {due.unit.number} · {pkr(remaining(due.installment))} · {formatDue(due.installment.due)}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gold-deep" />
            </Link>
          ) : (
            <p className="mt-4 rounded-xl bg-muted px-3 py-3 text-center text-[13px] text-muted-foreground">No upcoming installments</p>
          )}
          <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">{project.description}</p>
        </Card>

        <SectionTitle>My Units</SectionTitle>
        <div className="space-y-2.5">
          {project.units.map((unit) => {
            const money = unitFigures(unit);
            return (
              <Link key={unit.id} to="/units/$unitId" params={{ unitId: unit.id }} className="block rounded-2xl bg-card p-4 shadow-card transition active:scale-[0.99]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[15px] font-semibold text-primary">Unit {unit.number}</p>
                    <p className="text-[12px] text-muted-foreground">{unit.tower} · {unit.bookingRef}</p>
                  </div>
                  <span className="rounded-full bg-primary px-2 py-1 text-[11px] font-bold text-gold">{money.pct}% paid</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
                  <div>
                    <p className="text-muted-foreground">Investment</p>
                    <p className="font-semibold text-primary">{pkr(money.total)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Outstanding</p>
                    <p className="font-semibold text-primary">{pkr(money.outstanding)}</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full bg-teal" style={{ width: `${money.pct}%` }} /></div>
              </Link>
            );
          })}
        </div>

        <SectionTitle>Latest project update</SectionTitle>
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between px-4 pt-4">
            <p className="text-[13px] text-muted-foreground">{project.update.date}</p>
            <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-gold">{project.update.progress}% built</span>
          </div>
          <p className="px-4 pt-2 text-[13.5px] leading-relaxed text-foreground">{project.update.note}</p>
          <div className="mx-4 mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-gold" style={{ width: `${project.update.progress}%` }} />
          </div>
          <div className="grid grid-cols-3 gap-2 px-4 pb-4 pt-3">
            {project.update.images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setPhoto(src)}
                aria-label={`View project photo ${index + 1}`}
                className="aspect-[4/5] w-full overflow-hidden rounded-xl p-0"
              >
                <img src={src} alt="" className="h-full w-full object-cover object-center" />
              </button>
            ))}
          </div>
        </Card>
        <Link to="/query" className="mt-4 block text-center text-[13px] font-semibold text-accent-foreground">Have a question about this project?</Link>
      </div>
      <Dialog open={photo !== null} onOpenChange={(open) => !open && setPhoto(null)}>
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 outline-none"
            onClick={() => setPhoto(null)}
          >
            <DialogTitle className="sr-only">Project photo</DialogTitle>
            {photo && <img src={photo} alt="Project update" className="max-h-[78vh] w-full rounded-2xl object-contain" />}
            <DialogClose className="absolute right-4 top-[max(env(safe-area-inset-top),16px)] grid h-10 w-10 place-items-center rounded-full bg-white text-primary shadow-float">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
      <BottomNav />
    </div>
  );
}
