import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DemoNote, Field, inputCls, Logo, PrimaryButton } from "@/components/app/ui";
import { Checkbox } from "@/components/ui/checkbox";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () => seo("Sign In", "Sign in to your Giga Group client account."),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("ahmed@example.com");
  const [pw, setPw] = useState("demo1234");
  const [remember, setRemember] = useState(true);

  return (
    <div className="flex min-h-screen flex-col px-6 pb-8 pt-[max(env(safe-area-inset-top),24px)]">
      <Logo />
      <h1 className="mt-10 text-[26px] font-semibold text-primary">Sign in</h1>
      <p className="mt-1 text-[14px] text-muted-foreground">Welcome back. Access your client portal.</p>
      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.includes("@") || pw.length < 4) return toast.error("Enter a valid email and password");
          navigate({ to: "/home" });
        }}
      >
        <Field label="Email Address">
          <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Password">
          <div className="relative">
            <input className={inputCls + " pr-12"} type={show ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} />
            <button type="button" aria-label="Toggle password" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground">
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </Field>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[13px] text-foreground">
            <Checkbox checked={remember} onCheckedChange={(v) => setRemember(!!v)} /> Remember me
          </label>
          <button type="button" onClick={() => toast.success("Reset link sent (demo)", { description: `A link would be emailed to ${email}` })} className="text-[13px] font-semibold text-accent-foreground">
            Forgot password?
          </button>
        </div>
        <PrimaryButton type="submit" className="!mt-8">Sign In</PrimaryButton>
      </form>
      <p className="mt-6 text-center text-[13.5px] text-muted-foreground">
        New to Giga Group? <Link to="/register" className="font-semibold text-primary">Create account</Link>
      </p>
      <div className="mt-auto flex items-center justify-center gap-1.5 pt-10 text-[11.5px] text-muted-foreground">
        <Lock className="h-3.5 w-3.5" /> Encrypted connection · Demo prototype
      </div>
      <DemoNote>Demo credentials are prefilled. No real sign-in takes place.</DemoNote>
    </div>
  );
}
