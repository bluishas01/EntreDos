import { useState } from 'react';
import { Check, ArrowDown, ArrowUp, X } from 'lucide-react';
import { INTENSITY_LEVELS } from '../data/content';
import { IntensityLevelId, PartnersState } from '../types/game';

interface IntensityModalProps {
  partners: PartnersState;
  activeLevel: IntensityLevelId;
  acceptedMaxLevel: IntensityLevelId;
  onApplyLevel: (
    newActiveLevel: IntensityLevelId,
    newMaxLevel: IntensityLevelId
  ) => void;
  onClose: () => void;
}

export function IntensityModal({
  partners,
  activeLevel,
  acceptedMaxLevel,
  onApplyLevel,
  onClose,
}: IntensityModalProps) {
  const [pendingLevel, setPendingLevel] = useState<IntensityLevelId | null>(null);
  const [confirmHim, setConfirmHim] = useState(false);
  const [confirmHer, setConfirmHer] = useState(false);

  const handleSelectTarget = (targetId: IntensityLevelId) => {
    if (targetId <= activeLevel) {
      onApplyLevel(targetId, acceptedMaxLevel);
      onClose();
      return;
    }
    setPendingLevel(targetId);
    setConfirmHim(false);
    setConfirmHer(false);
  };

  const handleConfirmUpgrade = () => {
    if (!pendingLevel || !confirmHim || !confirmHer) return;
    const nextMax =
      pendingLevel > acceptedMaxLevel ? pendingLevel : acceptedMaxLevel;
    onApplyLevel(pendingLevel, nextMax);
    onClose();
  };

  const pendingMeta = pendingLevel
    ? INTENSITY_LEVELS.find((l) => l.id === pendingLevel)
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 sm:items-center sm:p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intensity-modal-title"
    >
      <div className="w-full max-w-lg rounded-t-[32px] sm:rounded-[30px] border border-red-500/25 bg-[#141013] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="intensity-modal-title"
              className="font-display text-2xl font-bold text-white"
            >
              Intensidad del juego
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Bajar a Suave es al instante. Subir a Rudo requiere que ambos confirmen.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex min-h-[42px] min-w-[42px] items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {pendingMeta ? (
          <div className="mt-6 space-y-5 rounded-3xl border border-red-500/35 bg-[#09090B] p-5">
            <div>
              <div className="text-xs font-semibold text-[#EF4444]">
                Confirmación de ambos
              </div>
              <h3 className="font-display mt-1 text-xl font-bold text-white">
                ¿Subir juntos a {pendingMeta.label}?
              </h3>
              <p className="mt-1.5 text-sm text-white/65">
                {pendingMeta.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setConfirmHim((prev) => !prev)}
                className={`flex min-h-[48px] items-center justify-between gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition-colors ${
                  confirmHim
                    ? 'border-[#3B82F6] bg-[#3B82F6]/20 text-white'
                    : 'border-[#3B82F6]/30 bg-[#141013] text-[#93C5FD]'
                }`}
              >
                <span className="truncate">Confirma {partners.himName}</span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    confirmHim
                      ? 'border-[#3B82F6] bg-[#3B82F6] text-white'
                      : 'border-[#3B82F6]/45'
                  }`}
                >
                  {confirmHim ? <Check className="h-3.5 w-3.5" /> : null}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setConfirmHer((prev) => !prev)}
                className={`flex min-h-[48px] items-center justify-between gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition-colors ${
                  confirmHer
                    ? 'border-[#EC4899] bg-[#EC4899]/20 text-white'
                    : 'border-[#EC4899]/30 bg-[#141013] text-[#F9A8D4]'
                }`}
              >
                <span className="truncate">Confirma {partners.herName}</span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    confirmHer
                      ? 'border-[#EC4899] bg-[#EC4899] text-white'
                      : 'border-[#EC4899]/45'
                  }`}
                >
                  {confirmHer ? <Check className="h-3.5 w-3.5" /> : null}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPendingLevel(null)}
                className="min-h-[44px] flex-1 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={!confirmHim || !confirmHer}
                onClick={handleConfirmUpgrade}
                className="min-h-[44px] flex-1 rounded-full bg-[#DC2626] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#EF4444] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
              >
                Activar Rudo
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {INTENSITY_LEVELS.map((lvl) => {
              const isCurrent = lvl.id === activeLevel;
              const isHigher = lvl.id > activeLevel;
              const isLower = lvl.id < activeLevel;

              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => handleSelectTarget(lvl.id)}
                  className={`flex w-full min-h-[64px] items-center justify-between gap-4 rounded-3xl border p-4 text-left transition-colors ${
                    isCurrent
                      ? 'border-[#EF4444] bg-[#DC2626]/15'
                      : 'border-white/10 bg-[#09090B]/70 hover:border-red-500/35'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <span>
                        Nivel {lvl.id} · {lvl.label}
                      </span>
                      {isCurrent ? (
                        <span className="text-xs font-semibold text-[#EF4444]">
                          · Activo
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-xs text-white/65">
                      {lvl.description}
                    </p>
                  </div>

                  <div className="shrink-0 text-xs font-semibold">
                    {isLower ? (
                      <span className="inline-flex items-center gap-1 text-white/75">
                        <ArrowDown className="h-3.5 w-3.5" />
                        Bajar
                      </span>
                    ) : null}
                    {isHigher ? (
                      <span className="inline-flex items-center gap-1 text-[#EF4444]">
                        <ArrowUp className="h-3.5 w-3.5" />
                        Ambos
                      </span>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
