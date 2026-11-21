import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Camera, CheckCircle2, Clock, CreditCard, ScanFace, Send, ShieldCheck, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Card, DemoNote, Field, inputCls, PrimaryButton, SubScreen } from "@/components/app/ui";
import { Steps } from "./register";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/verify")({
  head: () => seo("Identity Verification", "Verify your identity with your CNIC and a face check."),
  component: Verify,
});

function formatCnic(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 13);
  return [d.slice(0, 5), d.slice(5, 12), d.slice(12)].filter(Boolean).join("-");
}

function Verify() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  return (
    <SubScreen
      title="Identity verification"
      subtitle={["Step 2 of 4 · CNIC details", "Step 3 of 4 · Facial verification", "Verification status"][step]}
      back={step === 0 ? "/register" : undefined}
      noNav
    >
      <Steps current={step + 1} />
      {step === 0 && <CnicStep onNext={() => setStep(1)} />}
      {step === 1 && <FaceStep onNext={() => setStep(2)} />}
      {step === 2 && <StatusStep />}
    </SubScreen>
  );
}

function UploadBox({ label, file, onFile }: { label: string; file?: string; onFile: (n: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <button type="button" onClick={() => ref.current?.click()} className={cn("flex aspect-[1.58] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-card text-center transition", file ? "border-teal bg-accent" : "border-border")}>
      <input ref={ref} type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0].name)} />
      {file ? <CheckCircle2 className="h-7 w-7 text-teal" /> : <Upload className="h-6 w-6 text-muted-foreground" />}
      <span className="text-[13px] font-semibold text-primary">{label}</span>
      <span className="max-w-[90%] truncate text-[11px] text-muted-foreground">{file ?? "Tap to upload · JPG, PNG or PDF"}</span>
    </button>
  );
}

function CnicStep({ onNext }: { onNext: () => void }) {
  const [cnic, setCnic] = useState("");
  const [front, setFront] = useState<string>();
  const [back, setBack] = useState<string>();
  return (
    <div className="mt-6 space-y-5">
      <Card className="flex gap-3 bg-accent shadow-none">
        <CreditCard className="h-5 w-5 shrink-0 text-accent-foreground" />
        <p className="text-[12.5px] leading-relaxed text-accent-foreground">Provide your CNIC details exactly as printed. Your documents are encrypted and used only for verification.</p>
      </Card>
      <Field label="CNIC Number">
        <input className={inputCls + " font-mono tracking-wider"} inputMode="numeric" placeholder="35202-1234567-1" value={cnic} onChange={(e) => setCnic(formatCnic(e.target.value))} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <UploadBox label="Front side" file={front} onFile={setFront} />
        <UploadBox label="Back side" file={back} onFile={setBack} />
      </div>
      <button type="button" className="text-[12.5px] font-semibold text-accent-foreground" onClick={() => { setCnic("35202-1234567-1"); setFront("cnic-front-sample.jpg"); setBack("cnic-back-sample.jpg"); }}>
        Use sample documents (demo)
      </button>
      <PrimaryButton onClick={() => (cnic.length === 15 && front && back ? onNext() : toast.error("Enter a 13-digit CNIC and upload both sides"))}>Continue</PrimaryButton>
    </div>
  );
}

function FaceStep({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState<number | null>(null);
  useEffect(() => {
    if (progress === null || progress >= 100) return;
    const t = setTimeout(() => setProgress((p) => Math.min(100, (p ?? 0) + 4)), 80);
    return () => clearTimeout(t);
  }, [progress]);
  useEffect(() => {
    if (progress === 100) { const t = setTimeout(onNext, 600); return () => clearTimeout(t); }
  }, [progress, onNext]);

  const r = 118, c = 2 * Math.PI * r;
  return (
    <div className="mt-6">
      <div className="bg-navy-gradient relative mx-auto grid aspect-[3/4] w-full place-items-center overflow-hidden rounded-3xl">
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_50%_40%,var(--teal),transparent_60%)]" />
        <svg viewBox="0 0 260 260" className="relative h-64 w-64 -rotate-90">
          <circle cx="130" cy="130" r={r} fill="none" strokeWidth="4" className="stroke-primary-foreground/15" />
          <circle cx="130" cy="130" r={r} fill="none" strokeWidth="4" strokeLinecap="round" className="stroke-teal transition-all" strokeDasharray={c} strokeDashoffset={c - (c * (progress ?? 0)) / 100} />
        </svg>
        <div className="absolute grid h-[200px] w-[160px] place-items-center rounded-[50%] border-2 border-dashed border-primary-foreground/40">
          <ScanFace className="h-16 w-16 text-primary-foreground/40" strokeWidth={1.2} />
          {progress !== null && <div className="animate-scan absolute left-2 right-2 h-0.5 bg-teal shadow-[0_0_12px_var(--teal)]" />}
        </div>
        <div className="absolute bottom-4 left-0 right-0 text-center text-[12.5px] font-medium text-primary-foreground/80">
          {progress === null ? "Camera preview (demo placeholder)" : progress < 100 ? `Analysing… ${progress}%` : "Capture complete"}
        </div>
      </div>
      <ul className="mt-5 space-y-2 text-[13px] text-foreground">
        {["Position your face inside the oval", "Ensure good lighting, no glasses or caps", "Hold still and look straight at the camera"].map((t) => (
          <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal" />{t}</li>
        ))}
      </ul>
      <PrimaryButton className="mt-6" disabled={progress !== null} onClick={() => setProgress(0)}>
        <Camera className="h-5 w-5" /> {progress === null ? "Start Verification" : "Verifying…"}
      </PrimaryButton>
      <DemoNote>UI prototype only — no camera access or biometric verification is performed.</DemoNote>
    </div>
  );
}

const states = [
  { key: "submitted", label: "Verification Submitted", icon: Send, tone: "text-info bg-info/12", desc: "Your CNIC and face capture have been submitted securely." },
  { key: "pending", label: "Verification Pending", icon: Clock, tone: "text-warning bg-warning/15", desc: "Our team is reviewing your documents. This usually takes up to 24 hours." },
  { key: "verified", label: "Identity Verified", icon: ShieldCheck, tone: "text-success bg-success/12", desc: "Your identity has been confirmed. Next: Giga Group account review." },
  { key: "attention", label: "Verification Requires Attention", icon: AlertTriangle, tone: "text-destructive bg-destructive/12", desc: "The back side of your CNIC was unclear. Please re-upload a sharper image." },
] as const;

function StatusStep() {
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const s = states[i];
  const Icon = s.icon;
  return (
    <div className="mt-6">
      <Card className="flex flex-col items-center py-8 text-center">
        <div className={cn("grid h-20 w-20 place-items-center rounded-full", s.tone)}><Icon className="h-9 w-9" /></div>
        <h2 className="mt-4 text-[19px] font-semibold text-primary">{s.label}</h2>
        <p className="mt-2 max-w-[280px] text-[13px] leading-relaxed text-muted-foreground">{s.desc}</p>
      </Card>
      <p className="mb-2 mt-6 text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">Preview each status (demo)</p>
      <div className="grid grid-cols-2 gap-2">
        {states.map((st, idx) => (
          <button key={st.key} onClick={() => setI(idx)} className={cn("rounded-xl border px-3 py-2.5 text-left text-[12px] font-semibold transition", idx === i ? "border-teal bg-accent text-accent-foreground" : "border-border bg-card text-foreground")}>
            {st.label}
          </button>
        ))}
      </div>
      {s.key === "attention" ? (
        <PrimaryButton className="mt-6" variant="navy" onClick={() => setI(0)}>Re-submit documents</PrimaryButton>
      ) : (
        <PrimaryButton className="mt-6" disabled={s.key !== "verified"} onClick={() => navigate({ to: "/activation" })}>
          {s.key === "verified" ? "Continue to Account Review" : "Waiting for identity verification…"}
        </PrimaryButton>
      )}
    </div>
  );
}
