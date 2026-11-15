import { ArrowLeft, SlidersHorizontal, Volume2, VolumeX } from 'lucide-react';
import { getLevelMeta } from '../data/content';
import { GameMode, IntensityLevelId } from '../types/game';
import { HeroSensualArtwork } from './SensualSymbols';

interface TopBarProps {
  activeMode: GameMode;
  activeLevel: IntensityLevelId;
  soundEnabled: boolean;
  onBackToHub: () => void;
  onOpenIntensity: () => void;
  onToggleSound: () => void;
}

export function TopBar({
  activeMode,
  activeLevel,
  soundEnabled,
  onBackToHub,
  onOpenIntensity,
  onToggleSound,
}: TopBarProps) {
  const levelMeta = getLevelMeta(activeLevel);

  return (
    <header className="sticky top-0 z-40 border-b border-red-500/20 bg-[#09090B]/92 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-2 min-w-0">
          {activeMode !== 'hub' ? (
            <button
              type="button"
              onClick={onBackToHub}
              aria-label="Volver al inicio"
              className="flex min-h-[42px] min-w-[42px] items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={onBackToHub}
            className="inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            <HeroSensualArtwork className="h-8 w-10 shrink-0" />
            <span>
              Entre <span className="text-[#EF4444]">Dos</span>
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenIntensity}
            className={`flex min-h-[40px] items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeLevel === 2
                ? 'border-red-500/50 bg-[#DC2626] text-white hover:bg-[#EF4444]'
                : 'border-white/15 bg-[#161215] text-white/90 hover:border-red-500/40'
            }`}
            title="Ajustar intensidad"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>{levelMeta.label}</span>
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Silenciar sonido' : 'Activar sonido'}
            className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full border border-white/12 bg-[#161215] text-white/75 transition-colors hover:border-white/25 hover:text-white shrink-0"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4 text-white/45" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
