import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { INTENSITY_LEVELS } from '../data/content';
import { IntensityLevelId, PartnersState, TurnOwner } from '../types/game';
import { LegalModal } from './LegalModal';
import {
  HeroSensualArtwork,
  MarsSymbol,
  VenusSymbol,
} from './SensualSymbols';

interface Gate18ScreenProps {
  initialPartners: PartnersState;
  initialMaxLevel: IntensityLevelId;
  onComplete: (
    partners: PartnersState,
    maxLevel: IntensityLevelId,
    firstTurn: TurnOwner
  ) => void;
}

export function Gate18Screen({
  initialPartners,
  initialMaxLevel,
  onComplete,
}: Gate18ScreenProps) {
  const [himName, setHimName] = useState(initialPartners.himName);
  const [herName, setHerName] = useState(initialPartners.herName);
  const [firstTurn, setFirstTurn] = useState<TurnOwner>('him');
  const [selectedLimit, setSelectedLimit] = useState<IntensityLevelId>(initialMaxLevel);
  const [isAdultConfirmed, setIsAdultConfirmed] = useState(false);
  const [confirmedHim, setConfirmedHim] = useState(false);
  const [confirmedHer, setConfirmedHer] = useState(false);
  const [showLegal, setShowLegal] = useState(false);

  const cleanHim = himName.trim() || 'Él';
  const cleanHer = herName.trim() || 'Ella';
  const canStart = isAdultConfirmed && confirmedHim && confirmedHer;

  const handleSelectLimit = (levelId: IntensityLevelId) => {
    setSelectedLimit(levelId);
    setConfirmedHim(false);
    setConfirmedHer(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090B] px-4 py-8 sm:px-6 lg:py-12">
      {/* Iluminación ambiental suave rojo, azul y rosa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#DC2626]/12 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#EC4899]/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Lado visual coqueto con símbolos sombreados */}
          <section className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#EF4444]">
              <span>Solo +18</span>
              <span aria-hidden="true">·</span>
              <span>Privado en tu dispositivo</span>
            </div>

            <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl text-balance">
              Entre <span className="text-[#EF4444]">Dos</span>
            </h1>

            <p className="mt-3 text-base leading-relaxed text-white/75">
              Su noche privada para romper la rutina, soltar el morbo y encender
              el deseo a su propio ritmo.
            </p>

            {/* Emblema sombreado central */}
            <div className="mt-6 flex justify-center lg:justify-start">
              <div className="relative inline-flex items-center justify-center rounded-[32px] border border-red-500/20 bg-gradient-to-br from-[#230B12]/90 via-[#141013] to-[#0D0A0E] px-8 py-6 shadow-[0_24px_60px_-20px_rgba(220,38,38,0.42)]">
                <HeroSensualArtwork className="w-[215px] sm:w-[235px]" />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/60 lg:justify-start">
              <span className="inline-flex items-center gap-1.5 text-[#93C5FD]">
                <MarsSymbol className="h-3.5 w-3.5" />
                <span>Azul para él</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 text-[#F9A8D4]">
                <VenusSymbol className="h-3.5 w-3.5" />
                <span>Rosa para ella</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>Cero cuentas</span>
            </div>
          </section>

          {/* Tarjeta casual de entrada */}
          <section className="lg:col-span-7 rounded-[32px] border border-red-500/25 bg-[#141013]/95 p-5 sm:p-8 space-y-7 shadow-[0_26px_70px_-24px_rgba(220,38,38,0.35)]">
            {/* 01. Él y Ella */}
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                01. ¿Quiénes juegan hoy?
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Pongan sus nombres o apodos para ver de quién es cada turno.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-[#3B82F6]/35 bg-gradient-to-br from-[#3B82F6]/14 to-[#09090B]/60 p-4 shadow-[0_10px_28px_-14px_rgba(59,130,246,0.45)]">
                  <label
                    htmlFor="him-name"
                    className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#93C5FD]"
                  >
                    <MarsSymbol className="h-4 w-4 text-[#60A5FA]" />
                    <span>Él</span>
                  </label>
                  <input
                    id="him-name"
                    type="text"
                    maxLength={24}
                    value={himName}
                    onChange={(e) => setHimName(e.target.value)}
                    placeholder="Ej. Mateo"
                    className="w-full min-h-[42px] rounded-2xl border border-[#3B82F6]/30 bg-[#09090B]/90 px-3.5 py-2 text-sm text-white placeholder:text-white/35 focus:border-[#3B82F6] focus:outline-none"
                  />
                </div>

                <div className="rounded-3xl border border-[#EC4899]/35 bg-gradient-to-br from-[#EC4899]/14 to-[#09090B]/60 p-4 shadow-[0_10px_28px_-14px_rgba(236,72,153,0.45)]">
                  <label
                    htmlFor="her-name"
                    className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#F9A8D4]"
                  >
                    <VenusSymbol className="h-4 w-4 text-[#F472B6]" />
                    <span>Ella</span>
                  </label>
                  <input
                    id="her-name"
                    type="text"
                    maxLength={24}
                    value={herName}
                    onChange={(e) => setHerName(e.target.value)}
                    placeholder="Ej. Sofía"
                    className="w-full min-h-[42px] rounded-2xl border border-[#EC4899]/30 bg-[#09090B]/90 px-3.5 py-2 text-sm text-white placeholder:text-white/35 focus:border-[#EC4899] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs text-white/65">
                <span>¿Quién empieza?</span>
                <button
                  type="button"
                  onClick={() => setFirstTurn('him')}
                  className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 py-1 font-semibold transition-all whitespace-nowrap ${
                    firstTurn === 'him'
                      ? 'bg-[#3B82F6] text-white shadow-[0_6px_18px_-4px_rgba(59,130,246,0.65)]'
                      : 'border border-white/15 text-white/70 hover:text-white'
                  }`}
                >
                  <MarsSymbol className="h-3.5 w-3.5" />
                  <span>{cleanHim}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFirstTurn('her')}
                  className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 py-1 font-semibold transition-all whitespace-nowrap ${
                    firstTurn === 'her'
                      ? 'bg-[#EC4899] text-white shadow-[0_6px_18px_-4px_rgba(236,72,153,0.65)]'
                      : 'border border-white/15 text-white/70 hover:text-white'
                  }`}
                >
                  <VenusSymbol className="h-3.5 w-3.5" />
                  <span>{cleanHer}</span>
                </button>
              </div>
            </div>

            {/* 02. Intensidad */}
            <div className="border-t border-white/10 pt-6">
              <h2 className="font-display text-xl font-bold text-white">
                02. ¿Qué tan caliente empezamos?
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {INTENSITY_LEVELS.map((lvl) => {
                  const isSelected = selectedLimit === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => handleSelectLimit(lvl.id)}
                      className={`text-left rounded-3xl border p-4 transition-all ${
                        isSelected
                          ? 'border-[#EF4444] bg-gradient-to-br from-[#DC2626]/22 to-[#141013] shadow-[0_12px_28px_-14px_rgba(220,38,38,0.6)]'
                          : 'border-white/10 bg-[#09090B]/60 hover:border-red-500/35'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-lg font-bold text-white">
                          {lvl.label}
                        </span>
                        <span
                          className="text-xs font-semibold tabular-nums"
                          style={{ color: lvl.accentHex }}
                        >
                          Nivel {lvl.id}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/65">
                        {lvl.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 03. +18 y confirmación */}
            <div className="border-t border-white/10 pt-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-white">
                03. Luz verde +18
              </h2>

              <label className="flex min-h-[44px] cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-[#09090B]/70 p-3.5 transition-colors hover:border-red-500/35">
                <input
                  type="checkbox"
                  checked={isAdultConfirmed}
                  onChange={(e) => setIsAdultConfirmed(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[#DC2626] rounded"
                />
                <span className="text-sm leading-snug text-white/85">
                  Somos mayores de 18 años y queremos jugar juntos por mutuo gusto.
                </span>
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setConfirmedHim((prev) => !prev)}
                  className={`flex min-h-[50px] items-center justify-between gap-3 rounded-full border px-4 py-3 text-sm font-semibold transition-all ${
                    confirmedHim
                      ? 'border-[#3B82F6] bg-[#3B82F6]/22 text-white shadow-[0_8px_22px_-10px_rgba(59,130,246,0.65)]'
                      : 'border-[#3B82F6]/30 bg-[#09090B] text-[#93C5FD]/80 hover:border-[#3B82F6]/60'
                  }`}
                >
                  <span className="inline-flex items-center gap-2 truncate">
                    <MarsSymbol className="h-4 w-4 shrink-0 text-[#60A5FA]" />
                    <span className="truncate">Listo {cleanHim}</span>
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                      confirmedHim
                        ? 'border-[#3B82F6] bg-[#3B82F6] text-white'
                        : 'border-[#3B82F6]/40'
                    }`}
                  >
                    {confirmedHim ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setConfirmedHer((prev) => !prev)}
                  className={`flex min-h-[50px] items-center justify-between gap-3 rounded-full border px-4 py-3 text-sm font-semibold transition-all ${
                    confirmedHer
                      ? 'border-[#EC4899] bg-[#EC4899]/22 text-white shadow-[0_8px_22px_-10px_rgba(236,72,153,0.65)]'
                      : 'border-[#EC4899]/30 bg-[#09090B] text-[#F9A8D4]/80 hover:border-[#EC4899]/60'
                  }`}
                >
                  <span className="inline-flex items-center gap-2 truncate">
                    <VenusSymbol className="h-4 w-4 shrink-0 text-[#F472B6]" />
                    <span className="truncate">Lista {cleanHer}</span>
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                      confirmedHer
                        ? 'border-[#EC4899] bg-[#EC4899] text-white'
                        : 'border-[#EC4899]/40'
                    }`}
                  >
                    {confirmedHer ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                </button>
              </div>

              <button
                type="button"
                disabled={!canStart}
                onClick={() =>
                  onComplete(
                    { himName: cleanHim, herName: cleanHer },
                    selectedLimit,
                    firstTurn
                  )
                }
                className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#DC2626] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_34px_-10px_rgba(220,38,38,0.75)] transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-none disabled:bg-white/10 disabled:text-white/35 disabled:shadow-none"
              >
                <span>
                  {canStart
                    ? `Entrar en modo ${INTENSITY_LEVELS.find((l) => l.id === selectedLimit)?.label}`
                    : 'Toquen ambos para entrar'}
                </span>
                {canStart ? <ArrowRight className="h-4 w-4" /> : null}
              </button>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => setShowLegal(true)}
                  className="text-xs font-medium text-white/45 underline-offset-4 hover:text-white/75 hover:underline"
                >
                  Privacidad y Términos +18
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {showLegal ? <LegalModal onClose={() => setShowLegal(false)} /> : null}
    </main>
  );
}
