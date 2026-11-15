import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PartnersState } from '../types/game';
import { LegalModal } from './LegalModal';
import { HeroSensualArtwork, MarsSymbol, VenusSymbol } from './SensualSymbols';

interface SplashScreenProps {
  hasSavedSession: boolean;
  partners: PartnersState;
  onStart: () => void;
  onReconfigure: () => void;
}

export function SplashScreen({
  hasSavedSession,
  partners,
  onStart,
  onReconfigure,
}: SplashScreenProps) {
  const [showLegal, setShowLegal] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] px-4 py-10 sm:px-6">
      {/* Iluminación ambiental suave rojo, azul y rosa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DC2626]/14 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-1/4 h-72 w-72 rounded-full bg-[#3B82F6]/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-[#EC4899]/10 blur-[120px]"
      />

      <section className="relative w-full max-w-lg rounded-[36px] border border-red-500/25 bg-gradient-to-b from-[#1D0C12] via-[#141013] to-[#0B090C] p-8 text-center sm:p-12 shadow-[0_30px_80px_-24px_rgba(220,38,38,0.48)]">
        <div className="flex flex-col items-center">
          {/* Logo exacto */}
          <HeroSensualArtwork className="w-[230px] sm:w-[260px]" />

          {/* Nombre de la aplicación */}
          <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl text-balance">
            Entre <span className="text-[#EF4444]">Dos</span>
          </h1>

          {/* Descripción */}
          <p className="mt-3 max-w-md text-base leading-relaxed text-white/75">
            Su noche privada para romper la rutina, soltar el morbo y encender
            el deseo a su propio ritmo.
          </p>

          {hasSavedSession ? (
            <div className="mt-5 flex items-center justify-center gap-2.5 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 text-[#60A5FA]">
                <MarsSymbol className="h-3.5 w-3.5" />
                <span>{partners.himName}</span>
              </span>
              <span aria-hidden="true" className="text-white/35">&amp;</span>
              <span className="inline-flex items-center gap-1.5 text-[#F472B6]">
                <VenusSymbol className="h-3.5 w-3.5" />
                <span>{partners.herName}</span>
              </span>
            </div>
          ) : null}

          <div className="mt-8 flex w-full max-w-xs flex-col items-center gap-3">
            <button
              type="button"
              onClick={onStart}
              className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#DC2626] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_34px_-10px_rgba(220,38,38,0.75)] transition-all hover:brightness-110 active:scale-[0.98] whitespace-nowrap"
            >
              <span>{hasSavedSession ? 'Entrar a jugar' : 'Comenzar'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {hasSavedSession ? (
              <button
                type="button"
                onClick={onReconfigure}
                className="min-h-[40px] rounded-full px-4 py-2 text-xs font-medium text-white/55 transition-colors hover:bg-white/5 hover:text-white/85 whitespace-nowrap"
              >
                Cambiar nombres o ritmo
              </button>
            ) : null}

            <button
              type="button"
              onClick={() => setShowLegal(true)}
              className="mt-1 text-xs font-medium text-white/45 underline-offset-4 hover:text-white/75 hover:underline whitespace-nowrap"
            >
              Privacidad y Términos +18
            </button>
          </div>
        </div>
      </section>

      {showLegal ? <LegalModal onClose={() => setShowLegal(false)} /> : null}
    </main>
  );
}
