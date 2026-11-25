import { projects, type Installment, type InstStatus, type Project, type Unit } from "./data";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function formatDue(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}

export function percent(paid: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((paid / total) * 100);
}

export type Figures = { total: number; paid: number; outstanding: number; pct: number };

export function unitFigures(unit: Unit): Figures {
  const total = unit.installments.reduce((sum, item) => sum + item.amount, 0);
  const paid = unit.installments.reduce((sum, item) => sum + item.paidAmount, 0);
  return { total, paid, outstanding: total - paid, pct: percent(paid, total) };
}

export function sumFigures(items: Figures[]): Figures {
  const total = items.reduce((sum, item) => sum + item.total, 0);
  const paid = items.reduce((sum, item) => sum + item.paid, 0);
  return { total, paid, outstanding: total - paid, pct: percent(paid, total) };
}

export function projectFigures(project: Project) {
  return sumFigures(project.units.map(unitFigures));
}

export type UnitContext = { project: Project; unit: Unit };

export function allUnits(): UnitContext[] {
  return projects.flatMap((project) => project.units.map((unit) => ({ project, unit })));
}

export function portfolioFigures() {
  return sumFigures(allUnits().map(({ unit }) => unitFigures(unit)));
}

export function findUnit(unitId: string) {
  return allUnits().find(({ unit }) => unit.id === unitId);
}

export type InstallmentContext = UnitContext & { installment: Installment };

export function allInstallments(): InstallmentContext[] {
  return allUnits().flatMap(({ project, unit }) => unit.installments.map((installment) => ({ project, unit, installment })));
}

export function findInstallment(id: string) {
  return allInstallments().find(({ installment }) => installment.id === id);
}

export function remaining(installment: Installment) {
  return installment.amount - installment.paidAmount;
}

export function nextDue(scope: UnitContext[], today = new Date().toISOString().slice(0, 10)) {
  return scope
    .flatMap(({ project, unit }) =>
      unit.installments
        .filter((installment) => installment.paidAmount < installment.amount && installment.due >= today)
        .map((installment) => ({ project, unit, installment })),
    )
    .sort((a, b) => a.installment.due.localeCompare(b.installment.due))[0];
}

export function countStatuses(items: Installment[]) {
  const statuses: InstStatus[] = ["Paid", "Partially Paid", "Due", "Upcoming", "Overdue"];
  return statuses.map((status) => ({ status, count: items.filter((item) => item.status === status).length }));
}

export type ReceiptRecord = InstallmentContext;

export function receipts(): ReceiptRecord[] {
  return allInstallments().filter(({ installment }) => installment.receipt);
}

export type StatementRow = {
  date: string;
  desc: string;
  ref: string;
  type: "Debit" | "Credit" | "Pending";
  amount: number;
  balance: number;
};

export function statementRows(): { figures: Figures; rows: StatementRow[] } {
  const figures = portfolioFigures();
  const credits = allInstallments()
    .filter(({ installment }) => installment.paidAmount > 0)
    .sort((a, b) => (a.installment.paidOn ?? a.installment.due).localeCompare(b.installment.paidOn ?? b.installment.due));

  let balance = figures.total;
  const rows: StatementRow[] = [
    {
      date: formatDue(allUnits().map(({ unit }) => unit.bookingDate).sort()[0]),
      desc: "Total investment across all units",
      ref: "PORTFOLIO",
      type: "Debit",
      amount: figures.total,
      balance,
    },
    ...credits.map(({ project, unit, installment }) => {
      balance -= installment.paidAmount;
      const pending = installment.verification === "Under Verification";
      return {
        date: formatDue(installment.paidOn ?? installment.due),
        desc: `${project.name} · Unit ${unit.number} · Installment ${String(installment.no).padStart(2, "0")}${pending ? " (under verification)" : ""}`,
        ref: installment.receipt ?? installment.id,
        type: pending ? ("Pending" as const) : ("Credit" as const),
        amount: installment.paidAmount,
        balance,
      };
    }),
  ];

  return { figures, rows };
}
