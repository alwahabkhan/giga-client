import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/photo-mall-front.jpg";
import logo from "@/assets/logo-gold.png";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/welcome")({
  head: () => seo("Get Started", "Sign in or create your Giga Group client account."),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <img src={hero} alt="Giga Mall at night" className="absolute inset-0 h-full w-full object-cover" width={1024} height={1536} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/85" />

      <div className="relative flex min-h-screen flex-col px-6 pb-[max(env(safe-area-inset-bottom),28px)] pt-[max(env(safe-area-inset-top),22px)]">
        <div className="flex flex-1 justify-center pt-2">
          <img src={logo} alt="Giga Group" className="h-[168px] w-[210px] object-contain mix-blend-screen" />
        </div>

        <div className="mt-auto">
          <h1 className="max-w-[320px] font-display text-[34px] font-semibold leading-[1.05] text-gold">Welcome to Giga Group</h1>
          <p className="mt-3 max-w-[320px] text-[14.5px] leading-relaxed text-white/80">
            Your investment. Your information. Complete transparency — payments, approvals and requests in one place.
          </p>
          <div className="mt-5 h-px w-14 bg-gold" />
          <div className="mt-7 space-y-3">
            <Link to="/login" className="flex h-12 items-center justify-center rounded-xl bg-gold text-[15px] font-semibold text-black shadow-float">
              Sign In
            </Link>
            <Link
              to="/register"
              className="flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-[15px] font-semibold text-white backdrop-blur-md"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
