import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { POSITION_RIGS, FigurePose } from '../data/positionRigs';
import { PoseArchetype, PoseSceneProp, PoseTempo } from '../types/game';

interface PositionAnimationProps {
  positionId: string;
  poseStyle?: PoseArchetype;
  tempo?: PoseTempo;
  himLabel?: string;
  herLabel?: string;
}

interface Vec2 {
  x: number;
  y: number;
}

const TEMPO_DURATIONS: Record<PoseTempo, number> = {
  suave: 3.1,
  medio: 2.05,
  intenso: 1.35,
};

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function buildHarmonicWave(amp: number, phaseOffsetRad = 0, centerBias = 0.2): number[] {
  return Array.from({ length: 9 }, (_, i) => {
    const theta = (i / 8) * Math.PI * 2 - phaseOffsetRad;
    return Number((amp * (centerBias - 0.5 * Math.cos(theta))).toFixed(2));
  });
}

function buildOrbitWave(rx: number, ry: number, phaseOffsetRad = 0) {
  const x = Array.from({ length: 9 }, (_, i) => {
    const theta = (i / 8) * Math.PI * 2 - phaseOffsetRad;
    return Number((rx * Math.sin(theta)).toFixed(2));
  });
  const y = Array.from({ length: 9 }, (_, i) => {
    const theta = (i / 8) * Math.PI * 2 - phaseOffsetRad;
    return Number((ry * (0.25 - 0.5 * Math.cos(theta))).toFixed(2));
  });
  return { x, y };
}

const DEG_TO_RAD = Math.PI / 180;

function stepPoint(p: Vec2, len: number, deg: number): Vec2 {
  const rad = deg * DEG_TO_RAD;
  return {
    x: p.x + Math.cos(rad) * len,
    y: p.y + Math.sin(rad) * len,
  };
}

function fmt(n: number): string {
  return n.toFixed(1);
}

function pt(p: Vec2): string {
  return `${fmt(p.x)} ${fmt(p.y)}`;
}

/**
 * Local frame helper:
 * given origin A, target B, and chestSide (+1 or -1),
 * returns point at fraction t along A->B and offset n along front normal.
 */
function makeFrame(a: Vec2, b: Vec2, chestSide: 1 | -1) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  // Front normal matches convention: chestSide * (-uy, ux)
  const nx = -uy * chestSide;
  const ny = ux * chestSide;
  return {
    len,
    ux,
    uy,
    nx,
    ny,
    at(t: number, frontOffset: number): Vec2 {
      return {
        x: a.x + dx * t + nx * frontOffset,
        y: a.y + dy * t + ny * frontOffset,
      };
    },
  };
}

/**
 * Draws a sculpted tapered anatomical limb segment (thigh, upper arm, forearm)
 * with realistic muscle curve rather than a uniform stick or capsule.
 */
function buildTaperedLimbPath(
  a: Vec2,
  b: Vec2,
  chestSide: 1 | -1,
  rStartFront: number,
  rStartBack: number,
  rMidFront: number,
  rMidBack: number,
  rEndFront: number,
  rEndBack: number
): string {
  const f = makeFrame(a, b, chestSide);
  const sF = f.at(0, rStartFront);
  const mF = f.at(0.45, rMidFront);
  const eF = f.at(1, rEndFront);
  const tip = f.at(1.06, (rEndFront - rEndBack) * 0.3);
  const eB = f.at(1, -rEndBack);
  const mB = f.at(0.42, -rMidBack);
  const sB = f.at(0, -rStartBack);
  const cap = f.at(-0.07, (rStartFront - rStartBack) * 0.2);

  return [
    `M ${pt(sF)}`,
    `Q ${pt(mF)}, ${pt(eF)}`,
    `Q ${pt(tip)}, ${pt(eB)}`,
    `Q ${pt(mB)}, ${pt(sB)}`,
    `Q ${pt(cap)}, ${pt(sF)}`,
    'Z',
  ].join(' ');
}

function buildCalfAndFootPath(
  knee: Vec2,
  ankle: Vec2,
  footDeg: number,
  chestSide: 1 | -1,
  isFemale: boolean
): { calfPath: string; footPath: string } {
  const calfPath = buildTaperedLimbPath(
    knee,
    ankle,
    chestSide,
    isFemale ? 4.3 : 4.8,
    isFemale ? 4.8 : 5.2,
    isFemale ? 3.5 : 4.0,
    isFemale ? 5.6 : 6.1,
    isFemale ? 2.2 : 2.6,
    isFemale ? 2.4 : 2.8
  );

  const toe = stepPoint(ankle, isFemale ? 11.5 : 13, footDeg);
  const ff = makeFrame(ankle, toe, chestSide);
  const heel = ff.at(-0.22, -2.5);
  const arch = ff.at(0.45, -1.0);
  const ball = ff.at(0.88, -1.8);
  const tip = ff.at(1.04, 0.2);
  const instep = ff.at(0.55, 2.2);
  const ankleTop = ff.at(0.05, 2.4);

  const footPath = [
    `M ${pt(ankleTop)}`,
    `Q ${pt(instep)}, ${pt(tip)}`,
    `Q ${pt(ball)}, ${pt(arch)}`,
    `Q ${pt(heel)}, ${pt(ff.at(-0.15, 0.8))}`,
    'Z',
  ].join(' ');

  return { calfPath, footPath };
}

function buildHandPath(
  wrist: Vec2,
  forearmDeg: number,
  chestSide: 1 | -1,
  isFemale: boolean
): string {
  const fingers = stepPoint(wrist, isFemale ? 7.8 : 8.8, forearmDeg);
  const f = makeFrame(wrist, fingers, chestSide);
  const wTop = f.at(0, 2.1);
  const thumb = f.at(0.38, 3.8);
  const index = f.at(0.95, 2.0);
  const mid = f.at(1.08, 0.2);
  const pinky = f.at(0.86, -2.0);
  const wBot = f.at(0, -1.9);

  return [
    `M ${pt(wTop)}`,
    `Q ${pt(thumb)}, ${pt(index)}`,
    `Q ${pt(mid)}, ${pt(pinky)}`,
    `L ${pt(wBot)}`,
    'Z',
  ].join(' ');
}

function renderDetailedFigure(
  pose: FigurePose,
  gender: 'male' | 'female',
  keyPrefix: string
) {
  const isFemale = gender === 'female';
  const torsoLen = isFemale ? 39 : 43;
  const thighLen = isFemale ? 31 : 33;
  const calfLen = isFemale ? 29 : 31;
  const upperArmLen = isFemale ? 20 : 22;
  const forearmLen = isFemale ? 18 : 20;

  const hip: Vec2 = { x: pose.hip[0], y: pose.hip[1] };
  const shoulder = stepPoint(hip, torsoLen, pose.torsoDeg);
  const neckTop = stepPoint(shoulder, isFemale ? 6.5 : 7, pose.headDeg);
  const headCenter = stepPoint(neckTop, isFemale ? 7.5 : 8.2, pose.headDeg);

  const farKnee = stepPoint(hip, thighLen, pose.farThighDeg);
  const farAnkle = stepPoint(farKnee, calfLen, pose.farKneeDeg);
  const nearKnee = stepPoint(hip, thighLen, pose.nearThighDeg);
  const nearAnkle = stepPoint(nearKnee, calfLen, pose.nearKneeDeg);

  // Subtle anatomical offset for shoulder joints
  const tFrame = makeFrame(hip, shoulder, pose.chestSide);
  const farShoulder = tFrame.at(0.95, 1.5);
  const nearShoulder = tFrame.at(0.95, -1.0);

  const farElbow = stepPoint(farShoulder, upperArmLen, pose.farArmDeg);
  const farWrist = stepPoint(farElbow, forearmLen, pose.farElbowDeg);
  const nearElbow = stepPoint(nearShoulder, upperArmLen, pose.nearArmDeg);
  const nearWrist = stepPoint(nearElbow, forearmLen, pose.nearElbowDeg);

  // Palette styles
  const frontStyle = {
    fill: isFemale ? 'url(#herBodyGrad)' : 'url(#himBodyGrad)',
    stroke: isFemale ? 'rgba(251,207,232,0.7)' : 'rgba(191,219,254,0.7)',
    strokeWidth: 1.05,
    strokeLinejoin: 'round' as const,
  };
  const backStyle = {
    fill: isFemale ? 'url(#herBackGrad)' : 'url(#himBackGrad)',
    stroke: isFemale ? 'rgba(244,114,182,0.38)' : 'rgba(96,165,250,0.38)',
    strokeWidth: 0.9,
    strokeLinejoin: 'round' as const,
  };
  const detailStroke = isFemale ? 'rgba(131,24,67,0.52)' : 'rgba(30,58,138,0.55)';
  const hairStyle = {
    fill: isFemale ? 'url(#herHairGrad)' : 'url(#himHairGrad)',
    stroke: isFemale ? 'rgba(249,168,212,0.45)' : 'rgba(147,197,253,0.42)',
    strokeWidth: 0.85,
    strokeLinejoin: 'round' as const,
  };

  // Sculpted Anatomical Torso Path
  const arch = pose.arch ?? 0;
  const f = tFrame;
  const torsoPath = isFemale
    ? [
        `M ${pt(f.at(-0.08, 0))}`,
        `C ${pt(f.at(-0.06, 9.2))}, ${pt(f.at(0.12, 8.6))}, ${pt(f.at(0.28, 6.2 + arch * 0.4))}`, // hip -> slim waist
        `C ${pt(f.at(0.46, 5.2 + arch * 0.5))}, ${pt(f.at(0.64, 11.4))}, ${pt(f.at(0.76, 10.6))}`, // sculpted bust curve
        `C ${pt(f.at(0.88, 7.6))}, ${pt(f.at(0.98, 5.2))}, ${pt(f.at(1.03, 1.5))}`, // collarbone -> neck base
        `L ${pt(f.at(1.02, -3.5))}`,
        `C ${pt(f.at(0.88, -7.2))}, ${pt(f.at(0.64, -7.4))}, ${pt(f.at(0.36, -5.2 + arch * 0.5))}`, // upper back -> lumbar curve
        `C ${pt(f.at(0.14, -9.2))}, ${pt(f.at(-0.04, -10.8))}, ${pt(f.at(-0.08, 0))}`, // rounded glute curve
        'Z',
      ].join(' ')
    : [
        `M ${pt(f.at(-0.08, 0))}`,
        `C ${pt(f.at(-0.05, 8.4))}, ${pt(f.at(0.14, 7.8))}, ${pt(f.at(0.36, 7.0))}`, // hip -> abs
        `C ${pt(f.at(0.58, 8.2))}, ${pt(f.at(0.78, 10.6))}, ${pt(f.at(0.9, 8.6))}`, // pectoral chest
        `C ${pt(f.at(0.98, 5.6))}, ${pt(f.at(1.03, 3.0))}, ${pt(f.at(1.04, 1.0))}`, // neck base
        `L ${pt(f.at(1.02, -4.6))}`,
        `C ${pt(f.at(0.9, -9.8))}, ${pt(f.at(0.66, -9.8))}, ${pt(f.at(0.36, -6.8))}`, // broad lats/back
        `C ${pt(f.at(0.12, -8.2))}, ${pt(f.at(-0.04, -9.2))}, ${pt(f.at(-0.08, 0))}`, // glute curve
        'Z',
      ].join(' ');

  // Internal anatomical line (bust contour / pectoral contour + waist line)
  const chestDetailPath = isFemale
    ? `M ${pt(f.at(0.64, 9.8))} Q ${pt(f.at(0.71, 6.2))}, ${pt(f.at(0.79, 8.2))}`
    : `M ${pt(f.at(0.68, 9.2))} Q ${pt(f.at(0.72, 4.0))}, ${pt(f.at(0.84, 5.5))}`;
  const waistDetailPath = isFemale
    ? `M ${pt(f.at(0.28, -4.2))} Q ${pt(f.at(0.36, 0.5))}, ${pt(f.at(0.4, 4.2))}`
    : `M ${pt(f.at(0.36, -2.5))} Q ${pt(f.at(0.45, 2.5))}, ${pt(f.at(0.52, 5.2))}`;

  // Neck + Head + Facial Profile + Hair
  const hFrame = makeFrame(shoulder, headCenter, pose.chestSide);
  const neckPath = [
    `M ${pt(hFrame.at(0.05, 3.6))}`,
    `L ${pt(hFrame.at(0.55, 3.2))}`,
    `L ${pt(hFrame.at(0.55, -3.5))}`,
    `L ${pt(hFrame.at(0.05, -4.2))}`,
    'Z',
  ].join(' ');

  // Profiled head silhouette (jaw -> chin -> lips -> nose -> brow -> cranium -> nape)
  const headPath = [
    `M ${pt(hFrame.at(0.42, 2.6))}`, // throat/jaw
    `L ${pt(hFrame.at(0.56, 7.6))}`, // chin
    `Q ${pt(hFrame.at(0.66, 8.2))}, ${pt(hFrame.at(0.72, 8.5))}`, // lower lip
    `Q ${pt(hFrame.at(0.78, 8.6))}, ${pt(hFrame.at(0.84, 7.8))}`, // upper lip
    `L ${pt(hFrame.at(0.94, isFemale ? 9.8 : 10.3))}`, // nose tip
    `L ${pt(hFrame.at(1.06, 7.4))}`, // nose bridge / brow
    `C ${pt(hFrame.at(1.36, 7.2))}, ${pt(hFrame.at(1.52, 2.0))}, ${pt(hFrame.at(1.48, -3.8))}`, // forehead -> crown
    `C ${pt(hFrame.at(1.36, -9.2))}, ${pt(hFrame.at(0.84, -9.8))}, ${pt(hFrame.at(0.48, -5.2))}`, // occiput -> nape
    'Z',
  ].join(' ');

  // Subtle eye/lash + ear + lip crease
  const eyeP1 = hFrame.at(1.03, 4.4);
  const eyeP2 = hFrame.at(1.01, 6.4);
  const earP = hFrame.at(0.84, -2.0);
  const lipP1 = hFrame.at(0.76, 6.5);
  const lipP2 = hFrame.at(0.75, 8.2);

  // Hair styling
  const crownHairPath = isFemale
    ? [
        `M ${pt(hFrame.at(1.16, 6.8))}`,
        `C ${pt(hFrame.at(1.44, 6.6))}, ${pt(hFrame.at(1.60, 0.8))}, ${pt(hFrame.at(1.54, -5.0))}`,
        `C ${pt(hFrame.at(1.42, -11.0))}, ${pt(hFrame.at(0.82, -11.8))}, ${pt(hFrame.at(0.44, -8.4))}`,
        `C ${pt(hFrame.at(0.68, -5.6))}, ${pt(hFrame.at(0.92, -3.2))}, ${pt(hFrame.at(1.18, 1.4))}`,
        'Z',
      ].join(' ')
    : [
        `M ${pt(hFrame.at(1.18, 7.0))}`,
        `C ${pt(hFrame.at(1.46, 6.8))}, ${pt(hFrame.at(1.62, 1.4))}, ${pt(hFrame.at(1.52, -5.0))}`,
        `C ${pt(hFrame.at(1.38, -10.2))}, ${pt(hFrame.at(0.78, -10.4))}, ${pt(hFrame.at(0.46, -6.2))}`,
        `Q ${pt(hFrame.at(0.82, -4.6))}, ${pt(hFrame.at(1.12, -1.8))}`,
        `Q ${pt(hFrame.at(1.24, 2.2))}, ${pt(hFrame.at(1.18, 7.0))}`,
        'Z',
      ].join(' ');

  // Flowing long hair cascade for Her (falls gracefully behind head & down toward gravity)
  const hairBase = hFrame.at(0.78, -8.2);
  const hairMid = {
    x: hairBase.x - hFrame.nx * 7 + 0,
    y: Math.min(148, hairBase.y + 13),
  };
  const hairTip = {
    x: hairBase.x - hFrame.nx * 12,
    y: Math.min(150, hairBase.y + 24),
  };
  const femaleFlowHairPath = isFemale
    ? [
        `M ${pt(hFrame.at(1.05, -8.6))}`,
        `Q ${pt({ x: hairMid.x - 4, y: hairMid.y })}, ${pt(hairTip)}`,
        `Q ${pt({ x: hairMid.x + 6, y: hairMid.y + 2 })}, ${pt(hFrame.at(0.46, -5.4))}`,
        'Z',
      ].join(' ')
    : '';

  // Limbs
  const farThigh = buildTaperedLimbPath(
    hip,
    farKnee,
    pose.chestSide,
    isFemale ? 7.8 : 7.6,
    isFemale ? 8.2 : 7.8,
    isFemale ? 6.6 : 6.8,
    isFemale ? 6.4 : 6.5,
    isFemale ? 4.4 : 4.8,
    isFemale ? 4.4 : 4.8
  );
  const farLeg = buildCalfAndFootPath(
    farKnee,
    farAnkle,
    pose.farFootDeg,
    pose.chestSide,
    isFemale
  );

  const nearThigh = buildTaperedLimbPath(
    hip,
    nearKnee,
    pose.chestSide,
    isFemale ? 8.0 : 7.8,
    isFemale ? 8.4 : 8.0,
    isFemale ? 6.8 : 7.0,
    isFemale ? 6.5 : 6.6,
    isFemale ? 4.5 : 4.9,
    isFemale ? 4.5 : 4.9
  );
  const nearLeg = buildCalfAndFootPath(
    nearKnee,
    nearAnkle,
    pose.nearFootDeg,
    pose.chestSide,
    isFemale
  );

  const farUpperArm = buildTaperedLimbPath(
    farShoulder,
    farElbow,
    pose.chestSide,
    isFemale ? 3.8 : 4.6,
    isFemale ? 3.8 : 4.6,
    isFemale ? 3.4 : 4.2,
    isFemale ? 3.4 : 4.2,
    isFemale ? 2.8 : 3.4,
    isFemale ? 2.8 : 3.4
  );
  const farForearm = buildTaperedLimbPath(
    farElbow,
    farWrist,
    pose.chestSide,
    isFemale ? 2.9 : 3.5,
    isFemale ? 2.9 : 3.5,
    isFemale ? 2.7 : 3.2,
    isFemale ? 2.7 : 3.2,
    isFemale ? 1.9 : 2.3,
    isFemale ? 1.9 : 2.3
  );
  const farHand = buildHandPath(farWrist, pose.farElbowDeg, pose.chestSide, isFemale);

  const nearUpperArm = buildTaperedLimbPath(
    nearShoulder,
    nearElbow,
    pose.chestSide,
    isFemale ? 4.0 : 4.8,
    isFemale ? 4.0 : 4.8,
    isFemale ? 3.5 : 4.4,
    isFemale ? 3.5 : 4.4,
    isFemale ? 2.9 : 3.5,
    isFemale ? 2.9 : 3.5
  );
  const nearForearm = buildTaperedLimbPath(
    nearElbow,
    nearWrist,
    pose.chestSide,
    isFemale ? 3.0 : 3.6,
    isFemale ? 3.0 : 3.6,
    isFemale ? 2.8 : 3.3,
    isFemale ? 2.8 : 3.3,
    isFemale ? 2.0 : 2.4,
    isFemale ? 2.0 : 2.4
  );
  const nearHand = buildHandPath(nearWrist, pose.nearElbowDeg, pose.chestSide, isFemale);

  return (
    <g key={keyPrefix}>
      {/* Far limbs (depth shaded behind body) */}
      <path d={farLeg.footPath} {...backStyle} />
      <path d={farLeg.calfPath} {...backStyle} />
      <path d={farThigh} {...backStyle} />
      <path d={farHand} {...backStyle} />
      <path d={farForearm} {...backStyle} />
      <path d={farUpperArm} {...backStyle} />

      {/* Flowing hair behind head/neck */}
      {isFemale && femaleFlowHairPath ? (
        <path d={femaleFlowHairPath} {...hairStyle} />
      ) : null}

      {/* Neck + Sculpted Torso */}
      <path d={neckPath} {...frontStyle} />
      <path d={torsoPath} {...frontStyle} />
      <path
        d={chestDetailPath}
        fill="none"
        stroke={detailStroke}
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d={waistDetailPath}
        fill="none"
        stroke={detailStroke}
        strokeWidth="0.95"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Head & Facial Profile */}
      <path d={headPath} {...frontStyle} />
      <line
        x1={fmt(eyeP1.x)}
        y1={fmt(eyeP1.y)}
        x2={fmt(eyeP2.x)}
        y2={fmt(eyeP2.y)}
        stroke={detailStroke}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <line
        x1={fmt(lipP1.x)}
        y1={fmt(lipP1.y)}
        x2={fmt(lipP2.x)}
        y2={fmt(lipP2.y)}
        stroke={detailStroke}
        strokeWidth="0.95"
        strokeLinecap="round"
      />
      <circle
        cx={fmt(earP.x)}
        cy={fmt(earP.y)}
        r="1.9"
        fill="none"
        stroke={detailStroke}
        strokeWidth="0.95"
      />
      <path d={crownHairPath} {...hairStyle} />

      {/* Near Leg & Foot */}
      <path d={nearLeg.footPath} {...frontStyle} />
      <path d={nearLeg.calfPath} {...frontStyle} />
      <path d={nearThigh} {...frontStyle} />

      {/* Near Arm & Hand */}
      <path d={nearHand} {...frontStyle} />
      <path d={nearForearm} {...frontStyle} />
      <path d={nearUpperArm} {...frontStyle} />
    </g>
  );
}

function renderSceneProp(prop: PoseSceneProp) {
  switch (prop) {
    case 'bed_pillow_head':
      return (
        <g>
          <rect x="16" y="151" width="288" height="22" rx="7" fill="url(#bedGrad)" />
          <line x1="18" y1="151" x2="302" y2="151" stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" />
          <path
            d="M36 150 C36 135, 48 130, 68 130 C88 130, 98 136, 98 150 Z"
            fill="url(#pillowGrad)"
          />
        </g>
      );
    case 'bed_pillow_hip':
      return (
        <g>
          <rect x="16" y="151" width="288" height="22" rx="7" fill="url(#bedGrad)" />
          <line x1="18" y1="151" x2="302" y2="151" stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" />
          <path
            d="M124 150 C124 137, 134 133, 152 133 C170 133, 180 137, 180 150 Z"
            fill="url(#pillowGrad)"
          />
        </g>
      );
    case 'bed_headboard':
      return (
        <g>
          <rect x="16" y="151" width="288" height="22" rx="7" fill="url(#bedGrad)" />
          <rect x="52" y="42" width="22" height="109" rx="9" fill="url(#pillowGrad)" />
          <line x1="18" y1="151" x2="302" y2="151" stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" />
        </g>
      );
    case 'bed_edge':
      return (
        <g>
          <path d="M16 112 L182 112 L182 172 L16 172 Z" fill="url(#bedGrad)" />
          <path
            d="M16 112 L182 112 L182 172"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.8"
            fill="none"
          />
          <line x1="16" y1="172" x2="304" y2="172" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
        </g>
      );
    case 'wall':
      return (
        <g>
          <rect x="58" y="14" width="24" height="158" fill="rgba(255,255,255,0.05)" />
          <line x1="82" y1="14" x2="82" y2="172" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
          <line x1="36" y1="172" x2="292" y2="172" stroke="rgba(255,255,255,0.16)" strokeWidth="1.6" />
        </g>
      );
    case 'chair':
      return (
        <g>
          <rect x="94" y="64" width="14" height="62" rx="6" fill="url(#pillowGrad)" />
          <rect x="96" y="122" width="64" height="14" rx="6" fill="url(#bedGrad)" />
          <line x1="104" y1="136" x2="104" y2="172" stroke="rgba(255,255,255,0.22)" strokeWidth="3" strokeLinecap="round" />
          <line x1="150" y1="136" x2="150" y2="172" stroke="rgba(255,255,255,0.22)" strokeWidth="3" strokeLinecap="round" />
          <line x1="36" y1="172" x2="292" y2="172" stroke="rgba(255,255,255,0.16)" strokeWidth="1.6" />
        </g>
      );
    case 'table':
      return (
        <g>
          <rect x="52" y="100" width="128" height="12" rx="5" fill="url(#pillowGrad)" />
          <line x1="72" y1="112" x2="72" y2="172" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
          <line x1="164" y1="112" x2="164" y2="172" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
          <line x1="28" y1="172" x2="294" y2="172" stroke="rgba(255,255,255,0.16)" strokeWidth="1.6" />
        </g>
      );
    case 'mirror':
      return (
        <g>
          <rect x="58" y="16" width="12" height="156" rx="4" fill="rgba(255,255,255,0.08)" />
          <line x1="70" y1="18" x2="70" y2="170" stroke="rgba(147,197,253,0.4)" strokeWidth="2" />
          <rect x="82" y="128" width="38" height="44" rx="6" fill="url(#bedGrad)" />
          <line x1="36" y1="172" x2="292" y2="172" stroke="rgba(255,255,255,0.16)" strokeWidth="1.6" />
        </g>
      );
    case 'bed':
    default:
      return (
        <g>
          <rect x="16" y="151" width="288" height="22" rx="7" fill="url(#bedGrad)" />
          <line x1="18" y1="151" x2="302" y2="151" stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" />
        </g>
      );
  }
}

export function PositionAnimation({
  positionId,
  tempo = 'medio',
  himLabel = 'Él',
  herLabel = 'Ella',
}: PositionAnimationProps) {
  const [playing, setPlaying] = useState(true);
  const [selectedTempo, setSelectedTempo] = useState<PoseTempo>(tempo);
  const prefersReduced = useReducedMotion();
  const shouldAnimate = playing && !prefersReduced;
  const duration = TEMPO_DURATIONS[selectedTempo];

  const rig = POSITION_RIGS[positionId] ?? POSITION_RIGS['ks-01'];
  const { motion: m } = rig;

  const isCircle = m.arrow.mode === 'circle';
  const smoothDx = clamp(m.dx, -5.8, 5.8);
  const smoothDy = clamp(m.dy, -5.8, 5.8);
  const smoothRot = clamp((m.rotDeg ?? 0) * 0.26, -1.3, 1.3);

  let himAnimate: { x: number | number[]; y: number | number[]; rotate: number | number[] } = {
    x: 0,
    y: 0,
    rotate: 0,
  };
  let herAnimate: { x: number | number[]; y: number | number[]; rotate: number | number[] } = {
    x: 0,
    y: 0,
    rotate: 0,
  };

  if (shouldAnimate) {
    if (isCircle) {
      const rx = clamp(Math.abs(m.dx) || 3.4, 2.4, 4.0);
      const ry = clamp(Math.abs(m.dy) || 3.4, 2.4, 4.0);
      const primary = buildOrbitWave(rx, ry, 0);
      const partner = buildOrbitWave(rx * 0.32, ry * 0.28, 0.4);

      if (m.target === 'both') {
        himAnimate = { x: primary.x, y: primary.y, rotate: 0 };
        herAnimate = {
          x: primary.x.map((v) => Number((v * 0.65).toFixed(2))),
          y: primary.y.map((v) => Number((v * 0.65).toFixed(2))),
          rotate: 0,
        };
      } else if (m.target === 'him') {
        himAnimate = { x: primary.x, y: primary.y, rotate: buildHarmonicWave(smoothRot, 0, 0) };
        herAnimate = { x: partner.x, y: partner.y, rotate: 0 };
      } else {
        herAnimate = { x: primary.x, y: primary.y, rotate: buildHarmonicWave(smoothRot, 0, 0) };
        himAnimate = { x: partner.x, y: partner.y, rotate: 0 };
      }
    } else if (m.target === 'both') {
      const sameDirection =
        m.counterDx === 0 && m.counterDy === m.dy;
      if (sameDirection) {
        const waveX = buildHarmonicWave(smoothDx, 0, 0.1);
        const waveY = buildHarmonicWave(smoothDy, 0, 0.1);
        himAnimate = { x: waveX, y: waveY, rotate: 0 };
        herAnimate = { x: waveX, y: waveY, rotate: 0 };
      } else {
        const cDx = clamp(m.counterDx ?? -smoothDx * 0.55, -4.2, 4.2);
        const cDy = clamp(m.counterDy ?? -smoothDy * 0.55, -4.2, 4.2);
        himAnimate = {
          x: buildHarmonicWave(smoothDx * 0.72, 0, 0),
          y: buildHarmonicWave(smoothDy * 0.72, 0, 0),
          rotate: 0,
        };
        herAnimate = {
          x: buildHarmonicWave(cDx * 0.72, 0, 0),
          y: buildHarmonicWave(cDy * 0.72, 0, 0),
          rotate: 0,
        };
      }
    } else if (m.target === 'him') {
      // Él lidera el ritmo y Ella responde coordinadamente absorbiendo el contacto
      const followDx = clamp(smoothDx * 0.36, -2.4, 2.4);
      const followDy = clamp(smoothDy * 0.36, -2.4, 2.4);
      himAnimate = {
        x: buildHarmonicWave(smoothDx, 0, 0.2),
        y: buildHarmonicWave(smoothDy, 0, 0.2),
        rotate: smoothRot !== 0 ? buildHarmonicWave(smoothRot, 0, 0.2) : 0,
      };
      herAnimate = {
        x: buildHarmonicWave(followDx, 0.42, 0.2),
        y: buildHarmonicWave(followDy, 0.42, 0.2),
        rotate: 0,
      };
    } else {
      // Ella lidera el ritmo y Él acompaña coordinando cadera/torso
      const followDx = clamp(smoothDx * 0.3, -2.0, 2.0);
      const followDy = clamp(smoothDy * 0.32, -2.0, 2.0);
      herAnimate = {
        x: buildHarmonicWave(smoothDx, 0, 0.2),
        y: buildHarmonicWave(smoothDy, 0, 0.2),
        rotate: smoothRot !== 0 ? buildHarmonicWave(smoothRot, 0, 0.2) : 0,
      };
      himAnimate = {
        x: buildHarmonicWave(followDx, 0.42, 0.2),
        y: buildHarmonicWave(followDy, 0.42, 0.2),
        rotate: 0,
      };
    }
  }

  const himElement = (
    <motion.g
      key="him"
      animate={himAnimate}
      style={{
        transformBox: 'view-box',
        transformOrigin: `${rig.him.hip[0]}px ${rig.him.hip[1]}px`,
      }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {renderDetailedFigure(rig.him, 'male', 'him')}
    </motion.g>
  );

  const herElement = (
    <motion.g
      key="her"
      animate={herAnimate}
      style={{
        transformBox: 'view-box',
        transformOrigin: `${rig.her.hip[0]}px ${rig.her.hip[1]}px`,
      }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {renderDetailedFigure(rig.her, 'female', 'her')}
    </motion.g>
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0D0B0E] p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4 text-xs">
          <span className="inline-flex items-center gap-1.5 text-[#93C5FD] font-medium">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
            <span>{himLabel}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#F9A8D4] font-medium">
            <span className="h-2.5 w-2.5 rounded-full bg-[#EC4899]" />
            <span>{herLabel}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center rounded-full border border-white/10 bg-[#171216] p-0.5">
            {(['suave', 'medio', 'intenso'] as PoseTempo[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTempo(t)}
                className={`min-h-[30px] rounded-full px-2.5 py-1 text-[11px] font-medium capitalize transition-colors ${
                  selectedTempo === t
                    ? 'bg-[#DC2626] text-white'
                    : 'text-white/65 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pausar animación' : 'Reproducir animación'}
            className="inline-flex min-h-[34px] min-w-[34px] items-center justify-center rounded-full border border-white/15 bg-[#171216] px-2.5 text-xs font-medium text-white/85 hover:border-white/30"
          >
            {shouldAnimate ? (
              <Pause className="h-3.5 w-3.5" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#120E13]">
        <svg
          viewBox="0 0 320 190"
          className="h-52 w-full"
          role="img"
          aria-label="Animación anatómica de la posición"
        >
          <defs>
            <radialGradient id="stageRedGlow" cx="50%" cy="58%" r="58%">
              <stop offset="0%" stopColor="rgba(220,38,38,0.18)" />
              <stop offset="100%" stopColor="rgba(18,14,19,0)" />
            </radialGradient>

            {/* Gradientes Azules para Él (hombre) */}
            <linearGradient id="himBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BFDBFE" />
              <stop offset="45%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="himBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="himHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* Gradientes Rosas para Ella (mujer) */}
            <linearGradient id="herBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBCFE8" />
              <stop offset="45%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
            <linearGradient id="herBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DB2777" />
              <stop offset="100%" stopColor="#831843" />
            </linearGradient>
            <linearGradient id="herHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9D174D" />
              <stop offset="100%" stopColor="#4A0424" />
            </linearGradient>

            <linearGradient id="pillowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
            <linearGradient id="bedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="320" height="190" fill="url(#stageRedGlow)" />
          {renderSceneProp(rig.prop)}

          {rig.drawOrder === 'her-first'
            ? [herElement, himElement]
            : [himElement, herElement]}

          {/* Guía visual de movimiento */}
          {m.arrow.mode === 'circle' ? (
            <motion.g
              transform={`translate(${m.arrow.x}, ${m.arrow.y})`}
              animate={
                shouldAnimate
                  ? { rotate: [0, 360], opacity: [0.65, 1, 0.65] }
                  : { rotate: 0, opacity: 0.75 }
              }
              transition={{ duration: duration * 1.4, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="0"
                cy="0"
                r="11"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="16 6"
              />
              <polyline
                points="8,-5 12,-1 7,3"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>
          ) : (
            <motion.g
              transform={`translate(${m.arrow.x}, ${m.arrow.y}) rotate(${m.arrow.angle})`}
              animate={
                shouldAnimate
                  ? { opacity: [0.45, 1, 0.45], scale: [0.94, 1.08, 0.94] }
                  : { opacity: 0.75 }
              }
              transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
            >
              <line
                x1="-14"
                y1="0"
                x2="14"
                y2="0"
                stroke="#EF4444"
                strokeWidth="2.1"
                strokeDasharray="3.5 2.5"
              />
              <polyline
                points="-9,-4 -14,0 -9,4"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="9,-4 14,0 9,4"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  );
}
