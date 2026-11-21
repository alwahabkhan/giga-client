import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Building2, Check, Clock, ShieldCheck, UserCheck } from "lucide-react";
import { useState } from "react";
import { Card, DemoNote, PrimaryButton, StatusBadge, SubScreen } from "@/components/app/ui";
import { Steps } from "./register";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/activation")({
  head: () => seo("Account Review", "Track your Giga Group account review and activation."),
  component: Activation,
});

function Activation() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const journey = [
    { t: "Account created", d: "Email and password set", done: true, icon: UserCheck },
    { t: "Identity verification", d: "CNIC + facial check · Verified", done: true, icon: ShieldCheck },
    { t: "Giga Group account review", d: active ? "Approved by Client Services" : "Linking your investment records", done: active, current: !active, icon: Building2 },
    { t: "Full access activated", d: active ? "Welcome aboard" : "Available after review", done: active, icon: Check },
  ];
  return (
    <SubScreen title="Account activation" subtitle="Step 4 of 4 · Giga Group review" noNav>
      <Steps current={3} />
      <Card className="mt-6 bg-navy-gradient text-primary-foreground">
        <p className="text-[12px] font-medium text-primary-foreground/70">Two separate checks</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-primary-foreground/10 p-3">
            <ShieldCheck className="h-5 w-5 text-teal" />
            <p className="mt-2 text-[12.5px] font-semibold">Identity</p>
            <p className="text-[11px] text-primary-foreground/70">Confirms who you are</p>
            <span className="mt-2 inline-block rounded-full bg-teal px-2 py-0.5 text-[10.5px] font-bold text-teal-foreground">Verified</span>
          </div>
          <div className="rounded-xl bg-primary-foreground/10 p-3">
            <Building2 className="h-5 w-5 text-teal" />
            <p className="mt-2 text-[12.5px] font-semibold">Account</p>
            <p className="text-[11px] text-primary-foreground/70">Links your investments</p>
            <span className={cn("mt-2 inline-block rounded-full px-2 py-0.5 text-[10.5px] font-bold", active ? "bg-teal text-teal-foreground" : "bg-warning text-navy-deep")}>{active ? "Active" : "Under Review"}</span>
          </div>
        </div>
      </Card>

      <div className="mt-6 space-y-0">
        {journey.map((j, i) => {
          const Icon = j.icon;
          return (
            <div key={j.t} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={cn("grid h-9 w-9 place-items-center rounded-full", j.done ? "bg-success text-primary-foreground" : j.current ? "bg-warning/15 text-warning ring-2 ring-warning" : "bg-muted text-muted-foreground")}>
                  {j.current ? <Clock className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                {i < journey.length - 1 && <div className={cn("my-1 w-0.5 flex-1", j.done ? "bg-success" : "bg-border")} />}
              </div>
              <div className="pb-6">
                <p className="text-[14px] font-semibold text-primary">{j.t}</p>
                <p className="text-[12.5px] text-muted-foreground">{j.d}</p>
              </div>
            </div>
          );
        })}
      </div>

      {active ? (
        <PrimaryButton onClick={() => navigate({ to: "/home" })}>Go to my dashboard</PrimaryButton>
      ) : (
        <>
          <div className="mb-3 flex justify-center"><StatusBadge status="Under Review" /></div>
          <PrimaryButton variant="navy" onClick={() => setActive(true)}>Simulate account approval (demo)</PrimaryButton>
        </>
      )}
      <DemoNote>Identity verification and account activation are separate. Full access is granted only after Giga Group's review.</DemoNote>
    </SubScreen>
  );
}
