import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, FileText, Paperclip, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { StatusBadge } from "@/components/app/ui";
import { useStore } from "@/lib/store";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/inbox/$id")({
  head: ({ params }) => seo(`Query ${params.id}`, "Your conversation with Giga Group."),
  component: Conversation,
});

function Conversation() {
  const { id } = Route.useParams();
  const { queries, sendMessage } = useStore();
  const q = queries.find((x) => x.id === id);
  const [text, setText] = useState("");
  const [att, setAtt] = useState<string>();
  const fileRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = endRef.current;
    const scroller = node?.parentElement;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }, [q?.messages.length]);

  if (!q)
    return (
      <div className="grid min-h-screen place-items-center p-6 text-center">
        <div><p className="text-primary">Query not found.</p><Link to="/inbox" className="mt-3 inline-block font-semibold text-accent-foreground">Back to inbox</Link></div>
      </div>
    );

  const closed = q.status === "Closed";
  const send = () => {
    if (!text.trim() && !att) return;
    sendMessage(q.id, text.trim() || "Attachment", att);
    setText("");
    setAtt(undefined);
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b bg-card px-4 pb-3 pt-[max(env(safe-area-inset-top),14px)]">
        <div className="flex items-center gap-3">
          <Link to="/inbox" aria-label="Back" className="grid h-10 w-10 place-items-center rounded-full bg-muted text-primary"><ChevronLeft className="h-5 w-5" /></Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold text-primary">{q.subject}</p>
            <p className="font-mono text-[11px] text-muted-foreground">{q.id}</p>
          </div>
          <StatusBadge status={q.status} />
        </div>
        <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-muted px-3 py-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-[11px] font-bold text-teal">{q.rep === "To be assigned" ? "GG" : q.rep.split(" ").map((w) => w[0]).join("")}</div>
          <div className="flex-1">
            <p className="text-[12.5px] font-semibold text-primary">{q.rep}</p>
            <p className="text-[11px] text-muted-foreground">{q.dept} · {q.project}</p>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {q.messages.map((m) =>
          m.from === "system" ? (
            <p key={m.id} className="mx-auto w-fit rounded-full bg-muted px-3 py-1 text-center text-[11px] text-muted-foreground">{m.text}</p>
          ) : (
            <div key={m.id} className={cn("flex flex-col", m.from === "client" ? "items-end" : "items-start")}>
              <div className={cn("max-w-[80%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed", m.from === "client" ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-card text-foreground shadow-card")}>
                {m.text !== "Attachment" && <p>{m.text}</p>}
                {m.attachment && (
                  <div className={cn("mt-2 flex items-center gap-2 rounded-lg p-2 text-[12px]", m.from === "client" ? "bg-primary-foreground/10" : "bg-muted")}>
                    <FileText className="h-4 w-4 shrink-0 text-teal" /><span className="truncate">{m.attachment}</span>
                  </div>
                )}
              </div>
              <span className="mt-1 px-1 text-[10.5px] text-muted-foreground">{m.from === "rep" ? `${q.rep.split(" ")[0]} · ` : ""}{m.time}</span>
            </div>
          ),
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t bg-card px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-2.5">
        {att && (
          <div className="mb-2 flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-[12px]">
            <FileText className="h-4 w-4 text-teal" /><span className="flex-1 truncate">{att}</span>
            <button aria-label="Remove attachment" onClick={() => setAtt(undefined)}><X className="h-4 w-4 text-muted-foreground" /></button>
          </div>
        )}
        {closed ? (
          <p className="py-3 text-center text-[12.5px] text-muted-foreground">This query is closed.</p>
        ) : (
          <form className="flex items-end gap-2" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input ref={fileRef} type="file" className="hidden" onChange={(e) => { if (e.target.files?.[0]) setAtt(e.target.files[0].name); e.target.value = ""; }} />
            <button type="button" aria-label="Attach file" onClick={() => fileRef.current?.click()} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-muted text-primary"><Paperclip className="h-5 w-5" /></button>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message…" className="h-11 flex-1 rounded-full border border-input bg-background px-4 text-[14px] outline-none focus:border-teal" />
            <button type="submit" aria-label="Send" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal text-teal-foreground disabled:opacity-40" disabled={!text.trim() && !att}><Send className="h-[18px] w-[18px]" /></button>
          </form>
        )}
      </div>
    </div>
  );
}
