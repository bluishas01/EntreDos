import { useState, useMemo } from 'react';
import {
  Search,
  PlayCircle,
  Shuffle,
  CheckCircle2,
  X,
} from 'lucide-react';
import { getLevelMeta } from '../data/content';
import { KAMASUTRA_POSITIONS } from '../data/positions';
import {
  IntensityLevelId,
  PartnersState,
  PositionItem,
  TurnOwner,
} from '../types/game';
import { playSoftChime } from '../utils/sound';
import { PositionAnimation } from './PositionAnimation';

interface PositionsModeProps {
  partners: PartnersState;
  currentTurn: TurnOwner;
  activeLevel: IntensityLevelId;
  soundEnabled: boolean;
  onPassTurn: (countAsRound?: boolean) => void;
  onOpenIntensity: () => void;
}

export function PositionsMode({
  partners,
  currentTurn,
  activeLevel,
  soundEnabled,
  onPassTurn,
  onOpenIntensity,
}: PositionsModeProps) {
  const [levelFilter, setLevelFilter] = useState<'all' | IntensityLevelId>(
    'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedPosition, setInspectedPosition] =
    useState<PositionItem | null>(null);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  const levelMeta = getLevelMeta(activeLevel);

  const totalAvailable = useMemo(
    () => KAMASUTRA_POSITIONS.filter((p) => p.level <= activeLevel).length,
    [activeLevel]
  );

  const filteredPositions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return KAMASUTRA_POSITIONS.filter((item) => {
      if (item.level > activeLevel) return false;
      if (levelFilter !== 'all' && item.level !== levelFilter) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.shortLabel.toLowerCase().includes(q)
      );
    });
  }, [activeLevel, levelFilter, searchQuery]);

  const handlePickRandom = () => {
    const pool =
      filteredPositions.length > 0
        ? filteredPositions
        : KAMASUTRA_POSITIONS.filter((p) => p.level <= activeLevel);
    if (pool.length === 0) return;

    const nonRecent = pool.filter(
      (p) => p.id !== inspectedPosition?.id && !recentIds.includes(p.id)
    );
    const candidatePool =
      nonRecent.length > 0
        ? nonRecent
        : pool.filter((p) => p.id !== inspectedPosition?.id);
    const finalPool = candidatePool.length > 0 ? candidatePool : pool;

    const picked = finalPool[Math.floor(Math.random() * finalPool.length)];
    setInspectedPosition(picked);
    setRecentIds((prev) =>
      [picked.id, ...prev].slice(0, Math.min(20, pool.length - 1))
    );
    playSoftChime(soundEnabled, 580);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/65 tabular-nums">
            <span className="font-semibold text-[#EF4444]">
              {KAMASUTRA_POSITIONS.length} posturas animadas
            </span>
            <span aria-hidden="true">·</span>
            <span>Nivel {levelMeta.label}</span>
          </div>
          <h1 className="font-display mt-2 text-3xl font-bold text-white">
            Posiciones
          </h1>
          <p className="mt-1.5 text-sm text-white/65">
            Toca cualquier postura para ver la animación entre él y ella y lo
            indispensable para hacerla.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePickRandom}
          className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#DC2626] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#EF4444] whitespace-nowrap"
        >
          <Shuffle className="h-4 w-4" />
          <span>Elegir una al azar</span>
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-[#141013] p-1 self-start">
          <button
            type="button"
            onClick={() => setLevelFilter('all')}
            className={`min-h-[36px] rounded-full px-3.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap tabular-nums ${
              levelFilter === 'all'
                ? 'bg-[#DC2626] text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Todas ({totalAvailable})
          </button>
          {([1, 2] as IntensityLevelId[])
            .filter((id) => id <= activeLevel)
            .map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setLevelFilter(id)}
                className={`min-h-[36px] rounded-full px-3.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                  levelFilter === id
                    ? 'bg-[#DC2626] text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {getLevelMeta(id).label}
              </button>
            ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar posición..."
            className="w-full min-h-[42px] rounded-full border border-white/15 bg-[#141013] pl-10 pr-4 text-xs text-white placeholder:text-white/40 focus:border-[#EF4444] focus:outline-none"
          />
        </div>
      </div>

      {activeLevel < 2 ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-red-500/20 bg-[#141013] px-5 py-3 text-xs text-white/70">
          <span>
            Viendo {totalAvailable} de las {KAMASUTRA_POSITIONS.length} posturas
            clásicas (modo {levelMeta.label}).
          </span>
          <button
            type="button"
            onClick={onOpenIntensity}
            className="font-bold text-[#EF4444] hover:underline whitespace-nowrap"
          >
            Subir a Rudo para ver las {KAMASUTRA_POSITIONS.length}
          </button>
        </div>
      ) : null}

      {filteredPositions.length === 0 ? (
        <div className="mt-8 rounded-[30px] border border-white/10 bg-[#141013] p-8 text-center">
          <p className="text-sm text-white/70">
            No encontramos posturas con «{searchQuery}». Prueba otro nombre o limpia
            el buscador.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPositions.map((pos) => {
            const lvl = getLevelMeta(pos.level);
            return (
              <article
                key={pos.id}
                className="flex flex-col justify-between rounded-[28px] border border-white/10 bg-[#141013] p-5 transition-colors hover:border-red-500/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold" style={{ color: lvl.accentHex }}>
                      {lvl.label}
                    </span>
                    <span className="text-white/45 tabular-nums">
                      #{String(pos.number).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="font-display mt-2 text-lg font-bold text-white">
                    {pos.title}
                  </h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                    {pos.description}
                  </p>
                </div>

                <div className="mt-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setInspectedPosition(pos);
                      playSoftChime(soundEnabled, 520);
                    }}
                    className="inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-full border border-red-500/35 bg-[#DC2626]/12 px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#DC2626]/25"
                  >
                    <PlayCircle className="h-3.5 w-3.5 text-[#EF4444]" />
                    <span>Ver cómo se hace</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Modal con animación hombre/mujer y solo lo indispensable */}
      {inspectedPosition ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/85 p-0 sm:items-center sm:p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-[32px] sm:rounded-[30px] border border-red-500/25 bg-[#141013] p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-[#EF4444] tabular-nums">
                  {getLevelMeta(inspectedPosition.level).label} · #
                  {String(inspectedPosition.number).padStart(2, '0')}
                </div>
                <h2 className="font-display mt-1 text-2xl font-bold text-white">
                  {inspectedPosition.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setInspectedPosition(null)}
                aria-label="Cerrar"
                className="flex min-h-[42px] min-w-[42px] shrink-0 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <PositionAnimation
              positionId={inspectedPosition.id}
              poseStyle={inspectedPosition.poseStyle}
              tempo={inspectedPosition.tempo}
              himLabel={partners.himName}
              herLabel={partners.herName}
            />

            {/* Solo lo indispensable de cómo hacerla */}
            <div className="rounded-3xl border border-white/10 bg-[#09090B] p-4">
              <div className="text-xs font-semibold text-white/60">
                Cómo hacerla
              </div>
              <ol className="mt-2 space-y-2 text-sm text-white/90">
                {inspectedPosition.stepByStep.map((step, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="text-xs font-bold text-[#EF4444] tabular-nums pt-0.5">
                      {i + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  onPassTurn(true);
                  setInspectedPosition(null);
                  playSoftChime(soundEnabled, 620);
                }}
                className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-[#DC2626] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#EF4444]"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Hecha</span>
              </button>

              <button
                type="button"
                onClick={handlePickRandom}
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/85 hover:bg-white/5"
              >
                <Shuffle className="h-4 w-4" />
                <span>Otra</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
