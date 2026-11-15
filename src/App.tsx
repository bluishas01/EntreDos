import { useState, useEffect } from 'react';
import {
  GameMode,
  IntensityLevelId,
  PartnersState,
  SessionState,
  TurnOwner,
} from './types/game';
import { Gate18Screen } from './components/Gate18Screen';
import { SplashScreen } from './components/SplashScreen';
import { TopBar } from './components/TopBar';
import { ModeHub } from './components/ModeHub';
import { QuestionsMode } from './components/QuestionsMode';
import { SexualGamesMode } from './components/SexualGamesMode';
import { TruthOrDareMode } from './components/TruthOrDareMode';
import { PositionsMode } from './components/PositionsMode';
import { IntensityModal } from './components/IntensityModal';
import { playSoftChime } from './utils/sound';

const STORAGE_KEY = 'entre_dos_local_session_v1';

const DEFAULT_SESSION: SessionState = {
  ageConfirmed: false,
  consentConfirmed: false,
  partners: {
    himName: 'Él',
    herName: 'Ella',
  },
  currentTurn: 'him',
  himTurns: 0,
  herTurns: 0,
  acceptedMaxLevel: 1,
  activeLevel: 1,
  activeMode: 'hub',
  soundEnabled: true,
  roundsPlayed: 0,
  usedCardIds: [],
};

function loadInitialSession(): SessionState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SESSION;
    const parsed = JSON.parse(raw) as Omit<
      Partial<SessionState>,
      'activeMode' | 'activeLevel' | 'acceptedMaxLevel' | 'partners'
    > & {
      activeMode?: string;
      activeLevel?: number;
      acceptedMaxLevel?: number;
      partners?: {
        himName?: string;
        herName?: string;
        partnerA?: string;
        partnerB?: string;
      };
    };

    const validModes: GameMode[] = [
      'hub',
      'questions',
      'sexual_games',
      'truth_or_dare',
      'positions',
    ];
    let safeMode: GameMode = 'hub';
    if (parsed.activeMode && validModes.includes(parsed.activeMode as GameMode)) {
      safeMode = parsed.activeMode as GameMode;
    } else if (parsed.activeMode === 'erotic_qa') {
      safeMode = 'sexual_games';
    } else if (parsed.activeMode === 'roulette') {
      safeMode = 'positions';
    }

    const rawMax = Number(parsed.acceptedMaxLevel ?? DEFAULT_SESSION.acceptedMaxLevel);
    const safeMax: IntensityLevelId = rawMax >= 2 ? 2 : 1;
    const rawActive = Number(parsed.activeLevel ?? DEFAULT_SESSION.activeLevel);
    const safeActive: IntensityLevelId = rawActive >= 2 && safeMax === 2 ? 2 : 1;

    const rawPartners = parsed.partners ?? {};
    const himName =
      rawPartners.himName?.trim() ||
      rawPartners.partnerA?.trim() ||
      DEFAULT_SESSION.partners.himName;
    const herName =
      rawPartners.herName?.trim() ||
      rawPartners.partnerB?.trim() ||
      DEFAULT_SESSION.partners.herName;

    return {
      ageConfirmed: Boolean(parsed.ageConfirmed),
      consentConfirmed: Boolean(parsed.consentConfirmed),
      partners: {
        himName: himName === 'Persona 1' ? 'Él' : himName,
        herName: herName === 'Persona 2' ? 'Ella' : herName,
      },
      currentTurn: parsed.currentTurn === 'her' ? 'her' : 'him',
      himTurns: typeof parsed.himTurns === 'number' ? parsed.himTurns : 0,
      herTurns: typeof parsed.herTurns === 'number' ? parsed.herTurns : 0,
      acceptedMaxLevel: safeMax,
      activeLevel: safeActive,
      activeMode: safeMode,
      soundEnabled: parsed.soundEnabled ?? DEFAULT_SESSION.soundEnabled,
      roundsPlayed: parsed.roundsPlayed ?? 0,
      usedCardIds: Array.isArray(parsed.usedCardIds) ? parsed.usedCardIds : [],
    };
  } catch {
    return DEFAULT_SESSION;
  }
}

export default function App() {
  const [session, setSession] = useState<SessionState>(() =>
    loadInitialSession()
  );
  const [showSplash, setShowSplash] = useState(true);
  const [showIntensityModal, setShowIntensityModal] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Ignore storage quota errors safely
    }
  }, [session]);

  const handleCompleteGate = (
    partners: PartnersState,
    agreedLevel: IntensityLevelId,
    firstTurn: TurnOwner
  ) => {
    setSession((prev) => ({
      ...prev,
      ageConfirmed: true,
      consentConfirmed: true,
      partners,
      currentTurn: firstTurn,
      acceptedMaxLevel: agreedLevel,
      activeLevel: agreedLevel,
      activeMode: 'hub',
    }));
  };

  const handleApplyLevel = (
    newActiveLevel: IntensityLevelId,
    newMaxLevel: IntensityLevelId
  ) => {
    setSession((prev) => ({
      ...prev,
      activeLevel: newActiveLevel,
      acceptedMaxLevel: newMaxLevel,
    }));
  };

  const handlePassTurn = (countAsRound = false) => {
    setSession((prev) => {
      const nextTurn: TurnOwner = prev.currentTurn === 'him' ? 'her' : 'him';
      return {
        ...prev,
        currentTurn: nextTurn,
        himTurns:
          countAsRound && prev.currentTurn === 'him'
            ? prev.himTurns + 1
            : prev.himTurns,
        herTurns:
          countAsRound && prev.currentTurn === 'her'
            ? prev.herTurns + 1
            : prev.herTurns,
        roundsPlayed: countAsRound ? prev.roundsPlayed + 1 : prev.roundsPlayed,
      };
    });
    if (!countAsRound) {
      playSoftChime(session.soundEnabled, 460);
    }
  };

  const handleMarkUsed = (cardId: string, countAsRound: boolean) => {
    setSession((prev) => ({
      ...prev,
      roundsPlayed: countAsRound ? prev.roundsPlayed + 1 : prev.roundsPlayed,
      usedCardIds: prev.usedCardIds.includes(cardId)
        ? prev.usedCardIds
        : [...prev.usedCardIds, cardId],
    }));
  };

  const handleRecycleCards = (cardIdsToClear: string[]) => {
    const clearSet = new Set(cardIdsToClear);
    setSession((prev) => ({
      ...prev,
      usedCardIds: prev.usedCardIds.filter((id) => !clearSet.has(id)),
    }));
  };

  const handleSelectMode = (mode: GameMode) => {
    setSession((prev) => ({
      ...prev,
      activeMode: mode,
    }));
  };

  const handleResetSession = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore safely
    }
    setShowIntensityModal(false);
    setShowSplash(false);
    setSession(DEFAULT_SESSION);
  };

  const hasSavedSession = session.ageConfirmed && session.consentConfirmed;

  if (showSplash) {
    return (
      <SplashScreen
        hasSavedSession={hasSavedSession}
        partners={session.partners}
        onStart={() => setShowSplash(false)}
        onReconfigure={() => {
          setShowSplash(false);
          setSession((prev) => ({
            ...prev,
            ageConfirmed: false,
            consentConfirmed: false,
          }));
        }}
      />
    );
  }

  if (!hasSavedSession) {
    return (
      <Gate18Screen
        initialPartners={session.partners}
        initialMaxLevel={session.acceptedMaxLevel}
        onComplete={handleCompleteGate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5]">
      <TopBar
        activeMode={session.activeMode}
        activeLevel={session.activeLevel}
        soundEnabled={session.soundEnabled}
        onBackToHub={() => handleSelectMode('hub')}
        onOpenIntensity={() => setShowIntensityModal(true)}
        onToggleSound={() =>
          setSession((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))
        }
      />

      {session.activeMode === 'hub' ? (
        <ModeHub
          partners={session.partners}
          activeLevel={session.activeLevel}
          onSelectMode={handleSelectMode}
          onOpenIntensity={() => setShowIntensityModal(true)}
          onResetSession={handleResetSession}
        />
      ) : null}

      {session.activeMode === 'questions' ? (
        <QuestionsMode
          partners={session.partners}
          currentTurn={session.currentTurn}
          activeLevel={session.activeLevel}
          usedCardIds={session.usedCardIds}
          soundEnabled={session.soundEnabled}
          onMarkUsed={handleMarkUsed}
          onRecycleCards={handleRecycleCards}
          onPassTurn={handlePassTurn}
          onSetTurn={(turn) =>
            setSession((prev) => ({ ...prev, currentTurn: turn }))
          }
          onOpenIntensity={() => setShowIntensityModal(true)}
        />
      ) : null}

      {session.activeMode === 'sexual_games' ? (
        <SexualGamesMode
          partners={session.partners}
          currentTurn={session.currentTurn}
          activeLevel={session.activeLevel}
          usedCardIds={session.usedCardIds}
          soundEnabled={session.soundEnabled}
          onMarkUsed={handleMarkUsed}
          onRecycleCards={handleRecycleCards}
          onPassTurn={handlePassTurn}
          onOpenIntensity={() => setShowIntensityModal(true)}
        />
      ) : null}

      {session.activeMode === 'truth_or_dare' ? (
        <TruthOrDareMode
          partners={session.partners}
          currentTurn={session.currentTurn}
          activeLevel={session.activeLevel}
          usedCardIds={session.usedCardIds}
          soundEnabled={session.soundEnabled}
          onMarkUsed={handleMarkUsed}
          onRecycleCards={handleRecycleCards}
          onPassTurn={handlePassTurn}
          onOpenIntensity={() => setShowIntensityModal(true)}
        />
      ) : null}

      {session.activeMode === 'positions' ? (
        <PositionsMode
          partners={session.partners}
          currentTurn={session.currentTurn}
          activeLevel={session.activeLevel}
          soundEnabled={session.soundEnabled}
          onPassTurn={handlePassTurn}
          onOpenIntensity={() => setShowIntensityModal(true)}
        />
      ) : null}

      {showIntensityModal ? (
        <IntensityModal
          partners={session.partners}
          activeLevel={session.activeLevel}
          acceptedMaxLevel={session.acceptedMaxLevel}
          onApplyLevel={handleApplyLevel}
          onClose={() => setShowIntensityModal(false)}
        />
      ) : null}
    </div>
  );
}
