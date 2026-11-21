import { createFileRoute, Link } from "@tanstack/react-router";
import { MessagesSquare } from "lucide-react";
import { QueryForm } from "@/components/app/query-form";
import { TabScreen } from "@/components/app/ui";
import { useStore } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/query")({
  head: () => seo("Query", "Send a query to Accounts, Sales, Finance or Customer Care."),
  component: QueryPage,
});

function QueryPage() {
  const { queries } = useStore();
  const open = queries.filter((q) => q.status !== "Closed" && q.status !== "Resolved").length;

  return (
    <TabScreen
      title="Query"
      subtitle="Write to the Giga Group team"
      action={
        <Link
          to="/inbox"
          aria-label="My queries"
          className="grid h-10 w-10 place-items-center rounded-full bg-card text-primary shadow-card"
        >
          <MessagesSquare className="h-[18px] w-[18px]" />
        </Link>
      }
    >
      <Link to="/inbox" className="mb-4 flex items-center justify-between rounded-2xl bg-primary px-4 py-3 text-primary-foreground shadow-float">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">My queries</p>
          <p className="mt-0.5 text-[14px] font-semibold">{open} open conversation{open === 1 ? "" : "s"}</p>
        </div>
        <MessagesSquare className="h-5 w-5 text-gold" />
      </Link>
      <QueryForm />
    </TabScreen>
  );
}
