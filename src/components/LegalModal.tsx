import { useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface LegalModalProps {
  onClose: () => void;
}

export function LegalModal({ onClose }: LegalModalProps) {
  const [tab, setTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-[30px] border border-red-500/25 bg-[#141013] p-6 sm:p-7 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-[#EF4444]" />
            <h2
              id="legal-modal-title"
              className="font-display text-xl font-bold text-white"
            >
              Privacidad y Términos +18
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-1 rounded-full border border-white/10 bg-[#09090B] p-1">
          <button
            type="button"
            onClick={() => setTab('privacy')}
            className={`min-h-[38px] flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
              tab === 'privacy'
                ? 'bg-[#DC2626] text-white'
                : 'text-white/65 hover:text-white'
            }`}
          >
            Política de Privacidad
          </button>
          <button
            type="button"
            onClick={() => setTab('terms')}
            className={`min-h-[38px] flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
              tab === 'terms'
                ? 'bg-[#DC2626] text-white'
                : 'text-white/65 hover:text-white'
            }`}
          >
            Términos de Uso (+18)
          </button>
        </div>

        {tab === 'privacy' ? (
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-white/75">
            <p>
              <strong className="text-white">Entre Dos</strong> funciona 100 % en
              tu dispositivo. No cuenta con registro, servidores propios,
              anuncios ni rastreadores de terceros.
            </p>
            <p>
              <strong className="text-white">Datos no recopilados:</strong> No
              recopilamos, enviamos ni compartimos nombres, historial de
              partidas, ubicación, identificadores ni datos personales fuera de
              tu teléfono.
            </p>
            <p>
              <strong className="text-white">Almacenamiento local:</strong> Los
              nombres ingresados, nivel seleccionado y tarjetas usadas se guardan
              únicamente de forma local en este dispositivo y pueden borrarse en
              cualquier momento desde la opción{' '}
              <em>Cambiar nombres o empezar de cero</em>.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-white/75">
            <p>
              <strong className="text-white">Exclusivo mayores de edad (+18):</strong>{' '}
              Esta aplicación está diseñada exclusivamente para adultos mayores
              de 18 años (o mayoría de edad legal aplicable en su país).
            </p>
            <p>
              <strong className="text-white">Consentimiento mutuo:</strong> Todas
              las preguntas, dinámicas, juegos y posturas son sugerencias
              recreativas entre adultos. Cualquier participante puede pasar una
              tarjeta o bajar el nivel de intensidad en cualquier momento.
            </p>
            <p>
              <strong className="text-white">Uso responsable:</strong> La
              aplicación no sustituye asesoría médica ni clínica y se ofrece para
              entretenimiento privado en pareja.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-6 min-h-[46px] w-full rounded-full bg-[#DC2626] py-2.5 text-sm font-bold text-white hover:bg-[#EF4444]"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
