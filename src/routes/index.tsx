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
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative flex flex-col items-center px-8">
        <div className="relative w-[248px]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[344px] w-[344px] -translate-x-1/2 -translate-y-1/2">
            <div className="animate-giga-ring relative h-full w-full">
              <div className="animate-giga-pulse absolute inset-14 rounded-full bg-gold/20 blur-2xl" />
              <svg viewBox="0 0 100 100" className="animate-giga-spin absolute inset-0 h-full w-full">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" className="text-gold/25" strokeWidth="0.4" />
                <circle cx="50" cy="50" r="48" fill="none" className="text-gold" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeDasharray="16 58" />
              </svg>
              <svg viewBox="0 0 100 100" className="animate-giga-spin-rev absolute inset-[14px] h-[calc(100%-28px)] w-[calc(100%-28px)]">
                <circle cx="50" cy="50" r="47" fill="none" className="text-gold" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" strokeDasharray="11 40" />
              </svg>
            </div>
          </div>
          <img src={mallLogo} alt="Giga Mall" className="animate-giga-logo relative z-10 h-auto w-full object-contain mix-blend-screen" />
        </div>
        <div className="animate-giga-line mt-[108px] h-px w-16 origin-center bg-gold" />
        <p className="animate-giga-rise mt-4 max-w-[260px] text-center text-[13px] leading-relaxed text-white/75" style={{ animationDelay: "1.05s" }}>
          Your Investment. Your Information. Complete Transparency.
        </p>
      </div>

      <div className="absolute bottom-16 h-[3px] w-36 overflow-hidden rounded-full bg-white/15">
        <div className="animate-giga-bar h-full w-1/2 rounded-full bg-gold" />
      </div>
    </button>
  );
}
