import { createContext, useContext, useState, type ReactNode } from "react";
import { client, initialNotices, initialQueries, type Message, type Notice, type Query } from "./data";

type Profile = { name: string; email: string; phone: string };
type Store = {
  profile: Profile;
  setProfile: (p: Profile) => void;
  queries: Query[];
  addQuery: (q: Omit<Query, "id" | "messages" | "status" | "updated" | "rep" | "dept"> & { description: string; attachments: string[]; dept?: string }) => string;
  sendMessage: (id: string, text: string, attachment?: string) => void;
  notices: Notice[];
  markRead: (id: string) => void;
  markAllRead: () => void;
};

const Ctx = createContext<Store | null>(null);

const now = () => new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

export function StoreProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>({ name: client.name, email: client.email, phone: client.phone });
  const [queries, setQueries] = useState<Query[]>(initialQueries);
  const [notices, setNotices] = useState<Notice[]>(initialNotices);

  const addQuery: Store["addQuery"] = (q) => {
    const id = `GG-QRY-2026-${String(Math.floor(100 + Math.random() * 900)).padStart(4, "0")}`;
    const msgs: Message[] = [
      { id: "m1", from: "client", text: q.description, time: "Today " + now(), attachment: q.attachments[0] },
      ...q.attachments.slice(1).map((a, i) => ({ id: "a" + i, from: "client" as const, text: "Attachment", time: "Today " + now(), attachment: a })),
      { id: "s1", from: "system", text: `Query received by ${q.dept ?? "Giga Group"}. A representative will be assigned shortly.`, time: "Today " + now() },
    ];
    setQueries((prev) => [
      { id, subject: q.subject, type: q.type, project: q.project, dept: q.dept ?? "Client Services", status: "New", updated: "Just now", rep: "To be assigned", messages: msgs },
      ...prev,
    ]);
    return id;
  };

  const sendMessage: Store["sendMessage"] = (id, text, attachment) => {
    setQueries((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, updated: "Just now", messages: [...q.messages, { id: crypto.randomUUID(), from: "client", text, time: "Today " + now(), attachment }] }
          : q,
      ),
    );
  };

  return (
    <Ctx.Provider
      value={{
        profile,
        setProfile,
        queries,
        addQuery,
        sendMessage,
        notices,
        markRead: (id) => setNotices((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n))),
        markAllRead: () => setNotices((p) => p.map((n) => ({ ...n, read: true }))),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("StoreProvider missing");
  return s;
}
