import { useId } from 'react';

interface SymbolProps {
  className?: string;
}

export function MarsSymbol({ className = 'h-4 w-4' }: SymbolProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="10"
        cy="14"
        r="5.5"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M14 10L20 4M20 4H15.2M20 4V8.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VenusSymbol({ className = 'h-4 w-4' }: SymbolProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="12"
        cy="9.2"
        r="5.5"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M12 14.8V21M9 18.2H15"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LipsSymbol({ className = 'h-12 w-12' }: SymbolProps) {
  const uid = useId();
  const glowId = `${uid}-lg`;
  const topId = `${uid}-lt`;
  const botId = `${uid}-lb`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={topId} x1="12" y1="18" x2="52" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id={botId} x1="14" y1="30" x2="50" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="55%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
      </defs>

      <circle cx="32" cy="32" r="28" fill={`url(#${glowId})`} />

      <path
        d="M9 32C14.5 28 20.5 21 25.5 21.5C28.8 21.8 30.6 24 32 24.8C33.4 24 35.2 21.8 38.5 21.5C43.5 21 49.5 28 55 32C49 33.6 42.5 31.2 32 31.6C21.5 31.2 15 33.6 9 32Z"
        fill={`url(#${topId})`}
        style={{ filter: 'drop-shadow(0 4px 10px rgba(220,38,38,0.45))' }}
      />

      <path
        d="M14.5 32.4C22 30.8 42 30.8 49.5 32.4C43.5 35.4 38 36.2 32 36.2C26 36.2 20.5 35.4 14.5 32.4Z"
        fill="#16090D"
      />

      <path
        d="M9.5 32.4C15.5 34.4 23 36.2 32 36.2C41 36.2 48.5 34.4 54.5 32.4C49.5 41.2 42 45.8 32 45.8C22 45.8 14.5 41.2 9.5 32.4Z"
        fill={`url(#${botId})`}
        style={{ filter: 'drop-shadow(0 6px 12px rgba(185,28,28,0.5))' }}
      />

      <path
        d="M23 39.8C26.5 41.4 32 41.6 36 40.4"
        stroke="#FECDD3"
        strokeOpacity="0.65"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 25.2C22.8 24.1 24.8 24.2 26.5 25"
        stroke="#FFE4E6"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HandcuffsSymbol({ className = 'h-12 w-12' }: SymbolProps) {
  const uid = useId();
  const glowId = `${uid}-cg`;
  const ringId = `${uid}-cr`;
  const flameId = `${uid}-cf`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={ringId} x1="12" y1="14" x2="52" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="45%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
        <linearGradient id={flameId} x1="32" y1="12" x2="32" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>

      <circle cx="32" cy="32" r="28" fill={`url(#${glowId})`} />

      <path
        d="M32 10C35.5 14.5 38 18.2 37.2 22.4C36.6 25.5 34.4 27 32 27C29.4 27 27.3 25 27.2 21.8C27.1 19 29.2 15.2 32 10Z"
        fill={`url(#${flameId})`}
        opacity="0.88"
        style={{ filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.55))' }}
      />

      <circle
        cx="21"
        cy="39"
        r="11"
        stroke={`url(#${ringId})`}
        strokeWidth="4.2"
        style={{ filter: 'drop-shadow(0 4px 10px rgba(220,38,38,0.45))' }}
      />
      <circle cx="21" cy="39" r="5.5" stroke="#FECACA" strokeOpacity="0.25" strokeWidth="1.2" />

      <circle
        cx="43"
        cy="36"
        r="11"
        stroke={`url(#${ringId})`}
        strokeWidth="4.2"
        style={{ filter: 'drop-shadow(0 4px 10px rgba(220,38,38,0.45))' }}
      />
      <circle cx="43" cy="36" r="5.5" stroke="#FECACA" strokeOpacity="0.25" strokeWidth="1.2" />

      <path
        d="M28.5 33.5L35.5 31.5"
        stroke="#FCA5A5"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="25.5" cy="29.5" r="2" fill="#F87171" />
      <circle cx="38.5" cy="27" r="2" fill="#F87171" />
    </svg>
  );
}

export function DevilHeartSymbol({ className = 'h-12 w-12' }: SymbolProps) {
  const uid = useId();
  const glowId = `${uid}-dg`;
  const bodyId = `${uid}-db`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="52%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={bodyId} x1="16" y1="16" x2="48" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="48%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
      </defs>

      <circle cx="32" cy="34" r="27" fill={`url(#${glowId})`} />

      <path
        d="M21 22C17.5 17 17 12.5 19 9.5C21.2 12.5 23.6 15.5 26 18.8"
        fill={`url(#${bodyId})`}
        style={{ filter: 'drop-shadow(0 2px 6px rgba(220,38,38,0.45))' }}
      />
      <path
        d="M43 22C46.5 17 47 12.5 45 9.5C42.8 12.5 40.4 15.5 38 18.8"
        fill={`url(#${bodyId})`}
        style={{ filter: 'drop-shadow(0 2px 6px rgba(220,38,38,0.45))' }}
      />

      <path
        d="M32 48.5C32 48.5 14 37.5 14 25.5C14 20.2 18.2 16.5 23.2 16.5C27 16.5 30.1 18.8 32 21.8C33.9 18.8 37 16.5 40.8 16.5C45.8 16.5 50 20.2 50 25.5C50 37.5 32 48.5 32 48.5Z"
        fill={`url(#${bodyId})`}
        style={{ filter: 'drop-shadow(0 6px 14px rgba(220,38,38,0.5))' }}
      />

      <path
        d="M33 47.5C39 51 48 51.5 52 46.5C53.6 44.5 53.5 42 52 40.5"
        stroke="#EF4444"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M52.5 37.5L56 42.5L49.5 42.5Z"
        fill="#F87171"
      />

      <path
        d="M20.5 22.8C22 20.8 24.4 20.4 26.2 21.2"
        stroke="#FFE4E6"
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CoupleIntertwinedSymbol({ className = 'h-12 w-12' }: SymbolProps) {
  const uid = useId();
  const glowId = `${uid}-pg`;
  const blueId = `${uid}-pb`;
  const pinkId = `${uid}-pp`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.28" />
          <stop offset="55%" stopColor="#3B82F6" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#09090B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={blueId} x1="12" y1="20" x2="40" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id={pinkId} x1="24" y1="14" x2="52" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F9A8D4" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#BE185D" />
        </linearGradient>
      </defs>

      <circle cx="32" cy="32" r="28" fill={`url(#${glowId})`} />

      <circle
        cx="25"
        cy="34"
        r="11.5"
        stroke={`url(#${blueId})`}
        strokeWidth="4"
        style={{ filter: 'drop-shadow(0 4px 10px rgba(59,130,246,0.45))' }}
      />
      <path
        d="M33.2 25.8L43.5 15.5M43.5 15.5H36.5M43.5 15.5V22.5"
        stroke={`url(#${blueId})`}
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 2px 6px rgba(59,130,246,0.4))' }}
      />

      <circle
        cx="38.5"
        cy="29.5"
        r="11.5"
        stroke={`url(#${pinkId})`}
        strokeWidth="4"
        style={{ filter: 'drop-shadow(0 4px 10px rgba(236,72,153,0.5))' }}
      />
      <path
        d="M38.5 41V52.5M33.5 47.5H43.5"
        stroke={`url(#${pinkId})`}
        strokeWidth="3.6"
        strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 2px 6px rgba(236,72,153,0.4))' }}
      />

      <circle cx="31.8" cy="31.8" r="2.6" fill="#EF4444" />
    </svg>
  );
}

export function HeroSensualArtwork({ className = 'w-full max-w-[230px]' }: SymbolProps) {
  const uid = useId();
  const auraRed = `${uid}-har`;
  const auraBlue = `${uid}-hab`;
  const auraPink = `${uid}-hap`;
  const blueStroke = `${uid}-hbs`;
  const pinkStroke = `${uid}-hps`;
  const sparkGrad = `${uid}-hsp`;

  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id={auraRed} cx="50%" cy="52%" r="48%">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.32" />
          <stop offset="65%" stopColor="#991B1B" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#09090B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={auraBlue} cx="35%" cy="48%" r="36%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={auraPink} cx="68%" cy="48%" r="36%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={blueStroke} x1="52" y1="54" x2="122" y2="128" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id={pinkStroke} x1="114" y1="50" x2="188" y2="132" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F9A8D4" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#9D174D" />
        </linearGradient>
        <radialGradient id={sparkGrad} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="55%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </radialGradient>
      </defs>

      <ellipse cx="120" cy="94" rx="108" ry="74" fill={`url(#${auraRed})`} />
      <circle cx="88" cy="92" r="64" fill={`url(#${auraBlue})`} />
      <circle cx="154" cy="92" r="64" fill={`url(#${auraPink})`} />

      {/* Símbolo Él (♂ Azul) */}
      <g style={{ filter: 'drop-shadow(0 8px 18px rgba(59,130,246,0.42))' }}>
        <circle
          cx="95"
          cy="94"
          r="35"
          stroke={`url(#${blueStroke})`}
          strokeWidth="7"
        />
        <path
          d="M120 69L144 45M144 45H127M144 45V62"
          stroke={`url(#${blueStroke})`}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Símbolo Ella (♀ Rosa) entrelazado */}
      <g style={{ filter: 'drop-shadow(0 8px 18px rgba(236,72,153,0.46))' }}>
        <circle
          cx="145"
          cy="89"
          r="35"
          stroke={`url(#${pinkStroke})`}
          strokeWidth="7"
        />
        <path
          d="M145 124V156M131 142H159"
          stroke={`url(#${pinkStroke})`}
          strokeWidth="6.5"
          strokeLinecap="round"
        />
      </g>

      {/* Destello rojo en el punto de encuentro */}
      <g style={{ filter: 'drop-shadow(0 0 14px rgba(239,68,68,0.8))' }}>
        <circle cx="120" cy="91.5" r="7" fill={`url(#${sparkGrad})`} />
        <circle cx="120" cy="91.5" r="11" stroke="#EF4444" strokeOpacity="0.4" strokeWidth="1.5" />
      </g>

      {/* Flama sutil */}
      <path
        d="M44 52C48 56.8 50.5 60.5 49.5 64.8C48.7 68 46.2 69.8 43.5 69.8C40.5 69.8 38.2 67.5 38.2 64C38.2 61 40.6 56.8 44 52Z"
        fill="#EF4444"
        opacity="0.85"
        style={{ filter: 'drop-shadow(0 0 10px rgba(239,68,68,0.65))' }}
      />
      {/* Mini corazón sombreado */}
      <path
        d="M196 42C196 42 186 35.8 186 29C186 25.8 188.5 23.8 191.2 23.8C193.3 23.8 195 25 196 26.8C197 25 198.7 23.8 200.8 23.8C203.5 23.8 206 25.8 206 29C206 35.8 196 42 196 42Z"
        fill="#F472B6"
        opacity="0.85"
        style={{ filter: 'drop-shadow(0 0 10px rgba(244,114,182,0.55))' }}
      />
    </svg>
  );
}
