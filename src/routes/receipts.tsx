import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { Logo, PrimaryButton, StatusBadge, SubScreen } from "@/components/app/ui";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { client, pkr, receipts } from "@/lib/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/receipts")({
  validateSearch: (s: Record<string, unknown>): { open?: string } => (typeof s.open === "string" ? { open: s.open } : {}),
  head: () => seo("Payment Receipts", "View and preview your submitted payment receipts."),
  component: Receipts,
});

function Receipts() {
  const { open } = Route.useSearch();
  const navigate = useNavigate({ from: "/receipts" });
  const sel = receipts.find((r) => r.receipt === open);

  return (
    <SubScreen title="Payment receipts" subtitle={`${receipts.length} receipts on file`}>
      <div className="mt-2 space-y-2.5">
        {receipts.map((r) => (
          <button key={r.receipt} onClick={() => navigate({ search: { open: r.receipt } })} className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-card">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground"><FileText className="h-5 w-5" /></span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[13px] font-semibold text-primary">{r.receipt}</p>
              <p className="text-[11.5px] text-muted-foreground">Installment {r.id} · {r.paidOn} · {pkr(r.amount)}</p>
            </div>
            <StatusBadge status={r.verification} />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <Sheet open={!!sel} onOpenChange={(o) => !o && navigate({ search: {} })}>
        <SheetContent side="bottom" className="mx-auto max-w-[430px] rounded-t-3xl">
          {sel && (
            <>
              <SheetHeader><SheetTitle className="text-primary">Receipt preview</SheetTitle></SheetHeader>
              <div className="mx-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between border-b border-dashed pb-4">
                  <Logo />
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">Payment receipt</span>
                </div>
                <div className="space-y-2 py-4 text-[12.5px]">
                  {[
                    ["Receipt No.", sel.receipt],
                    ["Client", client.name],
                    ["Account", client.accountRef],
                    ["Installment", sel.id],
                    ["Submitted", sel.paidOn],
                    ["Channel", "Bank transfer"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-semibold text-foreground">{v}</span></div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-dashed pt-4">
                  <span className="text-[12px] text-muted-foreground">Amount</span>
                  <span className="font-display text-[20px] font-semibold text-primary">{pkr(sel.amount)}</span>
                </div>
                <div className="mt-3 flex justify-center"><StatusBadge status={sel.verification} /></div>
              </div>
              <div className="p-4">
                <PrimaryButton variant="navy" onClick={() => toast.success("Receipt saved (demo)")}><Download className="h-4 w-4" /> Save copy</PrimaryButton>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </SubScreen>
  );
}
