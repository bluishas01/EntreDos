import { useState, useMemo } from 'react';
import {
  MessageCircleQuestion,
  Shuffle,
  SkipForward,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { getLevelMeta } from '../data/content';
import { QUESTIONS_DECK } from '../data/questions';
import {
  EroticQuestion,
  IntensityLevelId,
  PartnersState,
  TurnOwner,
} from '../types/game';
import { playSoftChime } from '../utils/sound';

interface QuestionsModeProps {
  partners: PartnersState;
  currentTurn: TurnOwner;
  activeLevel: IntensityLevelId;
  usedCardIds: string[];
  soundEnabled: boolean;
  onMarkUsed: (cardId: string, countAsRound: boolean) => void;
  onRecycleCards: (cardIdsToClear: string[]) => void;
  onPassTurn: (countAsRound?: boolean) => void;
  onSetTurn: (turn: TurnOwner) => void;
  onOpenIntensity: () => void;
}

export function QuestionsMode({
  partners,
  currentTurn,
  activeLevel,
  usedCardIds,
  soundEnabled,
  onMarkUsed,
  onRecycleCards,
  onPassTurn,
  onSetTurn,
  onOpenIntensity,
}: QuestionsModeProps) {
  const [currentCard, setCurrentCard] = useState<EroticQuestion | null>(null);
  const [focusLevelOnly, setFocusLevelOnly] = useState(false);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  const isHim = currentTurn === 'him';
  const currentPlayer = isHim ? partners.himName : partners.herName;
  const levelMeta = getLevelMeta(activeLevel);

  const availablePool = useMemo(() => {
    return QUESTIONS_DECK.filter((q) =>
      activeLevel === 2 && focusLevelOnly ? q.level === 2 : q.level <= activeLevel
    );
  }, [activeLevel, focusLevelOnly]);

  const remainingCount = useMemo(
    () => availablePool.filter((q) => !usedCardIds.includes(q.id)).length,
    [availablePool, usedCardIds]
  );

  const drawQuestion = () => {
    const fresh = availablePool.filter(
      (q) => !usedCardIds.includes(q.id) && q.id !== currentCard?.id
    );

    let candidatePool: EroticQuestion[];
    if (fresh.length > 0) {
      candidatePool = fresh;
    } else {
      onRecycleCards(availablePool.map((q) => q.id));
      const nonRecent = availablePool.filter(
        (q) => q.id !== currentCard?.id && !recentIds.includes(q.id)
      );
      candidatePool =
        nonRecent.length > 0
          ? nonRecent
          : availablePool.filter((q) => q.id !== currentCard?.id);
    }

    const finalPool = candidatePool.length > 0 ? candidatePool : availablePool;
    const picked = finalPool[Math.floor(Math.random() * finalPool.length)];
    if (picked) {
      onMarkUsed(picked.id, false);
      setCurrentCard(picked);
      setRecentIds((prev) =>
        [picked.id, ...prev].slice(0, Math.max(1, Math.min(24, availablePool.length - 1)))
      );
      playSoftChime(soundEnabled, isHim ? 490 : 570);
    }
  };

  const handleNextForOther = () => {
    if (currentCard) {
      onMarkUsed(currentCard.id, true);
    }
    onPassTurn(true);
    drawQuestion();
  };

  const handleSkip = () => {
    if (currentCard) {
      onMarkUsed(currentCard.id, false);
    }
    onPassTurn(false);
    drawQuestion();
  };

  const handleSwapCard = () => {
    if (!currentCard) return;
    onMarkUsed(currentCard.id, false);
    drawQuestion();
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/65 tabular-nums">
            <span className="font-semibold text-[#EF4444]">
              {availablePool.length} preguntas sin repetir
            </span>
            <span aria-hidden="true">·</span>
            <span>Nivel {levelMeta.label}</span>
            <span aria-hidden="true">·</span>
            <span>
              Quedan {remainingCount}/{availablePool.length}
            </span>
          </div>
          <h1 className="font-display mt-2 text-3xl font-bold text-white">
            Preguntas
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Selector directo Azul (Él) / Rosa (Ella) */}
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#141013] p-1">
            <button
              type="button"
              onClick={() => onSetTurn('him')}
              className={`min-h-[36px] rounded-full px-3.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                isHim
                  ? 'bg-[#2563EB] text-white'
                  : 'text-white/65 hover:text-[#93C5FD]'
              }`}
            >
              {partners.himName}
            </button>
            <button
              type="button"
              onClick={() => onSetTurn('her')}
              className={`min-h-[36px] rounded-full px-3.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                !isHim
                  ? 'bg-[#DB2777] text-white'
                  : 'text-white/65 hover:text-[#F9A8D4]'
              }`}
            >
              {partners.herName}
            </button>
          </div>

          {activeLevel === 2 ? (
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#141013] p-1">
              <button
                type="button"
                onClick={() => setFocusLevelOnly(false)}
                className={`min-h-[36px] rounded-full px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
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
                className={`min-h-[36px] rounded-full px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
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
      </div>

      {!currentCard ? (
        <section
          className={`mt-7 rounded-[30px] border p-6 sm:p-10 transition-colors duration-300 ${
            isHim
              ? 'border-[#3B82F6]/65 bg-gradient-to-br from-[#2563EB]/25 via-[#0F172A] to-[#0A0E1A]'
              : 'border-[#EC4899]/65 bg-gradient-to-br from-[#DB2777]/25 via-[#240F1C] to-[#160911]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                isHim
                  ? 'bg-[#3B82F6]/25 text-[#93C5FD]'
                  : 'bg-[#EC4899]/25 text-[#F9A8D4]'
              }`}
            >
              <MessageCircleQuestion className="h-6 w-6" />
            </div>
            <div>
              <div
                className={`text-xs font-semibold ${
                  isHim ? 'text-[#93C5FD]' : 'text-[#F9A8D4]'
                }`}
              >
                Para {currentPlayer}
              </div>
              <div className="font-display text-xl font-bold text-white">
                {availablePool.length} preguntas diferentes
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Cada tarjeta cambia a azul para {partners.himName} y rosa para{' '}
            {partners.herName}, sin repetir ninguna hasta terminar toda la baraja.
          </p>

          <div className="mt-7">
            <button
              type="button"
              onClick={drawQuestion}
              className={`flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-colors ${
                isHim
                  ? 'bg-[#2563EB] hover:bg-[#3B82F6]'
                  : 'bg-[#DB2777] hover:bg-[#EC4899]'
              }`}
            >
              <Shuffle className="h-4 w-4" />
              <span>Sacar pregunta</span>
            </button>
          </div>
        </section>
      ) : (
        <section
          className={`mt-7 rounded-[30px] border p-6 sm:p-10 transition-colors duration-300 ${
            isHim
              ? 'border-[#3B82F6]/70 bg-gradient-to-br from-[#2563EB]/28 via-[#0F172A] to-[#0A0E1A]'
              : 'border-[#EC4899]/70 bg-gradient-to-br from-[#DB2777]/28 via-[#240F1C] to-[#160911]'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
            <span
              className={`font-bold ${
                isHim ? 'text-[#93C5FD]' : 'text-[#F9A8D4]'
              }`}
            >
              {currentPlayer}
            </span>
            <span aria-hidden="true">·</span>
            <span
              className={`font-semibold ${
                isHim ? 'text-[#60A5FA]' : 'text-[#F472B6]'
              }`}
            >
              {currentCard.topic}
            </span>
            <span aria-hidden="true">·</span>
            <span>{getLevelMeta(currentCard.level).label}</span>
          </div>

          <blockquote
            className={`font-display mt-6 text-2xl leading-snug font-semibold sm:text-3xl text-balance ${
              isHim ? 'text-[#EFF6FF]' : 'text-[#FDF2F8]'
            }`}
          >
            {currentCard.prompt}
          </blockquote>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleNextForOther}
              className={`flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white transition-colors ${
                isHim
                  ? 'bg-[#2563EB] hover:bg-[#3B82F6]'
                  : 'bg-[#DB2777] hover:bg-[#EC4899]'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Siguiente</span>
            </button>

            <button
              type="button"
              onClick={handleSwapCard}
              className="flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-white/15 bg-[#09090B]/70 px-5 py-3 text-sm font-medium text-white/90 hover:border-white/30"
            >
              <Shuffle className="h-4 w-4" />
              <span>Otra</span>
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/75 hover:bg-white/5"
            >
              <SkipForward className="h-4 w-4" />
              <span>Pasar</span>
            </button>
          </div>
        </section>
      )}

      {activeLevel < 2 ? (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-red-500/20 bg-[#141013] px-5 py-3.5 text-xs text-white/70">
          <span>¿Quieren desbloquear las preguntas fuertes del modo Rudo?</span>
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
