import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { StatusBadge, TabScreen } from "@/components/app/ui";
import { useStore } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/inbox/")({
  head: () => seo("Inbox", "Your queries and conversations with Giga Group."),
  component: InboxList,
});

function InboxList() {
  const { queries } = useStore();
  return (
    <TabScreen
      title="Inbox"
      subtitle={`${queries.length} queries`}
      action={
        <Link to="/query" aria-label="New query" className="grid h-10 w-10 place-items-center rounded-full bg-gold text-black shadow-float">
          <Plus className="h-5 w-5" />
        </Link>
      }
    >
      <div className="space-y-3">
        {queries.map((q) => {
          const last = [...q.messages].reverse().find((m) => m.from !== "system") ?? q.messages.at(-1)!;
          return (
            <Link key={q.id} to="/inbox/$id" params={{ id: q.id }} className="block rounded-2xl bg-card p-4 shadow-card transition active:scale-[0.99]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted-foreground">{q.id}</span>
                <span className="text-[11px] text-muted-foreground">{q.updated}</span>
              </div>
              <p className="mt-1 text-[14.5px] font-semibold text-primary">{q.subject}</p>
              <p className="text-[11.5px] font-medium text-accent-foreground">{q.project}</p>
              <p className="mt-2 line-clamp-1 text-[12.5px] text-muted-foreground">
                {last.from === "client" ? "You: " : `${q.rep.split(" ")[0]}: `}{last.text}
              </p>
              <div className="mt-3"><StatusBadge status={q.status} /></div>
            </Link>
          );
        })}
      </div>
    </TabScreen>
  );
}
