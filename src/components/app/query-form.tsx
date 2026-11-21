import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, Field, inputCls, PrimaryButton } from "@/components/app/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { departments, relatedProjects } from "@/lib/data";
import { useStore } from "@/lib/store";

export function QueryForm() {
  const { addQuery } = useStore();
  const navigate = useNavigate();
  const [f, setF] = useState({ subject: "", dept: "", project: "", description: "" });
  const [done, setDone] = useState<string | null>(null);

  if (done) {
    return (
      <Card className="mt-4 flex flex-col items-center py-10 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-gold/20 text-gold-deep">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="mt-4 text-[20px] font-semibold text-primary">Query submitted</h2>
        <p className="mt-1 max-w-[260px] text-[13px] text-muted-foreground">
          Your request is with the selected department. A representative will reply in your inbox.
        </p>
        <div className="mt-5 rounded-xl bg-muted px-4 py-3">
          <p className="text-[11px] text-muted-foreground">Reference number</p>
          <p className="font-mono text-[16px] font-bold text-primary">{done}</p>
        </div>
        <PrimaryButton className="mt-6" onClick={() => navigate({ to: "/inbox/$id", params: { id: done } })}>
          View conversation
        </PrimaryButton>
        <PrimaryButton className="mt-3" variant="outline" onClick={() => setDone(null)}>
          Submit another
        </PrimaryButton>
      </Card>
    );
  }

  return (
    <form
      className="mt-2 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!f.subject.trim() || !f.dept || !f.project || f.description.trim().length < 8) {
          return toast.error("Add a subject, department, project and your query");
        }
        setDone(
          addQuery({
            subject: f.subject.trim(),
            type: f.dept,
            project: f.project,
            dept: f.dept,
            description: f.description.trim(),
            attachments: [],
          }),
        );
        setF({ subject: "", dept: "", project: "", description: "" });
      }}
    >
      <Field label="Query Subject">
        <input
          className={inputCls}
          value={f.subject}
          onChange={(e) => setF({ ...f, subject: e.target.value })}
          placeholder="e.g. March installment receipt"
        />
      </Field>
      <Field label="Department">
        <Select value={f.dept || undefined} onValueChange={(v) => setF({ ...f, dept: v })}>
          <SelectTrigger className="!h-12 rounded-xl bg-card">
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Related Project">
        <Select value={f.project || undefined} onValueChange={(v) => setF({ ...f, project: v })}>
          <SelectTrigger className="!h-12 rounded-xl bg-card">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            {relatedProjects.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Query">
        <textarea
          rows={5}
          className={inputCls + " h-auto py-3"}
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
          placeholder="Write your query for the team…"
        />
      </Field>
      <PrimaryButton type="submit" className="!mt-6">
        Submit Query
      </PrimaryButton>
    </form>
  );
}
