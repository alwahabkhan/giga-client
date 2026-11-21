import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Field, inputCls, PrimaryButton, SubScreen } from "@/components/app/ui";
import { Checkbox } from "@/components/ui/checkbox";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/register")({
  head: () => seo("Create Account", "Register for a Giga Group client account."),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", email: "", pw: "", pw2: "" });
  const [show, setShow] = useState(false);
  const [terms, setTerms] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  return (
    <SubScreen title="Create account" subtitle="Step 1 of 4 · Account details" back="/welcome" noNav>
      <Steps current={0} />
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!f.name || !f.email.includes("@")) return toast.error("Please enter your name and a valid email");
          if (f.pw.length < 8) return toast.error("Password must be at least 8 characters");
          if (f.pw !== f.pw2) return toast.error("Passwords do not match");
          if (!terms) return toast.error("Please accept the Terms and Conditions");
          navigate({ to: "/verify" });
        }}
      >
        <Field label="Full Name"><input className={inputCls} value={f.name} onChange={set("name")} placeholder="e.g. Ahmed Khan" /></Field>
        <Field label="Email Address"><input className={inputCls} type="email" value={f.email} onChange={set("email")} placeholder="you@example.com" /></Field>
        <Field label="Password">
          <div className="relative">
            <input className={inputCls + " pr-12"} type={show ? "text" : "password"} value={f.pw} onChange={set("pw")} placeholder="Minimum 8 characters" />
            <button type="button" aria-label="Toggle password" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground">
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </Field>
        <Field label="Confirm Password"><input className={inputCls} type={show ? "text" : "password"} value={f.pw2} onChange={set("pw2")} /></Field>
        <label className="flex items-start gap-3 rounded-xl bg-card p-3 text-[13px] leading-snug shadow-card">
          <Checkbox className="mt-0.5" checked={terms} onCheckedChange={(v) => setTerms(!!v)} />
          <span>I agree to Giga Group's <b className="text-primary">Terms and Conditions</b> and <b className="text-primary">Privacy Policy</b>.</span>
        </label>
        <PrimaryButton type="submit" className="!mt-6">Create Account</PrimaryButton>
      </form>
      <p className="mt-6 text-center text-[13.5px] text-muted-foreground">
        Already have an account? <Link to="/login" className="font-semibold text-primary">Sign in</Link>
      </p>
    </SubScreen>
  );
}

export function Steps({ current }: { current: number }) {
  const labels = ["Account", "CNIC", "Face", "Review"];
  return (
    <div className="mt-2 flex gap-1.5">
      {labels.map((l, i) => (
        <div key={l} className="flex-1">
          <div className={"h-1.5 rounded-full " + (i <= current ? "bg-teal" : "bg-border")} />
          <span className={"mt-1.5 block text-[10.5px] font-semibold " + (i <= current ? "text-primary" : "text-muted-foreground")}>{l}</span>
        </div>
      ))}
    </div>
  );
}
