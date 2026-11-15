import { useState, useMemo } from 'react';
import {
  Flame,
  MessageCircleHeart,
  Shuffle,
  SkipForward,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { TRUTH_DARE_CARDS, getLevelMeta } from '../data/content';
import {
  IntensityLevelId,
  PartnersState,
  TruthDareCard,
  TruthOrDareType,
  TurnOwner,
} from '../types/game';
import { playSoftChime } from '../utils/sound';

interface TruthOrDareModeProps {
  partners: PartnersState;
  currentTurn: TurnOwner;
  activeLevel: IntensityLevelId;
  usedCardIds: string[];
  soundEnabled: boolean;
  onMarkUsed: (cardId: string, countAsRound: boolean) => void;
  onRecycleCards: (cardIdsToClear: string[]) => void;
  onPassTurn: (countAsRound?: boolean) => void;
  onOpenIntensity: () => void;
}

export function TruthOrDareMode({
  partners,
  currentTurn,
  activeLevel,
  usedCardIds,
  soundEnabled,
  onMarkUsed,
  onRecycleCards,
  onPassTurn,
  onOpenIntensity,
}: TruthOrDareModeProps) {
  const [currentCard, setCurrentCard] = useState<TruthDareCard | null>(null);
  const [focusLevelOnly, setFocusLevelOnly] = useState(false);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  const isHim = currentTurn === 'him';
  const levelMeta = getLevelMeta(activeLevel);

  const availablePool = useMemo(() => {
    return TRUTH_DARE_CARDS.filter((c) =>
      activeLevel === 2 && focusLevelOnly ? c.level === 2 : c.level <= activeLevel
    );
  }, [activeLevel, focusLevelOnly]);

  const remainingVerdades = useMemo(() => {
    const items = availablePool.filter((c) => c.type === 'verdad');
    return {
      unused: items.filter((c) => !usedCardIds.includes(c.id)).length,
      total: items.length,
    };
  }, [availablePool, usedCardIds]);

  const remainingRetos = useMemo(() => {
    const items = availablePool.filter((c) => c.type === 'reto');
    return {
      unused: items.filter((c) => !usedCardIds.includes(c.id)).length,
      total: items.length,
    };
  }, [availablePool, usedCardIds]);

  const drawCard = (choice: TruthOrDareType | 'random') => {
    const typeFilter =
      choice === 'random' ? (Math.random() < 0.5 ? 'verdad' : 'reto') : choice;

    const matching = availablePool.filter((c) => c.type === typeFilter);
    const fresh = matching.filter(
      (c) => !usedCardIds.includes(c.id) && c.id !== currentCard?.id
    );

    let candidatePool: TruthDareCard[];
    if (fresh.length > 0) {
      candidatePool = fresh;
    } else {
      onRecycleCards(matching.map((c) => c.id));
      const nonRecent = matching.filter(
        (c) => c.id !== currentCard?.id && !recentIds.includes(c.id)
      );
      candidatePool =
        nonRecent.length > 0
          ? nonRecent
          : matching.filter((c) => c.id !== currentCard?.id);
    }

    const finalPool = candidatePool.length > 0 ? candidatePool : matching;
    const picked = finalPool[Math.floor(Math.random() * finalPool.length)];
    if (picked) {
      onMarkUsed(picked.id, false);
      setCurrentCard(picked);
      setRecentIds((prev) =>
        [picked.id, ...prev].slice(0, Math.max(1, Math.min(20, matching.length - 1)))
      );
      playSoftChime(soundEnabled, typeFilter === 'verdad' ? 480 : 560);
    }
  };

  const handleCompleteTurn = () => {
    if (!currentCard) return;
    onMarkUsed(currentCard.id, true);
    setCurrentCard(null);
    onPassTurn(true);
    playSoftChime(soundEnabled, 640);
  };

  const handleSkipTurn = () => {
    if (currentCard) {
      onMarkUsed(currentCard.id, false);
    }
    setCurrentCard(null);
    onPassTurn(false);
  };

  const handleSwapCard = () => {
    if (!currentCard) return;
    onMarkUsed(currentCard.id, false);
    drawCard(currentCard.type);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/65 tabular-nums">
            <span className="font-semibold text-[#EF4444]">
              Nivel {levelMeta.label}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {remainingVerdades.unused}/{remainingVerdades.total} verdades ·{' '}
              {remainingRetos.unused}/{remainingRetos.total} retos
            </span>
          </div>
          <h1 className="font-display mt-2 text-3xl font-bold text-white">
            Verdad o Reto
          </h1>
        </div>

        {activeLevel === 2 ? (
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#141013] p-1">
            <button
              type="button"
              onClick={() => setFocusLevelOnly(false)}
              className={`min-h-[36px] rounded-full px-3.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                !focusLevelOnly
                  ? 'bg-[#DC2626] text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Suave + Rudo
            </button>
            <button
              type="button"
              onClick={() => setFocusLevelOnly(true)}
              className={`min-h-[36px] rounded-full px-3.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                focusLevelOnly
                  ? 'bg-[#DC2626] text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Solo Rudo
            </button>
          </div>
        ) : null}
      </div>

      {!currentCard ? (
        <section
          className={`mt-7 rounded-[30px] border p-6 sm:p-10 ${
            isHim
              ? 'border-[#3B82F6]/35 bg-[#141013]'
              : 'border-[#EC4899]/35 bg-[#141013]'
          }`}
        >
          <p className="text-sm text-white/75">
            Elijan verdad, reto o al azar para {partners.himName} y{' '}
            {partners.herName}.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => drawCard('verdad')}
              className="flex min-h-[120px] flex-col justify-between rounded-3xl border border-white/12 bg-[#09090B] p-5 text-left transition-colors hover:border-red-500/50 hover:bg-[#191115]"
            >
              <MessageCircleHeart className="h-6 w-6 text-[#EF4444]" />
              <div>
                <div className="font-display text-2xl font-bold text-white">
                  Verdad
                </div>
                <div className="mt-1 text-xs text-white/60">
                  Confesiones directas sin filtro
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => drawCard('reto')}
              className="flex min-h-[120px] flex-col justify-between rounded-3xl border border-white/12 bg-[#09090B] p-5 text-left transition-colors hover:border-red-500/50 hover:bg-[#191115]"
            >
              <Flame className="h-6 w-6 text-[#EF4444]" />
              <div>
                <div className="font-display text-2xl font-bold text-white">
                  Reto
                </div>
                <div className="mt-1 text-xs text-white/60">
                  Acciones físicas y contacto directo
                </div>
              </div>
            </button>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => drawCard('random')}
              className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#DC2626] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#EF4444]"
            >
              <Shuffle className="h-4 w-4" />
              <span>Sorpréndeme</span>
            </button>
          </div>
        </section>
      ) : (
        <section
          className={`mt-7 rounded-[30px] border p-6 sm:p-10 ${
            isHim
              ? 'border-[#3B82F6]/45 bg-[#141013]'
              : 'border-[#EC4899]/45 bg-[#141013]'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/65">
            <span className="font-semibold text-[#EF4444]">
              {currentCard.type === 'verdad' ? 'Verdad' : 'Reto'}
            </span>
            <span aria-hidden="true">·</span>
            <span>{getLevelMeta(currentCard.level).label}</span>
          </div>

          <blockquote className="font-display mt-6 text-2xl leading-snug font-semibold text-white sm:text-3xl text-balance">
            {currentCard.prompt}
          </blockquote>

          {currentCard.tip ? (
            <p className="mt-4 border-t border-white/10 pt-4 text-sm text-white/65">
              {currentCard.tip}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleCompleteTurn}
              className="flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-full bg-[#DC2626] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#EF4444]"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Completado</span>
            </button>

            <button
              type="button"
              onClick={handleSwapCard}
              className="flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-white/15 bg-[#09090B] px-5 py-3 text-sm font-medium text-white/85 hover:border-white/30"
            >
              <Shuffle className="h-4 w-4" />
              <span>Otra</span>
            </button>

            <button
              type="button"
              onClick={handleSkipTurn}
              className="flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/70 hover:bg-white/5"
            >
              <SkipForward className="h-4 w-4" />
              <span>Pasar</span>
            </button>
          </div>
        </section>
      )}

      {activeLevel < 2 ? (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-red-500/20 bg-[#141013] px-5 py-3.5 text-xs text-white/70">
          <span>¿Quieren pasar a verdades y retos del modo Rudo?</span>
          <button
            type="button"
            onClick={onOpenIntensity}
            className="inline-flex min-h-[36px] items-center gap-1 font-bold text-[#EF4444] hover:underline whitespace-nowrap"
          >
            <span>Subir a Rudo</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : null}
    </main>
  );
}
