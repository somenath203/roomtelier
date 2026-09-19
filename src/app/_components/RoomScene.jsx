function LivingBefore() {
  return (
    <>
      <rect width="800" height="400" className="fill-muted" />
      <rect y="400" width="800" height="200" className="fill-muted-foreground/25" />
      <rect y="392" width="800" height="10" className="fill-muted-foreground/30" />

      {/* window */}
      <rect x="310" y="110" width="180" height="170" rx="4" strokeWidth="6" className="fill-background stroke-muted-foreground/40" />
      <line x1="400" y1="110" x2="400" y2="280" strokeWidth="4" className="stroke-muted-foreground/40" />
      <line x1="310" y1="195" x2="490" y2="195" strokeWidth="4" className="stroke-muted-foreground/40" />

      {/* worn sofa */}
      <rect x="120" y="300" width="270" height="70" rx="14" className="fill-muted-foreground/40" />
      <rect x="110" y="345" width="290" height="75" rx="14" className="fill-muted-foreground/50" />
      <rect x="135" y="420" width="14" height="18" className="fill-muted-foreground/60" />
      <rect x="360" y="420" width="14" height="18" className="fill-muted-foreground/60" />

      {/* small side table */}
      <rect x="540" y="362" width="90" height="10" rx="3" className="fill-muted-foreground/50" />
      <rect x="550" y="372" width="8" height="58" className="fill-muted-foreground/50" />
      <rect x="612" y="372" width="8" height="58" className="fill-muted-foreground/50" />
    </>
  );
}

function LivingAfter() {
  return (
    <>
      <rect width="800" height="400" className="fill-primary/10" />
      <rect y="400" width="800" height="200" className="fill-primary/30" />
      <rect y="392" width="800" height="10" className="fill-primary/40" />

      {/* window and curtains */}
      <rect x="310" y="110" width="180" height="170" rx="4" strokeWidth="6" className="fill-background stroke-primary/50" />
      <line x1="400" y1="110" x2="400" y2="280" strokeWidth="4" className="stroke-primary/50" />
      <line x1="310" y1="195" x2="490" y2="195" strokeWidth="4" className="stroke-primary/50" />
      <rect x="262" y="96" width="290" height="8" rx="4" className="fill-foreground/70" />
      <rect x="272" y="100" width="56" height="240" rx="8" className="fill-primary/40" />
      <rect x="472" y="100" width="56" height="240" rx="8" className="fill-primary/40" />

      {/* wall art */}
      <rect x="590" y="120" width="110" height="140" rx="4" strokeWidth="5" className="fill-background stroke-foreground/60" />
      <rect x="605" y="135" width="80" height="110" className="fill-primary/30" />
      <circle cx="645" cy="185" r="22" className="fill-primary/70" />
      <rect x="90" y="150" width="100" height="72" rx="4" strokeWidth="5" className="fill-background stroke-foreground/60" />
      <rect x="102" y="162" width="76" height="48" className="fill-primary/30" />

      {/* rug */}
      <ellipse cx="300" cy="490" rx="270" ry="52" className="fill-background/70" />

      {/* sofa */}
      <rect x="100" y="288" width="300" height="84" rx="20" className="fill-primary/80" />
      <rect x="86" y="336" width="328" height="92" rx="18" className="fill-primary" />
      <rect x="68" y="316" width="42" height="112" rx="16" className="fill-primary" />
      <rect x="390" y="316" width="42" height="112" rx="16" className="fill-primary" />
      <rect x="126" y="300" width="70" height="60" rx="14" className="fill-primary-foreground/30" />
      <rect x="304" y="300" width="70" height="60" rx="14" className="fill-primary-foreground/30" />

      {/* coffee table */}
      <rect x="180" y="452" width="200" height="16" rx="8" className="fill-foreground/80" />
      <rect x="200" y="468" width="8" height="34" className="fill-foreground/70" />
      <rect x="352" y="468" width="8" height="34" className="fill-foreground/70" />

      {/* floor lamp */}
      <rect x="484" y="214" width="6" height="216" className="fill-foreground/60" />
      <path d="M452 214 L522 214 L506 158 L468 158 Z" className="fill-primary/70" />
      <ellipse cx="487" cy="432" rx="26" ry="6" className="fill-foreground/40" />

      {/* plant */}
      <path d="M580 428 L640 428 L632 492 L588 492 Z" className="fill-foreground/70" />
      <ellipse cx="610" cy="380" rx="16" ry="52" transform="rotate(-24 610 428)" className="fill-primary/70" />
      <ellipse cx="610" cy="376" rx="16" ry="56" className="fill-primary/80" />
      <ellipse cx="610" cy="380" rx="16" ry="52" transform="rotate(24 610 428)" className="fill-primary/70" />
    </>
  );
}

function BedroomBefore() {
  return (
    <>
      <rect width="800" height="400" className="fill-muted" />
      <rect y="400" width="800" height="200" className="fill-muted-foreground/25" />
      <rect y="392" width="800" height="10" className="fill-muted-foreground/30" />

      {/* window */}
      <rect x="560" y="110" width="170" height="160" rx="4" strokeWidth="6" className="fill-background stroke-muted-foreground/40" />
      <line x1="645" y1="110" x2="645" y2="270" strokeWidth="4" className="stroke-muted-foreground/40" />

      {/* plain bed */}
      <rect x="110" y="330" width="330" height="90" rx="10" className="fill-muted-foreground/40" />
      <rect x="135" y="298" width="110" height="46" rx="14" className="fill-background/80" />
      <rect x="100" y="412" width="350" height="26" rx="4" className="fill-muted-foreground/55" />

      {/* nightstand */}
      <rect x="470" y="362" width="70" height="78" rx="4" className="fill-muted-foreground/50" />
    </>
  );
}

function BedroomAfter() {
  return (
    <>
      <rect width="800" height="400" className="fill-primary/10" />
      <rect y="400" width="800" height="200" className="fill-primary/30" />
      <rect y="392" width="800" height="10" className="fill-primary/40" />

      {/* feature wall behind the bed */}
      <rect x="70" y="190" width="440" height="205" rx="10" className="fill-primary/20" />

      {/* window and curtains */}
      <rect x="590" y="110" width="150" height="160" rx="4" strokeWidth="6" className="fill-background stroke-primary/50" />
      <line x1="665" y1="110" x2="665" y2="270" strokeWidth="4" className="stroke-primary/50" />
      <rect x="552" y="92" width="226" height="8" rx="4" className="fill-foreground/70" />
      <rect x="560" y="96" width="46" height="230" rx="8" className="fill-primary/40" />
      <rect x="724" y="96" width="46" height="230" rx="8" className="fill-primary/40" />

      {/* art above the bed */}
      <rect x="170" y="100" width="110" height="74" rx="4" strokeWidth="5" className="fill-background stroke-foreground/60" />
      <rect x="182" y="112" width="86" height="50" className="fill-primary/30" />
      <rect x="300" y="100" width="110" height="74" rx="4" strokeWidth="5" className="fill-background stroke-foreground/60" />
      <circle cx="355" cy="137" r="18" className="fill-primary/70" />

      {/* rug */}
      <ellipse cx="300" cy="500" rx="290" ry="50" className="fill-background/70" />

      {/* bed */}
      <rect x="92" y="244" width="376" height="150" rx="16" className="fill-primary" />
      <rect x="86" y="338" width="388" height="100" rx="14" className="fill-background" />
      <rect x="86" y="376" width="388" height="86" rx="14" className="fill-primary/60" />
      <rect x="112" y="300" width="128" height="52" rx="16" className="fill-background" />
      <rect x="320" y="300" width="128" height="52" rx="16" className="fill-background" />
      <rect x="86" y="376" width="388" height="10" rx="5" className="fill-primary-foreground/30" />

      {/* nightstands and lamps */}
      <rect x="500" y="376" width="66" height="84" rx="6" className="fill-foreground/70" />
      <rect x="530" y="346" width="6" height="30" className="fill-foreground/60" />
      <path d="M512 346 L554 346 L544 308 L522 308 Z" className="fill-primary/70" />
      <rect x="12" y="376" width="60" height="84" rx="6" className="fill-foreground/70" />
      <rect x="39" y="346" width="6" height="30" className="fill-foreground/60" />
      <path d="M22 346 L62 346 L54 308 L30 308 Z" className="fill-primary/70" />
    </>
  );
}

const SCENES = {
  living: { before: LivingBefore, after: LivingAfter },
  bedroom: { before: BedroomBefore, after: BedroomAfter },
};

export default function RoomScene({ room = "living", stage = "before" }) {
  const Scene = SCENES[room]?.[stage] ?? SCENES.living.before;

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <Scene />
    </svg>
  );
}