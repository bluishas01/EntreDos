export type IntensityLevelId = 1 | 2;

export interface IntensityLevelMeta {
  id: IntensityLevelId;
  key: 'suave' | 'rudo';
  label: string;
  subtitle: string;
  description: string;
  accentHex: string;
}

export type GameMode =
  | 'hub'
  | 'questions'
  | 'sexual_games'
  | 'truth_or_dare'
  | 'positions';

export type TurnOwner = 'him' | 'her';

export interface PartnersState {
  himName: string;
  herName: string;
}

export interface EroticQuestion {
  id: string;
  level: IntensityLevelId;
  topic: string;
  prompt: string;
}

export interface SexualGame {
  id: string;
  level: IntensityLevelId;
  category: string;
  prompt: string;
  durationSeconds?: number;
  guidance?: string;
}

export type TruthOrDareType = 'verdad' | 'reto';

export interface TruthDareCard {
  id: string;
  level: IntensityLevelId;
  type: TruthOrDareType;
  prompt: string;
  tip?: string;
}

export type PoseArchetype =
  | 'face_to_face'
  | 'side_spoon'
  | 'seated_lap'
  | 'elevated_edge'
  | 'rear_supported'
  | 'reclined_arch'
  | 'standing_support'
  | 'mutual_side'
  | 'inverted_ride'
  | 'lotus_wrap';

export type PoseTempo = 'suave' | 'medio' | 'intenso';

export type PoseSceneProp =
  | 'bed'
  | 'bed_pillow_head'
  | 'bed_pillow_hip'
  | 'bed_headboard'
  | 'bed_edge'
  | 'wall'
  | 'chair'
  | 'table'
  | 'mirror';

export interface PositionItem {
  id: string;
  number: number;
  level: IntensityLevelId;
  shortLabel: string;
  title: string;
  description: string;
  stepByStep: string[];
  poseStyle: PoseArchetype;
  tempo: PoseTempo;
}

export interface SessionState {
  ageConfirmed: boolean;
  consentConfirmed: boolean;
  partners: PartnersState;
  currentTurn: TurnOwner;
  himTurns: number;
  herTurns: number;
  acceptedMaxLevel: IntensityLevelId;
  activeLevel: IntensityLevelId;
  activeMode: GameMode;
  soundEnabled: boolean;
  roundsPlayed: number;
  usedCardIds: string[];
}
