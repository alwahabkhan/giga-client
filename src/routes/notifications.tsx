import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BellRing, CalendarClock, MessagesSquare, Receipt, ShieldCheck, Workflow } from "lucide-react";
import { SubScreen } from "@/components/app/ui";
import { useStore } from "@/lib/store";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => seo("Notifications", "Updates on your queries, payments, approvals and account."),
  component: Notifications,
});

const icons = { query: MessagesSquare, payment: Receipt, approval: Workflow, reminder: CalendarClock, account: ShieldCheck };

function Notifications() {
  const { notices, markRead, markAllRead } = useStore();
  const navigate = useNavigate();
  const unread = notices.filter((n) => !n.read).length;
  return (
    <SubScreen
      title="Notifications"
      subtitle={unread ? `${unread} unread` : "You're all caught up"}
      right={unread > 0 && <button onClick={markAllRead} className="text-[12.5px] font-semibold text-accent-foreground">Mark all read</button>}
    >
      <div className="mt-2 space-y-2.5">
        {notices.map((n) => {
          const I = icons[n.kind] ?? BellRing;
          return (
            <button
              key={n.id}
              onClick={() => { markRead(n.id); navigate({ to: n.to }); }}
              className={cn("flex w-full gap-3 rounded-2xl p-4 text-left transition", n.read ? "bg-card/60" : "bg-card shadow-card")}
            >
              <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full", n.kind === "reminder" ? "bg-destructive/12 text-destructive" : "bg-accent text-accent-foreground")}><I className="h-[18px] w-[18px]" /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={cn("text-[13.5px] text-primary", n.read ? "font-medium" : "font-bold")}>{n.title}</p>
                  {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-teal" />}
                </div>
                <p className="text-[12.5px] leading-snug text-muted-foreground">{n.body}</p>
                <p className="mt-1 text-[11px] text-muted-foreground/80">{n.time}</p>
              </div>
            </button>
          );
        })}
      </div>
    </SubScreen>
  );
}
