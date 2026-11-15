"use client";
// Ilustración isométrica del hero (diseño: Landing v7, paleta C).
// Los puntos animados usan CSS puro; respetan prefers-reduced-motion.
import * as React from "react";

const CHIPS = [
  { t: "RP Speciality", x: 230, y: 150, w: 120 },
  { t: "Leannec", x: 320, y: 98, w: 120 },
  { t: "TurboSurge", x: 410, y: 150, w: 120 },
  { t: "Plataforma Proel", x: 320, y: 448, w: 140 },
  { t: "ANMAT", x: 185, y: 520, w: 90 },
  { t: "Superintendencia de Servicios de Salud", x: 250, y: 578, w: 140 },
  { t: "Surge", x: 400, y: 578, w: 80 },
  { t: "Sistemas del cliente", x: 490, y: 520, w: 110 },
];

export function HeroIsometric() {
  return (
    <div className="relative mx-auto aspect-[760/720] w-full max-w-[760px]">
      <style>{`
        @keyframes fdot{0%{transform:translateY(0);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateY(var(--d));opacity:0}}
        .fdot{animation:fdot 2.4s linear infinite}
        @media (prefers-reduced-motion:reduce){.fdot{animation:none;opacity:1}}
      `}</style>
      <svg viewBox="0 0 760 720" className="block h-full w-full" aria-hidden="true">
<polygon points="50,520 380,685 380,707 50,542" fill="#CFD6DD"/><polygon points="710,520 380,685 380,707 710,542" fill="#B7C3CC"/><polygon points="380,355 710,520 380,685 50,520" fill="#E4EAEF"/><polygon points="194,500 230,518 230,527 194,509" fill="#CFD6DD"/><polygon points="266,500 230,518 230,527 266,509" fill="#B7C3CC"/><polygon points="230,482 266,500 230,518 194,500" fill="#FFFFFF"/><polygon points="284,545 320,563 320,572 284,554" fill="#CFD6DD"/><polygon points="356,545 320,563 320,572 356,554" fill="#B7C3CC"/><polygon points="320,527 356,545 320,563 284,545" fill="#FFFFFF"/><polygon points="404,545 440,563 440,572 404,554" fill="#CFD6DD"/><polygon points="476,545 440,563 440,572 476,554" fill="#B7C3CC"/><polygon points="440,527 476,545 440,563 404,545" fill="#FFFFFF"/><polygon points="494,500 530,518 530,527 494,509" fill="#CFD6DD"/><polygon points="566,500 530,518 530,527 566,509" fill="#B7C3CC"/><polygon points="530,482 566,500 530,518 494,500" fill="#FFFFFF"/><polygon points="118,370 380,501 380,523 118,392" fill="#0A5A72"/><polygon points="642,370 380,501 380,523 642,392" fill="#084A5E"/><polygon points="380,239 642,370 380,501 118,370" fill="#0E7490"/><polygon points="380,270 580,370 380,470 180,370" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2"/><polygon points="380,305 510,370 380,435 250,370" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2"/><polygon points="380,340 440,370 380,400 320,370" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2"/><line x1="320" y1="493" x2="320" y2="520" stroke="#94A1AF" strokeWidth="1.5" strokeDasharray="3 5"/><circle className="fdot" style={{"--d":"27px",animationDelay:"1.5s"} as React.CSSProperties} cx="320" cy="493" r="4" fill="#0E7490"/><line x1="440" y1="493" x2="440" y2="520" stroke="#94A1AF" strokeWidth="1.5" strokeDasharray="3 5"/><circle className="fdot" style={{"--d":"27px",animationDelay:"1.8s"} as React.CSSProperties} cx="440" cy="493" r="4" fill="#0E7490"/><line x1="200" y1="433" x2="200" y2="520" stroke="#94A1AF" strokeWidth="1.5" strokeDasharray="3 5"/><circle className="fdot" style={{"--d":"87px",animationDelay:"1.2s"} as React.CSSProperties} cx="200" cy="433" r="4" fill="#0E7490"/><line x1="560" y1="433" x2="560" y2="520" stroke="#94A1AF" strokeWidth="1.5" strokeDasharray="3 5"/><circle className="fdot" style={{"--d":"87px",animationDelay:"0.0s"} as React.CSSProperties} cx="560" cy="433" r="4" fill="#0E7490"/><polygon points="190,220 380,315 380,337 190,242" fill="#DDE7EC"/><polygon points="570,220 380,315 380,337 570,242" fill="#C5D0DA"/><polygon points="380,125 570,220 380,315 190,220" fill="#FFFFFF" stroke="#CBD3DB" strokeWidth="1.5"/><polygon points="254,222 290,240 290,249 254,231" fill="#0A5A72"/><polygon points="326,222 290,240 290,249 326,231" fill="#084A5E"/><polygon points="290,204 326,222 290,240 254,222" fill="#0E7490"/><polygon points="344,222 380,240 380,249 344,231" fill="#0A5A72"/><polygon points="416,222 380,240 380,249 416,231" fill="#084A5E"/><polygon points="380,204 416,222 380,240 344,222" fill="#0E7490"/><polygon points="434,222 470,240 470,249 434,231" fill="#0A5A72"/><polygon points="506,222 470,240 470,249 506,231" fill="#084A5E"/><polygon points="470,204 506,222 470,240 434,222" fill="#0E7490"/><line x1="300" y1="297" x2="300" y2="370" stroke="#94A1AF" strokeWidth="1.5" strokeDasharray="3 5"/><circle className="fdot" style={{"--d":"73px",animationDelay:"0.0s"} as React.CSSProperties} cx="300" cy="297" r="4" fill="#67C8DA"/><line x1="380" y1="337" x2="380" y2="370" stroke="#94A1AF" strokeWidth="1.5" strokeDasharray="3 5"/><circle className="fdot" style={{"--d":"33px",animationDelay:"0.0s"} as React.CSSProperties} cx="380" cy="337" r="4" fill="#67C8DA"/><line x1="460" y1="297" x2="460" y2="370" stroke="#94A1AF" strokeWidth="1.5" strokeDasharray="3 5"/><circle className="fdot" style={{"--d":"73px",animationDelay:"0.0s"} as React.CSSProperties} cx="460" cy="297" r="4" fill="#67C8DA"/>
      </svg>
      {CHIPS.map((c) => (
        <span
          key={c.t}
          className="absolute box-border rounded-[4px] bg-white px-2 py-[7px] text-center text-[13px] font-semibold leading-tight text-[#111827] shadow-[0_8px_18px_-10px_rgba(17,24,39,.45)]"
          style={{ left: `${(c.x / 760) * 100}%`, top: `${(c.y / 720) * 100}%`, width: `${(c.w / 760) * 100}%` }}
        >
          {c.t}
        </span>
      ))}
      <div className="absolute right-0 top-[44px] w-[220px] rounded-[6px] bg-white px-[18px] py-4 shadow-[0_24px_44px_-22px_rgba(17,24,39,.4)] max-md:hidden">
        <div className="flex items-center justify-between text-[13px] font-semibold text-[#111827]">
          <span>Receta digital</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCEFE6] px-[9px] py-[3px] text-[11px] font-medium text-[#1B6B49]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1B6B49]" />Validada
          </span>
        </div>
        <div className="mt-3 grid gap-2">
          <span className="h-[7px] w-[80%] rounded-[2px] bg-[#E8ECF0]" />
          <span className="h-[7px] w-[62%] rounded-[2px] bg-[#E8ECF0]" />
        </div>
        <p className="mt-2.5 text-[11px] text-[#5B6675]">Vista ilustrativa</p>
      </div>
    </div>
  );
}
