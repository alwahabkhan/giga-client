import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import mallLogo from "@/assets/logo-mall.png";
import mall from "@/assets/photo-mall-bridge.jpg";
import skyline from "@/assets/photo-towers.jpg";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Welcome", "Giga Group client app — your investment, your information, complete transparency."),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/welcome" }), 3200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <button
      onClick={() => navigate({ to: "/welcome" })}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white"
    >
      <img src={skyline} alt="" className="animate-giga-ken absolute inset-0 h-full w-full object-cover" />
      <img src={mall} alt="" className="animate-giga-cross absolute inset-0 h-full w-full object-cover opacity-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-giga-sheen absolute inset-y-0 left-0 w-[46%]">
          <div className="h-full w-full -skew-x-12 bg-gradient-to-r from-transparent via-gold/35 to-transparent blur-md" />
        </div>
      </div>
      <div className="absolute inset-x-10 top-0 h-px origin-center animate-giga-line bg-gradient-to-r from-transparent via-gold/80 to-transparent" style={{ animationDelay: "0.35s" }} />

      <div className="relative flex flex-col items-center px-8">
        <div className="pointer-events-none absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2">
          <div className="animate-giga-bloom h-28 w-28 rounded-full bg-gold/40 blur-3xl" />
        </div>
        <img src={mallLogo} alt="Giga Mall" className="animate-giga-logo relative z-10 h-auto w-[232px] object-contain mix-blend-screen" />
        <div className="animate-giga-line mt-8 h-px w-14 origin-center bg-gold" style={{ animationDelay: "1.05s" }} />
        <p className="animate-giga-rise mt-4 max-w-[250px] text-center text-[12.5px] leading-relaxed tracking-[0.045em] text-white/75" style={{ animationDelay: "1.2s" }}>
          Your Investment. Your Information. Complete Transparency.
        </p>
      </div>

      <div className="absolute bottom-[72px] h-px w-28 overflow-hidden bg-white/15">
        <div className="animate-giga-load h-full w-full origin-left bg-gold" />
      </div>
    </button>
  );
}
