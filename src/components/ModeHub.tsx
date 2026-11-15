import { useState, type ComponentType } from 'react';
import { ArrowUpRight, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { getLevelMeta, TRUTH_DARE_CARDS } from '../data/content';
import { QUESTIONS_DECK } from '../data/questions';
import { SEXUAL_GAMES_DECK } from '../data/sexualGames';
import { KAMASUTRA_POSITIONS } from '../data/positions';
import {
  GameMode,
  IntensityLevelId,
  PartnersState,
} from '../types/game';
import { LegalModal } from './LegalModal';
import {
  CoupleIntertwinedSymbol,
  DevilHeartSymbol,
  HandcuffsSymbol,
  HeroSensualArtwork,
  LipsSymbol,
  MarsSymbol,
  VenusSymbol,
} from './SensualSymbols';

interface ModeHubProps {
  partners: PartnersState;
  activeLevel: IntensityLevelId;
  onSelectMode: (mode: GameMode) => void;
  onOpenIntensity: () => void;
  onResetSession: () => void;
}

export function ModeHub({
  partners,
  activeLevel,
  onSelectMode,
  onOpenIntensity,
  onResetSession,
}: ModeHubProps) {
  const [confirmReset, setConfirmReset] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const levelMeta = getLevelMeta(activeLevel);

  const modeCards: Array<{
    id: Exclude<GameMode, 'hub'>;
    title: string;
    meta: string;
    description: string;
    Symbol: ComponentType<{ className?: string }>;
    glowClass: string;
    accentColor: string;
  }> = [
    {
      id: 'questions',
      title: 'Preguntas',
      meta: `${QUESTIONS_DECK.length} preguntas únicas · Azul y Rosa`,
      description:
        '300 preguntas sin filtro que cambian a azul para él y rosa para ella en cada turno.',
      Symbol: LipsSymbol,
      glowClass:
        'hover:border-[#EF4444]/50 hover:shadow-[0_18px_42px_-20px_rgba(239,68,68,0.55)]',
      accentColor: 'text-[#F87171]',
    },
    {
      id: 'sexual_games',
      title: 'Juegos Sexuales',
      meta: `${SEXUAL_GAMES_DECK.length} juegos · Incluye orales`,
      description:
        'Más de 380 retos y juegos sexuales con reloj integrado, incluyendo sección especial de orales.',
      Symbol: HandcuffsSymbol,
      glowClass:
        'hover:border-[#EF4444]/50 hover:shadow-[0_18px_42px_-20px_rgba(220,38,38,0.58)]',
      accentColor: 'text-[#EF4444]',
    },
    {
      id: 'truth_or_dare',
      title: 'Verdad o Reto',
      meta: `${TRUTH_DARE_CARDS.length} verdades y retos · Suave o Rudo`,
      description:
        'Confesiones atrevidas y retos directos para subir el calor al ritmo que ustedes elijan.',
      Symbol: DevilHeartSymbol,
      glowClass:
        'hover:border-[#EC4899]/50 hover:shadow-[0_18px_42px_-20px_rgba(236,72,153,0.5)]',
      accentColor: 'text-[#F472B6]',
    },
    {
      id: 'positions',
      title: 'Posiciones',
      meta: `${KAMASUTRA_POSITIONS.length} posturas · Animadas`,
      description:
        'Posturas detalladas con animación coordinada entre hombre y mujer en azul y rosa.',
      Symbol: CoupleIntertwinedSymbol,
      glowClass:
        'hover:border-[#3B82F6]/50 hover:shadow-[0_18px_42px_-20px_rgba(59,130,246,0.5)]',
      accentColor: 'text-[#60A5FA]',
    },
  ];

  return (
    <main className="relative mx-auto max-w-5xl px-4 py-7 sm:px-6 lg:py-10">
      {/* Cabecera atractiva con sombreado suave y símbolos entrelazados */}
      <section className="relative overflow-hidden rounded-[32px] border border-red-500/30 bg-gradient-to-br from-[#2A0B13] via-[#141013] to-[#0D0A0E] p-6 sm:p-8 shadow-[0_24px_65px_-24px_rgba(220,38,38,0.45)]">
        {/* Resplandor ambiental sutil */}
        <div
          aria-hidden="true"
          className="pointer-events-none -right-12 -top-12 absolute h-56 w-56 rounded-full bg-[#DC2626]/20 blur-[70px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none -bottom-14 left-1/3 absolute h-48 w-48 rounded-full bg-[#EC4899]/12 blur-[70px]"
        />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 text-[#60A5FA]">
                <MarsSymbol className="h-3.5 w-3.5" />
                <span>{partners.himName}</span>
              </span>
              <span aria-hidden="true" className="text-white/35">·</span>
              <span className="inline-flex items-center gap-1.5 text-[#F472B6]">
                <VenusSymbol className="h-3.5 w-3.5" />
                <span>{partners.herName}</span>
              </span>
              <span aria-hidden="true" className="text-white/35">·</span>
              <span className="text-white/75">Modo {levelMeta.label}</span>
            </div>

            <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
              Entre <span className="text-[#EF4444]">Dos</span>
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">
              Su noche privada para romper la rutina, soltar el morbo y encender
              el deseo a su propio ritmo.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenIntensity}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-r from-[#DC2626] to-[#EF4444] px-5 py-2 text-xs font-bold text-white shadow-[0_10px_26px_-8px_rgba(220,38,38,0.7)] transition-all hover:brightness-110 whitespace-nowrap shrink-0"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Intensidad: {levelMeta.label}</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end shrink-0">
            <HeroSensualArtwork className="w-[195px] sm:w-[220px]" />
          </div>
        </div>
      </section>

      {/* Los 4 modos con símbolos sexuales sombreados y silueta lateral */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {modeCards.map((card) => {
          const Symbol = card.Symbol;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectMode(card.id)}
              className={`group relative overflow-hidden flex flex-col justify-between rounded-[30px] border border-white/10 bg-gradient-to-br from-[#191115] via-[#141013] to-[#0E0B0D] p-6 text-left transition-all duration-200 hover:-translate-y-0.5 ${card.glowClass}`}
            >
              {/* Símbolo sombreado decorativo en la esquina inferior derecha */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-3 -right-3 opacity-20 transition-all duration-200 group-hover:scale-110 group-hover:opacity-35"
              >
                <Symbol className="h-28 w-28" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#09090B]/80 shadow-[0_8px_22px_-8px_rgba(220,38,38,0.4)] transition-transform duration-200 group-hover:scale-105">
                    <Symbol className="h-11 w-11" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#EF4444]" />
                </div>

                <h2 className="font-display mt-4 text-2xl font-bold text-white">
                  {card.title}
                </h2>
                <div className={`mt-1 text-xs font-semibold tabular-nums ${card.accentColor}`}>
                  {card.meta}
                </div>
                <p className="mt-2.5 max-w-[90%] text-sm leading-relaxed text-white/65">
                  {card.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Reinicio y privacidad al pie */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {!confirmReset ? (
          <>
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white/45 transition-colors hover:bg-white/5 hover:text-white/80"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Cambiar nombres o empezar de cero</span>
            </button>
            <span aria-hidden="true" className="text-white/25">·</span>
            <button
              type="button"
              onClick={() => setShowLegal(true)}
              className="inline-flex min-h-[40px] items-center rounded-full px-3 py-2 text-xs font-medium text-white/45 transition-colors hover:bg-white/5 hover:text-white/80"
            >
              Privacidad y Términos +18
            </button>
          </>
        ) : (
          <div className="flex flex-wrap items-center gap-2 rounded-full border border-red-500/35 bg-[#141013] px-4 py-2 text-xs">
            <span className="text-white/75">¿Borrar partida guardada?</span>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="rounded-full px-3 py-1 font-medium text-white/70 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onResetSession}
              className="rounded-full bg-[#DC2626] px-3 py-1 font-semibold text-white hover:bg-[#EF4444]"
            >
              Confirmar
            </button>
          </div>
        )}
      </div>

      {showLegal ? <LegalModal onClose={() => setShowLegal(false)} /> : null}
    </main>
  );
}
