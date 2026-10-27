export function Bean({ className = "", fill = "var(--accent)", crease = "var(--ground)" }: { className?: string; fill?: string; crease?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <ellipse cx="50" cy="50" rx="27" ry="40" fill={fill} />
      <path d="M50 12 C36 32 64 68 50 88" stroke={crease} strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function BeanShape({ x, y, scale, fill, rotate = 0 }: { x: number; y: number; scale: number; fill: string; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <ellipse cx="0" cy="0" rx="27" ry="40" fill={fill} />
      <path d="M0 -38 C-14 -18 14 18 0 38" stroke="var(--ground)" strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Steam({ count = 3, opacity = 0.5 }: { count?: number; opacity?: number }) {
  const paths = [
    "M150 232 C128 196 176 176 158 140 C140 104 186 86 168 48",
    "M200 226 C178 190 226 170 208 134 C190 98 236 78 218 36",
    "M250 232 C228 196 276 176 258 140 C240 104 286 86 268 54",
  ];
  return (
    <g fill="none" stroke="var(--ink)" strokeWidth="7" strokeLinecap="round" opacity={opacity}>
      {paths.slice(0, count).map((d) => (
        <path key={d} className="steam" d={d} />
      ))}
    </g>
  );
}

export function CupSteam({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 500" className={className} role="img" aria-label="Чашка кофе на блюдце, над ней поднимается пар">
      <Steam />
      <ellipse cx="200" cy="438" rx="158" ry="36" fill="var(--cup-deep)" />
      <ellipse cx="200" cy="430" rx="150" ry="32" fill="var(--cup)" />
      <ellipse cx="200" cy="430" rx="80" ry="16" fill="var(--cup-shade)" />
      <path d="M300 292 C374 284 382 366 300 376" fill="none" stroke="var(--cup)" strokeWidth="28" strokeLinecap="round" />
      <path d="M300 292 C374 284 382 366 300 376" fill="none" stroke="var(--ground)" strokeWidth="10" strokeLinecap="round" />
      <path d="M92 258 C92 352 120 418 200 418 C280 418 308 352 308 258 Z" fill="var(--cup)" />
      <path d="M238 258 C238 352 242 406 200 418 C280 418 308 352 308 258 Z" fill="var(--cup-shade)" />
      <ellipse cx="200" cy="258" rx="108" ry="28" fill="var(--cup-shade)" />
      <ellipse cx="200" cy="258" rx="96" ry="22" fill="var(--coffee)" />
      <ellipse cx="200" cy="258" rx="96" ry="22" fill="none" stroke="var(--crema)" strokeWidth="7" />
      <ellipse cx="178" cy="254" rx="30" ry="8" fill="var(--crema)" opacity="0.7" />
      <text x="200" y="356" textAnchor="middle" fontFamily="var(--font-display)" fontSize="34" fill="var(--paper-muted)">
        Зерно
      </text>
      <BeanShape x={100} y={420} scale={0.32} fill="var(--coffee)" rotate={-30} />
      <BeanShape x={292} y={428} scale={0.3} fill="var(--coffee)" rotate={25} />
    </svg>
  );
}

type Milk = "none" | "dairy" | "oat";

function surface(milk: Milk) {
  return milk === "none" ? "var(--coffee)" : milk === "dairy" ? "var(--milk)" : "var(--oat)";
}

export function DrinkCup({ milk, size, className = "" }: { milk: Milk; size: string; className?: string }) {
  const scale = size === "250" ? 0.86 : size === "350" ? 1 : 1.12;
  return (
    <svg viewBox="0 0 400 500" className={className} aria-hidden="true">
      <g transform={`translate(200 430) scale(${scale}) translate(-200 -430)`}>
        <Steam count={2} opacity={0.45} />
        <ellipse cx="200" cy="438" rx="150" ry="34" fill="var(--cup-deep)" />
        <ellipse cx="200" cy="430" rx="142" ry="30" fill="var(--cup)" />
        <path d="M300 292 C374 284 382 366 300 376" fill="none" stroke="var(--cup)" strokeWidth="28" strokeLinecap="round" />
        <path d="M300 292 C374 284 382 366 300 376" fill="none" stroke="var(--disc, var(--ground))" strokeWidth="10" strokeLinecap="round" />
        <path d="M92 258 C92 352 120 418 200 418 C280 418 308 352 308 258 Z" fill="var(--cup)" />
        <path d="M238 258 C238 352 242 406 200 418 C280 418 308 352 308 258 Z" fill="var(--cup-shade)" />
        <ellipse cx="200" cy="258" rx="108" ry="28" fill="var(--cup-shade)" />
        <ellipse cx="200" cy="258" rx="96" ry="22" fill={surface(milk)} />
        {milk === "none" ? (
          <ellipse cx="200" cy="258" rx="96" ry="22" fill="none" stroke="var(--crema)" strokeWidth="7" />
        ) : (
          <path d="M200 240 C184 244 182 258 200 268 C218 258 216 244 200 240 Z M200 250 C194 252 194 262 200 266 C206 262 206 252 200 250 Z" fill="var(--crema)" />
        )}
      </g>
    </svg>
  );
}

export function DrinkFilter({ milk, size, className = "" }: { milk: Milk; size: string; className?: string }) {
  if (size === "250") {
    return (
      <svg viewBox="0 0 400 500" className={className} aria-hidden="true">
        <ellipse cx="200" cy="456" rx="120" ry="22" fill="var(--cup-deep)" />
        <path d="M118 300 L282 300 L262 444 L138 444 Z" fill="var(--cup)" />
        <path d="M232 300 L282 300 L262 444 L222 444 Z" fill="var(--cup-shade)" />
        <path d="M282 330 C330 326 334 400 282 404" fill="none" stroke="var(--cup)" strokeWidth="22" strokeLinecap="round" />
        <path d="M282 330 C330 326 334 400 282 404" fill="none" stroke="var(--disc, var(--ground))" strokeWidth="8" strokeLinecap="round" />
        <path d="M130 384 L270 384 L262 444 L138 444 Z" fill={surface(milk)} opacity="0.9" />
        <ellipse cx="200" cy="300" rx="82" ry="16" fill="var(--cup-shade)" />
        <path d="M96 150 L304 150 L228 296 L172 296 Z" fill="var(--cup)" />
        <path d="M240 150 L304 150 L228 296 L212 296 Z" fill="var(--cup-shade)" />
        <path d="M150 150 L190 290 M250 150 L210 290" stroke="var(--cup-shade)" strokeWidth="4" />
        <ellipse cx="200" cy="150" rx="104" ry="24" fill="var(--cup-shade)" />
        <ellipse cx="200" cy="150" rx="90" ry="18" fill="var(--coffee)" />
        <ellipse cx="200" cy="148" rx="54" ry="10" fill="var(--crema)" opacity="0.8" />
        <path d="M200 300 L200 340" stroke="var(--coffee)" strokeWidth="6" strokeLinecap="round" />
        <g fill="none" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" opacity="0.45">
          <path className="steam" d="M170 126 C152 96 196 80 180 48" />
          <path className="steam" d="M232 124 C214 94 258 78 242 46" />
        </g>
      </svg>
    );
  }
  const scale = size === "350" ? 0.92 : 1.02;
  return (
    <svg viewBox="0 0 400 500" className={className} aria-hidden="true">
      <g transform={`translate(200 460) scale(${scale}) translate(-200 -460)`}>
        <ellipse cx="200" cy="458" rx="104" ry="20" fill="var(--cup-deep)" />
        <path d="M128 120 L272 120 L222 262 L272 312 L298 448 L102 448 L128 312 L178 262 Z" fill="var(--cup-shade)" />
        <path d="M224 120 L272 120 L222 262 L272 312 L298 448 L228 448 L236 312 L204 262 Z" fill="var(--cup-deep)" />
        <path d="M118 368 L282 368 L298 448 L102 448 Z" fill={surface(milk)} />
        <path d="M200 262 L200 360" stroke="var(--coffee)" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
        <path d="M150 120 L250 120 L212 240 L188 240 Z" fill="var(--cup)" />
        <ellipse cx="200" cy="120" rx="92" ry="20" fill="var(--cup-shade)" />
        <ellipse cx="200" cy="120" rx="78" ry="14" fill="var(--coffee)" />
        <ellipse cx="200" cy="118" rx="46" ry="8" fill="var(--crema)" opacity="0.8" />
        <rect x="150" y="256" width="100" height="64" rx="6" fill="var(--paper-muted)" />
        <path d="M150 288 L250 288" stroke="var(--accent)" strokeWidth="8" />
        <g fill="none" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" opacity="0.45">
          <path className="steam" d="M176 96 C158 66 202 50 186 18" />
          <path className="steam" d="M226 94 C208 64 252 48 236 16" />
        </g>
      </g>
    </svg>
  );
}

export function DrinkCold({ milk, size, className = "" }: { milk: Milk; size: string; className?: string }) {
  const scale = size === "250" ? 0.84 : size === "350" ? 0.96 : 1.08;
  const liquid = milk === "none" ? "var(--coffee)" : "var(--crema)";
  return (
    <svg viewBox="0 0 400 500" className={className} aria-hidden="true">
      <g transform={`translate(200 450) scale(${scale}) translate(-200 -450)`}>
        <ellipse cx="200" cy="452" rx="84" ry="18" fill="var(--cup-deep)" />
        <path d="M126 96 L274 96 L258 446 L142 446 Z" fill="var(--cup-shade)" />
        <path d="M136 160 L264 160 L252 440 L148 440 Z" fill={liquid} />
        {milk !== "none" && <path d="M136 160 L264 160 L258 206 L142 206 Z" fill={surface(milk)} />}
        <path d="M232 96 L274 96 L258 446 L228 446 Z" fill="var(--cup-deep)" opacity="0.5" />
        <rect x="150" y="190" width="44" height="44" rx="6" fill="var(--cup)" opacity="0.85" transform="rotate(-12 172 212)" />
        <rect x="206" y="250" width="44" height="44" rx="6" fill="var(--cup)" opacity="0.85" transform="rotate(14 228 272)" />
        <rect x="158" y="312" width="44" height="44" rx="6" fill="var(--cup)" opacity="0.85" transform="rotate(-6 180 334)" />
        <ellipse cx="200" cy="96" rx="74" ry="16" fill="var(--cup)" opacity="0.6" />
        <path d="M236 30 L212 160" stroke="var(--accent)" strokeWidth="12" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function smooth(points: [number, number][]) {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

export function RoastProfile({ curve, roast, className = "" }: { curve: [number, number][]; roast: "светлая" | "средняя"; className?: string }) {
  const line = smooth(curve);
  const last = curve[curve.length - 1];
  const crack = curve[curve.length - 2];
  const beanFill = roast === "светлая" ? "var(--crema)" : "var(--coffee)";
  return (
    <svg viewBox="0 0 300 220" className={className} role="img" aria-label={`Профиль обжарки: ${roast}`}>
      <path d={`${line} L ${last[0]} 200 L 0 200 Z`} fill="var(--surface-2)" />
      <path d={line} fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
      <path d="M0 200 L300 200" stroke="var(--cup-deep)" strokeWidth="3" strokeLinecap="round" />
      <circle cx={crack[0]} cy={crack[1]} r="7" fill="var(--ink)" />
      <circle cx={crack[0]} cy={crack[1]} r="3" fill="var(--accent)" />
      <BeanShape x={last[0]} y={last[1] - 22} scale={0.4} fill={beanFill} rotate={28} />
    </svg>
  );
}

export function FloorPlan({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" className={className} role="img" aria-label="План зала: барная стойка, ростер за стеклом, длинный стол у окна и стол для каппингов">
      <rect x="14" y="14" width="292" height="192" fill="var(--cup-shade)" />
      <path d="M14 14 H306 V206 H120 M70 206 H14 Z" fill="none" stroke="var(--paper-ink)" strokeWidth="6" strokeLinejoin="round" />
      <path d="M40 14 H200" stroke="var(--paper-2)" strokeWidth="6" />
      <rect x="36" y="30" width="150" height="26" fill="var(--paper-ink)" />
      <g fill="var(--paper-ink)">
        <circle cx="52" cy="70" r="6" />
        <circle cx="80" cy="70" r="6" />
        <circle cx="108" cy="70" r="6" />
        <circle cx="136" cy="70" r="6" />
        <circle cx="164" cy="70" r="6" />
      </g>
      <path d="M306 60 V200 H214 V140 H270 V60 Z" fill="var(--paper-ink)" />
      <rect x="226" y="36" width="64" height="72" fill="var(--paper-2)" />
      <circle cx="258" cy="72" r="22" fill="var(--paper-ink)" />
      <circle cx="258" cy="72" r="9" fill="var(--accent)" />
      <circle cx="120" cy="140" r="30" fill="var(--paper-ink)" />
      <g fill="var(--paper-ink)">
        <circle cx="120" cy="100" r="6" />
        <circle cx="154" cy="120" r="6" />
        <circle cx="154" cy="160" r="6" />
        <circle cx="120" cy="180" r="6" />
        <circle cx="86" cy="160" r="6" />
        <circle cx="86" cy="120" r="6" />
      </g>
      <rect x="30" y="110" width="30" height="30" fill="var(--paper-ink)" />
      <rect x="30" y="160" width="30" height="30" fill="var(--paper-ink)" />
      <rect x="186" y="156" width="20" height="44" fill="var(--paper-ink)" />
    </svg>
  );
}
