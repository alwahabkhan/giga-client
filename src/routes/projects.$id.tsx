import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { BedDouble, Building2, CalendarDays, ChevronLeft, MapPin } from "lucide-react";
import { BottomNav, Card, PrimaryButton, Row, SectionTitle } from "@/components/app/ui";
import { pkr, projects } from "@/lib/data";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const p = projects.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => seo(loaderData?.name ?? "Project", loaderData ? `${loaderData.name}, ${loaderData.location}` : "Project details"),
  component: ProjectDetail,
});

function ProjectDetail() {
  const p = Route.useLoaderData();
  const navigate = useNavigate();
  const pct = Math.round((p.paid / p.total) * 100);
  return (
    <div className="pb-safe-nav min-h-screen">
      <div className="relative h-[340px]">
        <img src={p.image} alt={p.name} width={1024} height={768} className={cn("h-full w-full object-cover", p.frame)} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-navy-deep/30" />
        <button aria-label="Back" onClick={() => window.history.back()} className="absolute left-4 top-[max(env(safe-area-inset-top),16px)] grid h-10 w-10 place-items-center rounded-full bg-card/90 text-primary">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="absolute bottom-12 left-5 right-5 text-primary-foreground">
          {p.demo && <span className="mb-2 inline-block rounded-full bg-warning px-2 py-0.5 text-[10.5px] font-bold text-navy-deep">Illustrative demo record</span>}
          <p className="text-[12px] font-medium uppercase tracking-widest text-teal">{p.type}</p>
          <h1 className="text-[24px] font-semibold">{p.name}</h1>
          <p className="mt-1 flex items-center gap-1 text-[13px] text-primary-foreground/80"><MapPin className="h-4 w-4" />{p.location}</p>
        </div>
      </div>
      <div className="relative z-10 -mt-8 px-5">
        <Card className="p-5">
          <div className="flex items-end justify-between">
            <div><p className="text-[12px] text-muted-foreground">Total Investment</p><p className="font-display text-[22px] font-semibold text-primary">{pkr(p.total)}</p></div>
            <p className="text-[12px] font-semibold text-accent-foreground">{pct}% paid</p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-teal" style={{ width: `${pct}%` }} /></div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[{ i: Building2, t: p.unit.split(" · ")[0] }, { i: BedDouble, t: p.unit.split(" · ")[2] ?? p.unit.split(" · ")[1] }, { i: CalendarDays, t: p.bookingDate }].map(({ i: I, t }) => (
              <div key={t} className="rounded-xl bg-muted py-2.5"><I className="mx-auto h-4 w-4 text-teal" /><p className="mt-1 text-[11px] font-semibold text-primary">{t}</p></div>
            ))}
          </div>
        </Card>
        <SectionTitle>Latest project update</SectionTitle>
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between px-4 pt-4">
            <p className="text-[13px] text-muted-foreground">{p.update.date}</p>
            <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-gold">{p.update.progress}% built</span>
          </div>
          <p className="px-4 pt-2 text-[13.5px] leading-relaxed text-foreground">{p.update.note}</p>
          <div className="mx-4 mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-gold" style={{ width: `${p.update.progress}%` }} />
          </div>
          <div className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-4 pt-3">
            {p.update.images.map((src) => (
              <img key={src} src={src} alt="" className="h-40 w-32 shrink-0 snap-start rounded-xl object-cover" />
            ))}
          </div>
        </Card>
        <SectionTitle>Booking & account details</SectionTitle>
        <Card className="py-1">
          <Row label="Investment Reference" value={p.ref} mono />
          <Row label="Unit" value={p.unit} />
          <Row label="Booking Date" value={p.bookingDate} />
          <Row label="Amount Paid" value={<span className="text-success">{pkr(p.paid)}</span>} />
          <Row label="Remaining Balance" value={pkr(p.total - p.paid)} />
        </Card>
        <SectionTitle>Associated payment plan</SectionTitle>
        <Card className="py-1">
          <Row label="Plan" value={p.plan} />
          <Row label="Installment Amount" value={pkr(1_000_000)} />
          <Row label="Plan Start" value={p.bookingDate} />
        </Card>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <PrimaryButton variant="outline" onClick={() => navigate({ to: "/statement" })}>Statement</PrimaryButton>
          <PrimaryButton onClick={() => navigate({ to: "/account" })}>Installments</PrimaryButton>
        </div>
        <Link to="/query" className="mt-4 block text-center text-[13px] font-semibold text-accent-foreground">Have a question about this project?</Link>
      </div>
      <BottomNav />
    </div>
  );
}
