import { useState, useMemo, useEffect } from 'react';
import {
  Flame,
  Shuffle,
  SkipForward,
  CheckCircle2,
  Timer,
  Play,
  Pause,
  RotateCcw,
  ArrowUpRight,
} from 'lucide-react';
import { getLevelMeta } from '../data/content';
import { SEXUAL_GAMES_DECK, isOralGame } from '../data/sexualGames';
import {
  IntensityLevelId,
  PartnersState,
  SexualGame,
  TurnOwner,
} from '../types/game';
import { playMatchChord, playSoftChime } from '../utils/sound';

interface SexualGamesModeProps {
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

function formatTimer(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function SexualGamesMode({
  partners,
  currentTurn,
  activeLevel,
  usedCardIds,
  soundEnabled,
  onMarkUsed,
  onRecycleCards,
  onPassTurn,
  onOpenIntensity,
}: SexualGamesModeProps) {
  const [currentCard, setCurrentCard] = useState<SexualGame | null>(null);
  const [focusLevelOnly, setFocusLevelOnly] = useState(false);
  const [oralOnly, setOralOnly] = useState(false);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);

  const isHim = currentTurn === 'him';
  const levelMeta = getLevelMeta(activeLevel);

  const availablePool = useMemo(() => {
    return SEXUAL_GAMES_DECK.filter((g) => {
      const levelOk =
        activeLevel === 2 && focusLevelOnly ? g.level === 2 : g.level <= activeLevel;
      if (!levelOk) return false;
      return oralOnly ? isOralGame(g) : true;
    });
  }, [activeLevel, focusLevelOnly, oralOnly]);

  const oralCount = useMemo(() => {
    return SEXUAL_GAMES_DECK.filter((g) => {
      const levelOk =
        activeLevel === 2 && focusLevelOnly ? g.level === 2 : g.level <= activeLevel;
      return levelOk && isOralGame(g);
    }).length;
  }, [activeLevel, focusLevelOnly]);

  const remainingCount = useMemo(
    () => availablePool.filter((g) => !usedCardIds.includes(g.id)).length,
    [availablePool, usedCardIds]
  );

  useEffect(() => {
    if (!timerRunning || secondsLeft === null) return;
    if (secondsLeft <= 0) {
      setTimerRunning(false);
      playMatchChord(soundEnabled);
      return;
    }
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning, secondsLeft, soundEnabled]);

  const drawGame = () => {
    const fresh = availablePool.filter(
      (g) => !usedCardIds.includes(g.id) && g.id !== currentCard?.id
    );

    let candidatePool: SexualGame[];
    if (fresh.length > 0) {
      candidatePool = fresh;
    } else {
      onRecycleCards(availablePool.map((g) => g.id));
      const nonRecent = availablePool.filter(
        (g) => g.id !== currentCard?.id && !recentIds.includes(g.id)
      );
      candidatePool =
        nonRecent.length > 0
          ? nonRecent
          : availablePool.filter((g) => g.id !== currentCard?.id);
    }

    const finalPool = candidatePool.length > 0 ? candidatePool : availablePool;
    const picked = finalPool[Math.floor(Math.random() * finalPool.length)];
    if (picked) {
      onMarkUsed(picked.id, false);
      setCurrentCard(picked);
      setRecentIds((prev) =>
        [picked.id, ...prev].slice(0, Math.max(1, Math.min(25, availablePool.length - 1)))
      );
      setTimerRunning(false);
      setSecondsLeft(picked.durationSeconds ?? null);
      playSoftChime(soundEnabled, 590);
    }
  };

  const handleToggleOralFilter = (nextOralOnly: boolean) => {
    setOralOnly(nextOralOnly);
    setTimerRunning(false);
    setSecondsLeft(null);
    setCurrentCard(null);
  };

  const handleToggleFocusLevel = (nextFocusOnly: boolean) => {
    setFocusLevelOnly(nextFocusOnly);
    setTimerRunning(false);
    setSecondsLeft(null);
    setCurrentCard(null);
  };

  const handleCompleteTurn = () => {
    if (!currentCard) return;
    setTimerRunning(false);
    setSecondsLeft(null);
    onMarkUsed(currentCard.id, true);
    setCurrentCard(null);
    onPassTurn(true);
    playSoftChime(soundEnabled, 650);
  };

  const handleSkipTurn = () => {
    setTimerRunning(false);
    setSecondsLeft(null);
    if (currentCard) {
      onMarkUsed(currentCard.id, false);
    }
    setCurrentCard(null);
    onPassTurn(false);
  };

  const handleSwapCard = () => {
    if (!currentCard) return;
    onMarkUsed(currentCard.id, false);
    drawGame();
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/65 tabular-nums">
            <span className="font-semibold text-[#EF4444]">
              {availablePool.length} {oralOnly ? 'juegos orales' : 'juegos sin repetir'}
            </span>
            <span aria-hidden="true">·</span>
            <span>Nivel {levelMeta.label}</span>
            <span aria-hidden="true">·</span>
            <span>
              Quedan {remainingCount}/{availablePool.length}
            </span>
          </div>
          <h1 className="font-display mt-2 text-3xl font-bold text-white">
            Juegos Sexuales
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#141013] p-1">
            <button
              type="button"
              onClick={() => handleToggleOralFilter(false)}
              className={`min-h-[36px] rounded-full px-3.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                !oralOnly
                  ? 'bg-[#DC2626] text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => handleToggleOralFilter(true)}
              className={`min-h-[36px] rounded-full px-3.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                oralOnly
                  ? 'bg-[#DC2626] text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Orales ({oralCount})
            </button>
          </div>

          {activeLevel === 2 ? (
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#141013] p-1">
              <button
                type="button"
                onClick={() => handleToggleFocusLevel(false)}
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
                onClick={() => handleToggleFocusLevel(true)}
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
      </div>

      {!currentCard ? (
        <section
          className={`mt-7 rounded-[30px] border p-6 sm:p-10 ${
            isHim
              ? 'border-[#3B82F6]/35 bg-[#141013]'
              : 'border-[#EC4899]/35 bg-[#141013]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DC2626]/20 text-[#EF4444]">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white/60">
                {availablePool.length}{' '}
                {oralOnly ? 'juegos orales distintos' : 'juegos sexuales distintos'}
              </div>
              <div className="font-display text-xl font-bold text-white">
                {oralOnly ? 'Especial juegos orales con reloj' : 'Tarjetas con reloj en vivo'}
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {oralOnly
              ? `Puros juegos orales únicos para disfrutar entre ${partners.himName} y ${partners.herName}, sin repetir hasta completar la baraja.`
              : `Cada tarjeta trae un juego sexual único (incluyendo juegos orales) con reloj integrado para disfrutar entre ${partners.himName} y ${partners.herName}.`}
          </p>

          <div className="mt-7">
            <button
              type="button"
              onClick={drawGame}
              className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#DC2626] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#EF4444]"
            >
              <Shuffle className="h-4 w-4" />
              <span>{oralOnly ? 'Sacar juego oral' : 'Sacar juego sexual'}</span>
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
            <span className="text-[#EF4444] font-semibold">
              {currentCard.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{getLevelMeta(currentCard.level).label}</span>
          </div>

          <blockquote className="font-display mt-6 text-2xl leading-snug font-semibold text-white sm:text-3xl text-balance">
            {currentCard.prompt}
          </blockquote>

          {currentCard.guidance ? (
            <p className="mt-4 border-t border-white/10 pt-4 text-sm text-white/70">
              {currentCard.guidance}
            </p>
          ) : null}

          {currentCard.durationSeconds && secondsLeft !== null ? (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/12 bg-[#09090B] p-4">
              <div className="flex items-center gap-3">
                <Timer className="h-5 w-5 text-[#EF4444]" />
                <div>
                  <div className="text-xs text-white/55">Reloj del juego</div>
                  <div className="text-2xl font-bold text-white tabular-nums">
                    {secondsLeft === 0 ? 'Tiempo cumplido' : formatTimer(secondsLeft)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (secondsLeft === 0 && currentCard.durationSeconds) {
                      setSecondsLeft(currentCard.durationSeconds);
                    }
                    setTimerRunning((prev) => !prev);
                  }}
                  className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-[#DC2626] px-4 py-2 text-xs font-bold text-white hover:bg-[#EF4444]"
                >
                  {timerRunning ? (
                    <>
                      <Pause className="h-3.5 w-3.5 fill-current" />
                      <span>Parar</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>{secondsLeft === 0 ? 'Repetir' : 'Iniciar'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTimerRunning(false);
                    setSecondsLeft(currentCard.durationSeconds ?? null);
                  }}
                  aria-label="Reiniciar reloj"
                  className="flex min-h-[42px] min-w-[42px] items-center justify-center rounded-full border border-white/15 text-white/75 hover:bg-white/5"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
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
              <span>Otro</span>
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
          <span>
            ¿Quieren activar los más de 200 juegos sexuales directos del modo Rudo?
          </span>
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
