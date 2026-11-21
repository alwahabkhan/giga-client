import { createFileRoute } from "@tanstack/react-router";
import { QueryForm } from "@/components/app/query-form";
import { SubScreen } from "@/components/app/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/inbox/new")({
  head: () => seo("Submit a Query", "Send a new query to the Giga Group team."),
  component: NewQuery,
});

function NewQuery() {
  return (
    <SubScreen title="Submit a query" subtitle="Accounts, Sales, Finance or Customer Care" back="/inbox">
      <QueryForm />
    </SubScreen>
  );
}
