import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import mall from "@/assets/photo-mall-bridge.jpg";
import skyline from "@/assets/photo-towers.jpg";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Welcome", "Giga Group client app — your investment, your information, complete transparency."),
  component: Splash,
});

const word = "GIGA";

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
        <div className="relative grid h-28 w-28 place-items-center">
          <svg viewBox="0 0 100 100" className="animate-giga-spin absolute inset-0 h-full w-full">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" className="text-gold/30" strokeWidth="1" />
            <circle cx="50" cy="50" r="46" fill="none" className="text-gold" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="70 220" />
          </svg>
          <svg viewBox="0 0 100 100" className="animate-giga-spin-rev absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)]">
            <circle cx="50" cy="50" r="42" fill="none" className="text-gold" stroke="currentColor" strokeWidth="1" strokeDasharray="18 80" />
          </svg>
          <svg viewBox="0 0 64 64" className="relative h-12 w-12" fill="none">
            <path
              d="M10 52V24L32 10l22 14v28"
              className="animate-giga-draw text-gold"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeDasharray="280"
            />
            <path d="M26 52V36h12v16" className="text-white" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M32 22v6" className="text-gold" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="mt-8 flex gap-[0.18em]">
          {word.split("").map((letter, i) => (
            <span
              key={letter + i}
              className="animate-giga-letter font-display text-[34px] font-semibold tracking-[0.18em]"
              style={{ animationDelay: `${0.35 + i * 0.12}s` }}
            >
              {letter}
            </span>
          ))}
        </div>
        <p className="animate-giga-rise mt-1 text-[11px] font-semibold tracking-[0.48em] text-gold" style={{ animationDelay: "0.9s" }}>
          GROUP
        </p>
        <div className="animate-giga-line mt-4 h-px w-16 origin-center bg-gold" />
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
