import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronRight, FileText, Headphones, KeyRound, LogOut, Pencil, Shield, ShieldCheck, BadgeCheck } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Card, Field, inputCls, PrimaryButton, Row, SectionTitle, StatusBadge, TabScreen } from "@/components/app/ui";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { client } from "@/lib/data";
import { useStore } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/profile/")({
  head: () => seo("Profile", "Your Giga Group profile and settings."),
  component: Profile,
});

type Panel = "password" | "notifications" | "privacy" | "terms" | "support" | null;

function Profile() {
  const { profile } = useStore();
  const navigate = useNavigate();
  const [panel, setPanel] = useState<Panel>(null);
  const initials = profile.name.split(" ").map((w) => w[0]).slice(0, 2).join("");

  const items: { icon: typeof Bell; label: string; onClick: () => void }[] = [
    { icon: Pencil, label: "Edit Profile", onClick: () => navigate({ to: "/profile/edit" }) },
    { icon: KeyRound, label: "Change Password", onClick: () => setPanel("password") },
    { icon: Bell, label: "Notification Preferences", onClick: () => setPanel("notifications") },
    { icon: Shield, label: "Privacy Policy", onClick: () => setPanel("privacy") },
    { icon: FileText, label: "Terms and Conditions", onClick: () => setPanel("terms") },
    { icon: Headphones, label: "Contact Support", onClick: () => setPanel("support") },
  ];

  return (
    <TabScreen title="Profile">
      <Card className="flex flex-col items-center p-6 text-center">
        <div className="relative">
          <div className="bg-navy-gradient grid h-20 w-20 place-items-center rounded-full font-display text-[24px] font-semibold text-teal">{initials}</div>
          <span className="absolute -bottom-0.5 -right-0.5 grid h-7 w-7 place-items-center rounded-full bg-success text-primary-foreground ring-4 ring-card"><BadgeCheck className="h-4 w-4" /></span>
        </div>
        <h2 className="mt-3 text-[18px] font-semibold text-primary">{profile.name}</h2>
        <p className="text-[13px] text-muted-foreground">{profile.email}</p>
      </Card>

      <SectionTitle>Account information</SectionTitle>
      <Card className="py-1">
        <Row label="Account Reference" value={client.accountRef} mono />
        <Row label="CNIC Number" value={client.cnicMasked} mono />
        <Row label="Phone" value={profile.phone} />
        <Row label="Identity Verification" value={<StatusBadge status="Verified" />} />
        <Row label="Account Activation" value={<StatusBadge status="Active" />} />
      </Card>

      <SectionTitle>Settings</SectionTitle>
      <Card className="p-1">
        {items.map(({ icon: I, label, onClick }) => (
          <button key={label} onClick={onClick} className="flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left hover:bg-muted">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-accent-foreground"><I className="h-[18px] w-[18px]" /></span>
            <span className="flex-1 text-[14px] font-medium text-primary">{label}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </Card>
      <Link to="/welcome" className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-card py-3.5 text-[14px] font-semibold text-destructive shadow-card">
        <LogOut className="h-4 w-4" /> Sign Out
      </Link>
      <p className="mt-4 text-center text-[11px] text-muted-foreground">Giga Group Client App · Prototype v0.1</p>

      <Sheet open={!!panel} onOpenChange={(o) => !o && setPanel(null)}>
        <SheetContent side="bottom" className="mx-auto max-h-[85vh] max-w-[430px] overflow-y-auto rounded-t-3xl px-5 pb-8">
          {panel && <PanelBody panel={panel} close={() => setPanel(null)} />}
        </SheetContent>
      </Sheet>
    </TabScreen>
  );
}

function PanelBody({ panel, close }: { panel: Exclude<Panel, null>; close: () => void }) {
  const [prefs, setPrefs] = useState({ query: true, payment: true, approval: true, reminder: true, email: false });
  const [pw, setPw] = useState({ cur: "", n: "", c: "" });
  const titles = { password: "Change Password", notifications: "Notification Preferences", privacy: "Privacy Policy", terms: "Terms and Conditions", support: "Contact Support" };
  const wrap = (body: ReactNode) => (
    <>
      <SheetHeader className="px-0"><SheetTitle className="text-primary">{titles[panel]}</SheetTitle></SheetHeader>
      {body}
    </>
  );
  if (panel === "password")
    return wrap(
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (pw.n.length < 8 || pw.n !== pw.c) return toast.error("New passwords must match and be 8+ characters"); toast.success("Password updated (demo)"); close(); }}>
        <Field label="Current Password"><input type="password" className={inputCls} value={pw.cur} onChange={(e) => setPw({ ...pw, cur: e.target.value })} /></Field>
        <Field label="New Password"><input type="password" className={inputCls} value={pw.n} onChange={(e) => setPw({ ...pw, n: e.target.value })} /></Field>
        <Field label="Confirm New Password"><input type="password" className={inputCls} value={pw.c} onChange={(e) => setPw({ ...pw, c: e.target.value })} /></Field>
        <PrimaryButton type="submit">Update Password</PrimaryButton>
      </form>,
    );
  if (panel === "notifications")
    return wrap(
      <div className="divide-y divide-border">
        {([["query", "Query responses & status"], ["payment", "Payment verification"], ["approval", "Approval progress"], ["reminder", "Installment reminders"], ["email", "Also send by email"]] as const).map(([k, l]) => (
          <label key={k} className="flex items-center justify-between py-3.5 text-[14px] text-primary">
            {l}<Switch checked={prefs[k]} onCheckedChange={(v) => setPrefs({ ...prefs, [k]: v })} />
          </label>
        ))}
        <PrimaryButton className="!mt-5" onClick={() => { toast.success("Preferences saved"); close(); }}>Save</PrimaryButton>
      </div>,
    );
  if (panel === "support")
    return wrap(
      <div className="space-y-3">
        <Card className="py-1"><Row label="Helpline" value="+92 42 000 0000" /><Row label="Email" value="support@gigagroup.example" /><Row label="Hours" value="Mon–Sat · 9am–6pm" /></Card>
        <Link to="/query" onClick={close} className="flex h-12 items-center justify-center rounded-xl bg-gold text-[15px] font-semibold text-black">Submit a query</Link>
        <p className="text-center text-[11px] text-muted-foreground">Contact details are placeholders.</p>
      </div>,
    );
  return wrap(
    <div className="space-y-3 text-[13px] leading-relaxed text-muted-foreground">
      <p className="flex items-center gap-2 font-semibold text-primary"><ShieldCheck className="h-4 w-4 text-teal" /> Placeholder text</p>
      <p>This is sample {panel === "privacy" ? "privacy policy" : "terms"} copy for the prototype. Giga Group will provide the final legal text.</p>
      <p>Client information is shown only to the account holder. Sensitive identity details such as CNIC numbers are masked, and internal staff notes are never displayed in the client app.</p>
    </div>,
  );
}
