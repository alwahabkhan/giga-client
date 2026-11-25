import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Card, PrimaryButton, Row, SubScreen } from "@/components/app/ui";
import { client, pkr } from "@/lib/data";
import { statementRows } from "@/lib/portfolio";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/statement")({
  head: () => seo("Account Statement", "Complete payment history across your Giga Group units."),
  component: Statement,
});

function Statement() {
  const { figures, rows } = statementRows();

  const download = () => {
    const csv = ["Date,Description,Reference,Type,Amount (PKR),Balance (PKR)", ...rows.map((row) => [row.date, row.desc, row.ref, row.type, row.amount, row.balance].join(","))].join("\n");
    const blob = new Blob([`Giga Group — Sample Account Statement (demo data)\nClient,${client.name}\nAccount,${client.accountRef}\n\n${csv}`], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `GigaGroup-Statement-${client.accountRef}-sample.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success("Sample statement downloaded");
  };

  return (
    <SubScreen title="Account statement" subtitle={`${client.accountRef} · all units`}>
      <Card className="mt-2 py-1">
        <Row label="Opening (investment)" value={pkr(figures.total)} />
        <Row label="Total credits" value={<span className="text-success">{pkr(figures.paid)}</span>} />
        <Row label="Closing balance" value={pkr(figures.outstanding)} />
      </Card>
      <div className="mt-5 space-y-0 overflow-hidden rounded-2xl bg-card shadow-card">
        {rows.map((row) => (
          <div key={row.ref + row.desc} className="border-b border-border/70 p-4 last:border-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold text-primary">{row.desc}</p>
                <p className="text-[11.5px] text-muted-foreground">{row.date} · <span className="font-mono">{row.ref}</span></p>
              </div>
              <div className="text-right">
                <p className={cn("text-[13.5px] font-bold", row.type === "Credit" ? "text-success" : row.type === "Pending" ? "text-warning" : "text-primary")}>
                  {row.type === "Credit" || row.type === "Pending" ? "−" : "+"}{pkr(row.amount)}
                </p>
                <p className="text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">{row.type}</p>
              </div>
            </div>
            <p className="mt-1.5 text-right text-[11px] text-muted-foreground">Balance {pkr(row.balance)}</p>
          </div>
        ))}
      </div>
      <PrimaryButton className="mt-6" onClick={download}><Download className="h-4 w-4" /> Download Statement</PrimaryButton>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">Downloads a sample file with illustrative data.</p>
    </SubScreen>
  );
}
